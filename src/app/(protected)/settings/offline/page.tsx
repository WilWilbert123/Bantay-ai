import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Offline</h1>
        <p className="text-slate-400 mt-2">Local offline interface for the Offline module.</p>
      </div>

      <div className="bg-slate-900 border-slate-800 p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 text-slate-200 font-medium mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-500">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
          </svg>
          System Interface Initialized
        </div>
        <p className="text-sm text-slate-400 mb-6">
          This UI module is connected to the offline router. In upcoming phases, it will be wired directly to the local SQLite database.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-100">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Module Status</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="font-mono text-sm">UI Mounted</span>
            </div>
          </div>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-100">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Data Source</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="font-mono text-sm">Awaiting DB Bindings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
