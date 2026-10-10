import Link from 'next/link';

export default function EvacuationPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 text-slate-100">
      <div>
        <div className="flex items-center gap-2 text-xs mb-2">
          <Link href="/emergency" className="text-slate-400 hover:text-blue-400 transition-colors">Emergency Guides</Link>
          <span className="text-slate-600">/</span>
          <span className="font-semibold text-emerald-400">Evacuation Protocol</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Evacuation Protocol</h1>
        <p className="text-sm text-slate-400 mt-1">Official guidelines on when, how, and where to evacuate safely.</p>
      </div>

      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 shadow-lg backdrop-blur-md space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Find Nearby Evacuation Center</h2>
            <p className="text-xs text-slate-400 mt-1">Locate active local shelters on the offline interactive map.</p>
          </div>
          <Link href="/map" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-950/50">
            Open Interactive Map
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2">1. Grab Go-Bag</h3>
            <span className="text-xs text-slate-300">Ensure your 72-hour emergency kit and essential documents are secured before leaving.</span>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-2">2. Secure Property</h3>
            <span className="text-xs text-slate-300">Turn off main electricity, gas, and water valves if time permits.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
