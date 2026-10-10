import { runMigrations } from './migrate-database';
import { getDb } from '../src/lib/db/connection';
import fs from 'fs';
import path from 'path';

function initializeDatabase() {
  console.log('Initializing BANTAY AI Database...');
  
  // Ensure data directories exist
  const dirs = [
    'data/database',
    'data/backups',
    'data/maps',
    'data/reports',
    'data/uploads'
  ];
  
  for (const dir of dirs) {
    const fullPath = path.resolve(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  }
  
  // Run migrations
  runMigrations();
  
  // Verify integrity
  const db = getDb();
  console.log('Running integrity check...');
  const integrity = db.pragma('integrity_check', { simple: false }) as { integrity_check: string }[];
  
  if (integrity.length > 0 && integrity[0].integrity_check === 'ok') {
    console.log('Database integrity check passed.');
  } else {
    console.error('Database integrity check failed:', integrity);
    process.exit(1);
  }
  
  console.log('Running foreign key check...');
  const fkCheck = db.pragma('foreign_key_check', { simple: false }) as any[];
  
  if (fkCheck.length === 0) {
    console.log('Foreign key check passed.');
  } else {
    console.error('Foreign key check failed:', fkCheck);
    process.exit(1);
  }
  
  console.log('Database initialization complete.');
}

if (require.main === module) {
  initializeDatabase();
}
