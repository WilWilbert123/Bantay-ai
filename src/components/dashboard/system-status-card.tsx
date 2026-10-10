import React from 'react';

export function SystemStatusCard() {
  return (
    <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm flex items-center justify-between">
      <div>
        <h3 className="font-bold text-lg">System Offline Mode</h3>
        <p className="text-slate-400 text-sm mt-1">All data is running from local SQLite.</p>
      </div>
      <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center">
        <div className="h-4 w-4 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
      </div>
    </div>
  );
}