-- migrations/005_disaster_monitoring.sql

CREATE TABLE IF NOT EXISTS emergency_incidents (
    id TEXT PRIMARY KEY,
    incident_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    latitude REAL,
    longitude REAL,
    location_accuracy_m REAL,
    source_type TEXT NOT NULL,
    source_reference TEXT,
    verification_status TEXT NOT NULL CHECK(verification_status IN ('UNVERIFIED', 'VERIFIED', 'DISMISSED')),
    started_at TEXT,
    observed_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'utc')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'utc'))
);

CREATE TABLE IF NOT EXISTS alerts (
    id TEXT PRIMARY KEY,
    incident_id TEXT REFERENCES emergency_incidents(id),
    alert_type TEXT NOT NULL,
    severity TEXT NOT NULL CHECK(severity IN ('INFO', 'WARNING', 'CRITICAL')),
    status TEXT NOT NULL CHECK(status IN ('ACTIVE', 'ACKNOWLEDGED', 'RESOLVED', 'EXPIRED')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    trigger_source TEXT NOT NULL,
    trigger_value REAL,
    threshold_value REAL,
    issued_at TEXT NOT NULL DEFAULT (datetime('now', 'utc')),
    last_evidence_at TEXT,
    expires_at TEXT,
    acknowledged_at TEXT
);

CREATE TABLE IF NOT EXISTS alert_evidence (
    id TEXT PRIMARY KEY,
    alert_id TEXT NOT NULL REFERENCES alerts(id) ON DELETE CASCADE,
    evidence_type TEXT NOT NULL,
    sensor_reading_id TEXT,
    community_report_id TEXT,
    source_document_id TEXT REFERENCES knowledge_documents(id),
    description TEXT NOT NULL,
    observed_at TEXT NOT NULL DEFAULT (datetime('now', 'utc')),
    verification_status TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_alerts_status ON alerts(status);
CREATE INDEX IF NOT EXISTS idx_emergency_incidents_status ON emergency_incidents(verification_status);
