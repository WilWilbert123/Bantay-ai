-- migrations/003_knowledge_base.sql

CREATE TABLE IF NOT EXISTS model_registry (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    provider TEXT NOT NULL,
    model_path TEXT,
    model_format TEXT,
    quantization TEXT,
    sha256 TEXT,
    size_bytes INTEGER,
    installed_at TEXT,
    verified_at TEXT,
    enabled INTEGER NOT NULL DEFAULT 0 CHECK(enabled IN (0, 1))
);

CREATE TABLE IF NOT EXISTS knowledge_sources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    publisher TEXT NOT NULL,
    source_url TEXT,
    authority_level TEXT NOT NULL,
    license TEXT,
    retrieved_at TEXT,
    published_at TEXT,
    reviewed_at TEXT,
    expires_at TEXT,
    content_sha256 TEXT,
    status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS knowledge_documents (
    id TEXT PRIMARY KEY,
    source_id TEXT NOT NULL REFERENCES knowledge_sources(id),
    title TEXT NOT NULL,
    document_type TEXT NOT NULL,
    relative_path TEXT,
    language TEXT NOT NULL DEFAULT 'en',
    revision TEXT,
    published_at TEXT,
    imported_at TEXT NOT NULL DEFAULT (datetime('now', 'utc')),
    content_sha256 TEXT NOT NULL,
    status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS document_chunks (
    id TEXT PRIMARY KEY,
    document_id TEXT NOT NULL REFERENCES knowledge_documents(id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL,
    content TEXT NOT NULL,
    page_number INTEGER,
    section_title TEXT,
    token_count INTEGER,
    content_sha256 TEXT NOT NULL,
    UNIQUE(document_id, chunk_index)
);

CREATE TABLE IF NOT EXISTS document_embeddings (
    chunk_id TEXT PRIMARY KEY REFERENCES document_chunks(id) ON DELETE CASCADE,
    model_id TEXT NOT NULL REFERENCES model_registry(id),
    dimensions INTEGER NOT NULL,
    embedding_blob BLOB NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_knowledge_documents_source_id ON knowledge_documents(source_id);
CREATE INDEX IF NOT EXISTS idx_document_chunks_document_id ON document_chunks(document_id);
