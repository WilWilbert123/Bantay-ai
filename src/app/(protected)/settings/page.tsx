import Link from 'next/link';
import { getCurrentSession } from '../../../lib/auth/session';
import { getDb } from '@/lib/db/connection';
import fs from 'fs';
import path from 'path';

export default async function SettingsPage() {
  const { user } = await getCurrentSession();

  // Fetch real-time system stats
  const db = getDb();
  const journalMode = db.pragma('journal_mode', { simple: true });
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  const dbFileName = process.env.DATABASE_FILE || 'bantay.db';
  const dbPath = path.resolve(process.cwd(), 'data', 'database', dbFileName);
  let dbSize = "Unknown";
  try {
    const stats = fs.statSync(dbPath);
    dbSize = (stats.size / (1024 * 1024)).toFixed(2) + ' MB';
  } catch (e) {}

  const usersRecord = db.prepare('SELECT count(*) as count FROM users').get() as {count: number};
  const alertsRecord = db.prepare('SELECT count(*) as count FROM alerts WHERE status = ?').get('ACTIVE') as {count: number};
  const settingsCards = [
    { title: 'Security & Auth', href: '/settings/security', desc: 'Change password, manage sessions, local roles' },
    { title: 'Offline Models (AI)', href: '/settings/models', desc: 'Manage local LLMs, embeddings, and Ollama configuration' },
    { title: 'Data Backup', href: '/settings/backup', desc: 'Export and restore the SQLite database offline' },
    { title: 'Privacy & telemetry', href: '/settings/privacy', desc: 'Configure strict offline privacy mode' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Node Settings</h1>
        <p className="text-slate-400">Configure your local offline installation of Bantay AI.</p>
      </div>

      <div className="bg-slate-900 rounded-xl shadow-sm border p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-slate-400 font-bold text-xl">
            {user?.display_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-bold text-lg text-white">{user?.display_name}</h2>
            <p className="text-sm text-slate-400">@{user?.username} &bull; {user?.role}</p>
          </div>
        </div>
        <div>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
            {user?.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingsCards.map(card => (
          <Link href={card.href} key={card.title} className="block group">
            <div className="bg-slate-900 p-6 rounded-xl shadow-sm border hover:border-blue-700 transition-colors h-full flex flex-col justify-center">
              <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors mb-1">{card.title}</h3>
              <p className="text-sm text-slate-400">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h3 className="font-bold text-white mb-4">System Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-slate-800">
            <span className="text-slate-400">Database Engine</span>
            <span className="font-medium text-white">SQLite ({String(journalMode).toUpperCase()} Mode) &bull; {dbSize}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-800">
            <span className="text-slate-400">Runtime Environment</span>
            <span className="font-medium text-white">Node.js {process.version}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-800">
            <span className="text-slate-400">Authentication</span>
            <span className="font-medium text-white">Argon2id (Local Only)</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-800">
            <span className="text-slate-400">System Metrics</span>
            <span className="font-medium text-white">{usersRecord.count} Users &bull; {alertsRecord.count} Active Alerts</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-400">Software Version</span>
            <span className="font-medium text-white">v{pkg.version}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
