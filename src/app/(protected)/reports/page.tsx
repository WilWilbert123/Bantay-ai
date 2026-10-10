import Link from 'next/link';

export default function ReportsPage() {
  return (
    <div className="h-full flex flex-col p-4 md:p-6 max-w-5xl mx-auto gap-4">
      <div className="shrink-0">
        <h1 className="text-3xl font-bold text-white">Reports</h1>
        <p className="text-slate-400 mt-2">Local offline interface for the Reports module.</p>
      </div>

      <div className="flex-1 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl min-h-0">
        <div className="flex items-center gap-3 text-white font-semibold mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-400">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
          </svg>
          System Interface Initialized
        </div>
        <p className="text-sm text-slate-300 mb-6">
          This UI module is connected to the offline router. In upcoming phases, it will be wired directly to the local SQLite database.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Module Status</h3>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
              <span className="font-mono text-sm text-slate-200">UI Mounted</span>
            </div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Data Source</h3>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"></span>
              <span className="font-mono text-sm text-slate-200">Awaiting DB Bindings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
