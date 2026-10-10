import { getDb } from '../connection';

export interface KnowledgeCategory {
  name: string;
  count: number;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  document_type: string;
  publisher: string;
  published_at: string;
}

export interface SearchResult {
  document_id: string;
  chunk_id: string;
  title: string;
  section_title: string | null;
  content: string;
}

export const knowledgeRepository = {
  getCategories(): KnowledgeCategory[] {
    const db = getDb();
    return db.prepare(`
      SELECT document_type as name, COUNT(*) as count 
      FROM knowledge_documents 
      WHERE status = 'ACTIVE' 
      GROUP BY document_type
      ORDER BY count DESC
    `).all() as KnowledgeCategory[];
  },

  getAllDocuments(): KnowledgeDocument[] {
    const db = getDb();
    return db.prepare(`
      SELECT d.id, d.title, d.document_type, s.publisher, d.published_at 
      FROM knowledge_documents d
      JOIN knowledge_sources s ON d.source_id = s.id
      WHERE d.status = 'ACTIVE'
      ORDER BY d.published_at DESC
    `).all() as KnowledgeDocument[];
  },

  search(query: string): SearchResult[] {
    if (!query || query.trim() === '') {
      return [];
    }
    const db = getDb();
    return db.prepare(`
      SELECT 
        fts.document_id,
        fts.chunk_id,
        d.title,
        fts.section_title,
        snippet(document_chunks_fts, 2, '<b>', '</b>', '...', 64) as content
      FROM document_chunks_fts fts
      JOIN knowledge_documents d ON fts.document_id = d.id
      WHERE document_chunks_fts MATCH ?
      ORDER BY rank
      LIMIT 20
    `).all(query) as SearchResult[];
  }
};
