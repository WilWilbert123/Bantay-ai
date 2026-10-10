-- migrations/009_fts_indexes.sql

-- Virtual table for full-text search on knowledge base chunks
CREATE VIRTUAL TABLE IF NOT EXISTS document_chunks_fts USING fts5(
    document_id UNINDEXED,
    chunk_id UNINDEXED,
    content,
    section_title,
    tokenize="unicode61 remove_diacritics 1"
);

-- Triggers to keep FTS index synced with document_chunks

CREATE TRIGGER IF NOT EXISTS document_chunks_ai AFTER INSERT ON document_chunks BEGIN
  INSERT INTO document_chunks_fts(rowid, document_id, chunk_id, content, section_title) 
  VALUES (new.rowid, new.document_id, new.id, new.content, new.section_title);
END;

CREATE TRIGGER IF NOT EXISTS document_chunks_ad AFTER DELETE ON document_chunks BEGIN
  INSERT INTO document_chunks_fts(document_chunks_fts, rowid, document_id, chunk_id, content, section_title) 
  VALUES('delete', old.rowid, old.document_id, old.id, old.content, old.section_title);
END;

CREATE TRIGGER IF NOT EXISTS document_chunks_au AFTER UPDATE ON document_chunks BEGIN
  INSERT INTO document_chunks_fts(document_chunks_fts, rowid, document_id, chunk_id, content, section_title) 
  VALUES('delete', old.rowid, old.document_id, old.id, old.content, old.section_title);
  INSERT INTO document_chunks_fts(rowid, document_id, chunk_id, content, section_title) 
  VALUES (new.rowid, new.document_id, new.id, new.content, new.section_title);
END;
