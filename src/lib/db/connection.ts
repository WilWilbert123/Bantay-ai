import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  // Configuration - use env var or default path
  const dbFileName = process.env.DATABASE_FILE || 'bantay.db';
  const dataDir = path.resolve(process.cwd(), 'data', 'database');
  
  // Ensure the directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, dbFileName);

  db = new Database(dbPath, {
    // Only log in dev if needed
    // verbose: console.log
  });

  // Apply critical pragmas
  db.pragma('foreign_keys = ON');
  db.pragma('journal_mode = WAL');
  db.pragma('synchronous = NORMAL');
  db.pragma('busy_timeout = 5000');

  // Ensure process exit cleans up the DB connection
  process.on('exit', () => {
    if (db) db.close();
  });
  
  process.on('SIGHUP', () => process.exit(128 + 1));
  process.on('SIGINT', () => process.exit(128 + 2));
  process.on('SIGTERM', () => process.exit(128 + 15));

  return db;
}

export function closeDb(): void {
  if (db) {
    db.close();
    db = null;
  }
}
