import React from 'react';

export function BackupControls() {
  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
      <h3 className="font-bold text-slate-800">Offline SQLite Backup</h3>
      <p className="text-sm text-slate-600">Export your local settings, contacts, and custom knowledge base to a single file.</p>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 transition">Export Database</button>
        <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded text-sm font-bold hover:bg-slate-50 transition">Restore</button>
      </div>
    </div>
  );
}