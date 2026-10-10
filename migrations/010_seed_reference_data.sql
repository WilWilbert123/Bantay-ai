-- migrations/010_seed_reference_data.sql

-- Example of initial default settings (actual setup will vary)
INSERT OR IGNORE INTO app_settings (key, value_json) VALUES 
('app.name', '"Bantay AI"'),
('app.offline_mode_default', 'true'),
('ai.model_timeout_ms', '30000'),
('ai.max_tokens', '2048'),
('auth.session_duration_hours', '24');

-- NOTE: Demo data and knowledge should be seeded via script (seed-database.ts) 
-- rather than raw SQL to ensure proper UUID generation and ID relations.
