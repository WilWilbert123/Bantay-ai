import { getDb } from '../src/lib/db/connection';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

function sha256(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

export function runMigrations() {
  const db = getDb();
  
  console.log('Running database migrations...');
  
  // First, ensure the schema_migrations table exists by running the first migration directly
  // if the table doesn't exist.
  const checkTableSql = "SELECT name FROM sqlite_master WHERE type='table' AND name='schema_migrations'";
  const tableExists = db.prepare(checkTableSql).get();
  
  const migrationsDir = path.resolve(process.cwd(), 'migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, 'utf8');
    const checksum = sha256(sql);
    
    // Check if migration is already applied
    if (tableExists) {
      const existing = db.prepare('SELECT checksum FROM schema_migrations WHERE version = ?').get(file) as { checksum: string } | undefined;
      
      if (existing) {
        if (existing.checksum !== checksum) {
          console.error(`ERROR: Checksum mismatch for migration ${file}.`);
          console.error(`Expected: ${existing.checksum}, Found: ${checksum}`);
          console.error('The migration file has been modified after it was applied!');
          process.exit(1);
        }
        console.log(`Skipping applied migration: ${file}`);
        continue;
      }
    }
    
    console.log(`Applying migration: ${file}`);
    
    // Execute migration in transaction
    const executeMigration = db.transaction(() => {
      db.exec(sql);
      
      // Update tracking table
      // Note: First migration creates this table, so it will exist now.
      db.prepare('INSERT INTO schema_migrations (version, name, checksum) VALUES (?, ?, ?)')
        .run(file, file, checksum);
    });
    
    try {
      executeMigration();
    } catch (error) {
      console.error(`Failed to apply migration ${file}:`, error);
      process.exit(1);
    }
  }
  
  console.log('All migrations applied successfully.');
}

// Run if called directly
if (require.main === module) {
  runMigrations();
}
