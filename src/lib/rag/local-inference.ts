import { Ollama } from '@langchain/ollama';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { getDb } from '@/lib/db/connection';

// 1. Initialize Local LLM connection
// We use the local Ollama instance running on port 11434
export const getLocalLLM = (modelName = 'llama3:8b') => {
  return new Ollama({
    baseUrl: 'http://localhost:11434', 
    model: modelName,
  });
};

export const retrieveLocalKnowledge = (query: string, limit = 3) => {
  const db = getDb();
  
  // Using FTS5 match query
  const stmt = db.prepare(`
    SELECT c.content as chunk_text, d.title as document_title, d.id as doc_id
    FROM document_chunks_fts f
    JOIN document_chunks c ON c.id = f.chunk_id
    JOIN knowledge_documents d ON d.id = f.document_id
    WHERE document_chunks_fts MATCH ?
    ORDER BY rank
    LIMIT ?
  `);

  try {
    // Basic SQLite FTS query formatting (enclosing in quotes or using basic word match)
    const cleanQuery = query.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(w => w.length > 2).join(' OR ');
    
    if (!cleanQuery) return [];

    const results = stmt.all(cleanQuery, limit) as { chunk_text: string, document_title: string, doc_id: string }[];
    return results.map(row => ({
      text: row.chunk_text,
      title: row.document_title,
      id: row.doc_id
    }));
  } catch (error) {
    console.error('FTS5 Retrieval Error:', error);
    return [];
  }
};

// 3. The Full Offline RAG Pipeline
export const askAssistant = async (question: string) => {
  const llm = getLocalLLM();
  const context = retrieveLocalKnowledge(question);
  
  const contextStrings = context.map(c => `[Source: ${c.title}]: ${c.text}`);
  const contextString = contextStrings.length > 0 ? contextStrings.join('\n\n') : 'No local emergency documents found for this query.';

  const prompt = PromptTemplate.fromTemplate(`
You are Bantay AI, a local emergency assistant for the Philippines.
You must answer the user's question using ONLY the retrieved local knowledge below. You must speak Tagalog and English fluently.
If the answer is not in the knowledge base, advise the user based on general safety protocols but explicitly state that you lack specific local documentation.

LOCAL KNOWLEDGE BASE EXTRACTS:
{context}

QUESTION:
{question}

ANSWER:`);

  const chain = prompt.pipe(llm).pipe(new StringOutputParser());

  const response = await chain.invoke({
    context: contextString,
    question,
  });

  return {
    response,
    sources: context,
    isLocal: true
  };
};
