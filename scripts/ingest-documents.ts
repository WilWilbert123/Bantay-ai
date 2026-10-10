import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { getDb } from '../src/lib/db/connection';

function generateId(): string {
  return crypto.randomUUID();
}

function calculateHash(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

export function ingestKnowledgeBase(sourcesDir = path.join(process.cwd(), 'knowledge-base', 'sources')) {
  const db = getDb();
  console.log(`Starting Document Ingestion from: ${sourcesDir}...`);

  if (!fs.existsSync(sourcesDir)) {
    console.error(`Sources directory not found: ${sourcesDir}`);
    return;
  }

  // Find or create default knowledge source
  let sourceRow = db.prepare(`SELECT id FROM knowledge_sources WHERE name = ?`).get('NDRRMC & National Agencies') as { id: string } | undefined;
  let sourceId = sourceRow?.id;

  if (!sourceId) {
    sourceId = generateId();
    db.prepare(`
      INSERT INTO knowledge_sources (id, name, publisher, authority_level, status)
      VALUES (?, ?, ?, ?, ?)
    `).run(sourceId, 'NDRRMC & National Agencies', 'NDRRMC', 'NATIONAL', 'ACTIVE');
  }

  let totalDocs = 0;
  let totalChunks = 0;

  function walkDir(currentPath: string) {
    const files = fs.readdirSync(currentPath);

    for (const file of files) {
      const fullPath = path.join(currentPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (file.endsWith('.md') || file.endsWith('.txt') || file.endsWith('.json')) {
        try {
          const rawContent = fs.readFileSync(fullPath, 'utf-8');
          if (!rawContent.trim()) continue;

          const title = path.basename(file, path.extname(file)).replace(/[-_]/g, ' ').toUpperCase();
          const docHash = calculateHash(rawContent);

          // Insert document
          const docId = generateId();
          db.prepare(`
            INSERT INTO knowledge_documents (id, source_id, title, document_type, content_sha256, status, published_at)
            VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
          `).run(docId, sourceId, title, 'Official Guidelines', docHash, 'ACTIVE');

          totalDocs++;

          // Chunk document into ~500 character chunks
          const paragraphs = rawContent.split(/\n\s*\n/);
          let chunkIndex = 0;

          for (const para of paragraphs) {
            const cleanPara = para.trim();
            if (!cleanPara) continue;

            const chunkId = generateId();
            const chunkHash = calculateHash(cleanPara);

            db.prepare(`
              INSERT INTO document_chunks (id, document_id, chunk_index, content, section_title, content_sha256)
              VALUES (?, ?, ?, ?, ?, ?)
            `).run(chunkId, docId, chunkIndex, cleanPara, title, chunkHash);

            chunkIndex++;
            totalChunks++;
          }

          console.log(`Ingested: ${file} (${chunkIndex} chunks)`);
        } catch (err) {
          console.error(`Error processing file ${file}:`, err);
        }
      }
    }
  }

  walkDir(sourcesDir);
  console.log(`Ingestion Complete! Ingested ${totalDocs} documents and ${totalChunks} chunks into SQLite Knowledge Base.`);
}

if (require.main === module) {
  ingestKnowledgeBase();
}
