-- migrations/011_sensor_rules.sql

CREATE TABLE IF NOT EXISTS sensor_rules (
    id TEXT PRIMARY KEY,
    sensor_id TEXT NOT NULL REFERENCES sensor_devices(id) ON DELETE CASCADE,
    rule_name TEXT NOT NULL,
    condition_operator TEXT NOT NULL CHECK(condition_operator IN ('>', '<', '=', '>=', '<=')),
    threshold_value REAL NOT NULL,
    duration_minutes INTEGER NOT NULL,
    action_type TEXT NOT NULL CHECK(action_type IN ('ALERT', 'NOTIFY')),
    severity TEXT NOT NULL CHECK(severity IN ('INFO', 'WARNING', 'CRITICAL')),
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'utc'))
);

CREATE INDEX IF NOT EXISTS idx_sensor_rules_sensor_id ON sensor_rules(sensor_id);
