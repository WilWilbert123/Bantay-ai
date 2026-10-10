-- migrations/007_emergency_directory.sql

CREATE TABLE IF NOT EXISTS community_reports (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    incident_type TEXT NOT NULL,
    description TEXT NOT NULL,
    latitude REAL,
    longitude REAL,
    observed_at TEXT NOT NULL,
    submitted_at TEXT NOT NULL DEFAULT (datetime('now', 'utc')),
    verification_status TEXT NOT NULL CHECK(verification_status IN ('PENDING', 'VERIFIED', 'REJECTED')),
    evidence_path TEXT,
    content_sha256 TEXT
);

CREATE TABLE IF NOT EXISTS report_verifications (
    id TEXT PRIMARY KEY,
    report_id TEXT NOT NULL REFERENCES community_reports(id) ON DELETE CASCADE,
    reviewer_user_id TEXT NOT NULL REFERENCES users(id),
    decision TEXT NOT NULL CHECK(decision IN ('VERIFIED', 'REJECTED')),
    notes TEXT,
    reviewed_at TEXT NOT NULL DEFAULT (datetime('now', 'utc'))
);

CREATE TABLE IF NOT EXISTS emergency_contacts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    organization TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    contact_type TEXT NOT NULL,
    coverage_area TEXT,
    source_id TEXT REFERENCES knowledge_sources(id),
    verified_at TEXT,
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'utc'))
);

CREATE TABLE IF NOT EXISTS emergency_facilities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    facility_type TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude REAL,
    longitude REAL,
    phone_number TEXT,
    accessibility_notes TEXT,
    source_id TEXT REFERENCES knowledge_sources(id),
    verified_at TEXT,
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'utc'))
);

CREATE TABLE IF NOT EXISTS map_features (
    id TEXT PRIMARY KEY,
    feature_type TEXT NOT NULL,
    name TEXT NOT NULL,
    geometry_json TEXT NOT NULL,
    properties_json TEXT NOT NULL,
    source_id TEXT REFERENCES knowledge_sources(id),
    verified_at TEXT,
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'utc'))
);

CREATE INDEX IF NOT EXISTS idx_community_reports_status ON community_reports(verification_status);
CREATE INDEX IF NOT EXISTS idx_emergency_facilities_type ON emergency_facilities(facility_type);
