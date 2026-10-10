-- migrations/006_sensor_system.sql

CREATE TABLE IF NOT EXISTS sensor_devices (
    id TEXT PRIMARY KEY,
    device_name TEXT NOT NULL,
    device_type TEXT NOT NULL,
    location_name TEXT NOT NULL,
    latitude REAL,
    longitude REAL,
    measurement_unit TEXT NOT NULL,
    configuration_json TEXT NOT NULL,
    device_key_hash TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('ACTIVE', 'INACTIVE', 'MAINTENANCE')),
    last_seen_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'utc'))
);

CREATE TABLE IF NOT EXISTS sensor_readings (
    id TEXT PRIMARY KEY,
    sensor_id TEXT NOT NULL REFERENCES sensor_devices(id) ON DELETE CASCADE,
    measurement_type TEXT NOT NULL,
    value REAL NOT NULL,
    unit TEXT NOT NULL,
    measured_at TEXT NOT NULL,
    received_at TEXT NOT NULL DEFAULT (datetime('now', 'utc')),
    quality_status TEXT NOT NULL CHECK(quality_status IN ('GOOD', 'SUSPECT', 'BAD')),
    sequence_number INTEGER
);

CREATE INDEX IF NOT EXISTS idx_sensor_readings_sensor_id ON sensor_readings(sensor_id);
CREATE INDEX IF NOT EXISTS idx_sensor_readings_measured_at ON sensor_readings(measured_at);
CREATE INDEX IF NOT EXISTS idx_sensor_readings_type ON sensor_readings(measurement_type);
