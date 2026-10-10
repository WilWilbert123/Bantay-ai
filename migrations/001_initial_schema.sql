-- migrations/001_initial_schema.sql


-- Schema migrations tracking
CREATE TABLE IF NOT EXISTS schema_migrations (
    version TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    checksum TEXT NOT NULL,
    applied_at TEXT NOT NULL DEFAULT (datetime('now', 'utc'))
);

-- App settings table
CREATE TABLE IF NOT EXISTS app_settings (
    key TEXT PRIMARY KEY,
    value_json TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'utc'))
);

-- Backup records
CREATE TABLE IF NOT EXISTS backup_records (
    id TEXT PRIMARY KEY,
    relative_path TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'utc')),
    database_sha256 TEXT NOT NULL,
    backup_size_bytes INTEGER NOT NULL,
    verified_at TEXT,
    status TEXT NOT NULL
);
