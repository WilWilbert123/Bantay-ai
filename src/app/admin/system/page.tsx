import Link from 'next/link';

export default function AdminSystemPage() {
  // In Phase 5, these will be populated by actual Node.js OS metrics and SQLite pragmas
  const systemMetrics = {
    database: {
      engine: 'SQLite3 (better-sqlite3)',
      mode: 'WAL',
      size: '42.5 MB',
      status: 'HEALTHY'
    },
    localAi: {
      engine: 'Ollama',
      model: 'Llama 3 (8B Instruct)',
      status: 'OFFLINE', // Simulated for now
      ramUsage: '0 MB'
    },
    host: {
      os: 'macOS / Darwin',
      runtime: 'Node.js v24.17.0',
      uptime: '3 days, 12 hrs',
      memory: '4.2 GB / 16.0 GB'
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">System Diagnostics</h1>
          <p className="text-slate-600 mt-1">Real-time health, memory, and status of the local offline server.</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" />
          </svg>
          Run Diagnostics
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Database Node */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-5 py-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-600">
                <path fillRule="evenodd" d="M10 1c3.866 0 7 1.79 7 4s-3.134 4-7 4-7-1.79-7-4 3.134-4 7-4Zm5.694 8.13c.464-.264.91-.583 1.306-.952V10c0 2.21-3.134 4-7 4s-7-1.79-7-4V8.178c.396.37.842.688 1.306.953C5.838 10.006 7.854 10.5 10 10.5s4.162-.494 5.694-1.37ZM3 13.179V15c0 2.21 3.134 4 7 4s7-1.79 7-4v-1.822c-.396.37-.842.688-1.306.953-1.532.875-3.548 1.369-5.694 1.369s-4.162-.494-5.694-1.37A7.009 7.009 0 0 1 3 13.179Z" clipRule="evenodd" />
              </svg>
              Database
            </h2>
            <span className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              {systemMetrics.database.status}
            </span>
          </div>
          <div className="p-5 space-y-4 text-sm">
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-slate-500">Engine</span>
              <span className="font-semibold text-slate-800">{systemMetrics.database.engine}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-slate-500">Journal Mode</span>
              <span className="font-semibold text-slate-800">{systemMetrics.database.mode}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Disk Usage</span>
              <span className="font-semibold text-slate-800">{systemMetrics.database.size}</span>
            </div>
          </div>
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
            <button className="text-sm text-blue-600 font-semibold hover:underline">View Migrations &rarr;</button>
          </div>
        </div>

        {/* Local AI Engine */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-5 py-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-purple-600">
                <path d="M10 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM13.82 5.117a.75.75 0 0 1 1.06 1.06l-1.061 1.061a.75.75 0 0 1-1.06-1.06l1.06-1.06ZM17.75 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM13.82 14.883a.75.75 0 0 1-1.06 1.06l-1.061-1.061a.75.75 0 0 1 1.06-1.06l1.06 1.06ZM10 17.75a.75.75 0 0 1-.75-.75v-1.5a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-.75.75ZM6.18 14.883a.75.75 0 0 1-1.06-1.06l1.061-1.061a.75.75 0 0 1 1.06 1.06l-1.06 1.06ZM2.25 10a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM6.18 5.117a.75.75 0 0 1 1.06-1.06l1.061 1.061a.75.75 0 0 1-1.06 1.06l-1.06-1.06Z" />
                <path d="M10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
              </svg>
              Inference Engine
            </h2>
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-200 px-2 py-1 rounded-full">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
              {systemMetrics.localAi.status}
            </span>
          </div>
          <div className="p-5 space-y-4 text-sm">
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-slate-500">Service</span>
              <span className="font-semibold text-slate-800">{systemMetrics.localAi.engine}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-slate-500">Active Model</span>
              <span className="font-semibold text-slate-800">{systemMetrics.localAi.model}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">VRAM/RAM Usage</span>
              <span className="font-semibold text-slate-800">{systemMetrics.localAi.ramUsage}</span>
            </div>
          </div>
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
            <Link href="/admin/knowledge" className="text-sm text-blue-600 font-semibold hover:underline">Manage Knowledge Base &rarr;</Link>
          </div>
        </div>

        {/* Host Node */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-5 py-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-600">
                <path fillRule="evenodd" d="M2 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Zm8 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-4 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm8 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-4 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm8 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-4 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
              </svg>
              Local Host Node
            </h2>
          </div>
          <div className="p-5 space-y-4 text-sm">
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-slate-500">OS</span>
              <span className="font-semibold text-slate-800">{systemMetrics.host.os}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-slate-500">Runtime</span>
              <span className="font-semibold text-slate-800">{systemMetrics.host.runtime}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-slate-500">Host Memory</span>
              <span className="font-semibold text-slate-800">{systemMetrics.host.memory}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Uptime</span>
              <span className="font-semibold text-slate-800">{systemMetrics.host.uptime}</span>
            </div>
          </div>
        </div>

      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-red-900 font-bold mb-2 text-lg">Danger Zone</h3>
        <p className="text-red-800 text-sm mb-4">
          Actions here are destructive and cannot be undone. Always ensure you have an offline backup of your SQLite database before proceeding.
        </p>
        <div className="flex gap-4">
          <button className="bg-white border border-red-300 text-red-700 px-4 py-2 rounded font-semibold text-sm hover:bg-red-100 transition-colors shadow-sm">
            Factory Reset Database
          </button>
          <button className="bg-white border border-red-300 text-red-700 px-4 py-2 rounded font-semibold text-sm hover:bg-red-100 transition-colors shadow-sm">
            Purge Vector Index (FTS5)
          </button>
        </div>
      </div>
    </div>
  );
}
