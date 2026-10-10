import Link from 'next/link';

export default function EarthquakePage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 text-slate-100">
      <div>
        <div className="flex items-center gap-2 text-xs mb-2">
          <Link href="/emergency" className="text-slate-400 hover:text-blue-400 transition-colors">Emergency Guides</Link>
          <span className="text-slate-600">/</span>
          <span className="font-semibold text-amber-400">Earthquake Protocol</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Earthquake Protocol</h1>
        <p className="text-sm text-slate-400 mt-1">Verified survival guidelines for seismic events and structural safety.</p>
      </div>

      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-3 text-slate-200 font-medium mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-400">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
          </svg>
          DUCK, COVER, AND HOLD PROTOCOL
        </div>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          In the event of a earthquake, immediately take cover under a sturdy desk or table. Hold on until the shaking stops completely. Do not use elevators.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-2">Before shaking stops</h3>
            <span className="text-xs text-slate-300">Protect your head and torso. Stay away from glass windows and heavy hanging fixtures.</span>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2">After shaking stops</h3>
            <span className="text-xs text-slate-300">Evacuate calmly using stairwells to designated open space evacuation zones.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
