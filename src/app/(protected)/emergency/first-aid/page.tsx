import Link from 'next/link';

export default function FirstAidPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 text-slate-100">
      <div>
        <div className="flex items-center gap-2 text-xs mb-2">
          <Link href="/emergency" className="text-slate-400 hover:text-blue-400 transition-colors">Emergency Guides</Link>
          <span className="text-slate-600">/</span>
          <span className="font-semibold text-red-400">First Aid Protocol</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">First Aid Protocol</h1>
        <p className="text-sm text-slate-400 mt-1">Immediate medical response guides for CPR, severe bleeding, burns, and fractures.</p>
      </div>

      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 shadow-lg backdrop-blur-md space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-red-500">⚕️</span> Emergency Medical Priorities
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">1. Airway & Breathing</h3>
            <p className="text-xs text-slate-300">Clear obstruction immediately. If un-responsive and not breathing, initiate CPR (30 compressions : 2 breaths).</p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">2. Bleeding Control</h3>
            <p className="text-xs text-slate-300">Apply direct, firm pressure with a clean cloth. Elevate injured limbs if possible.</p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">3. Burn Care</h3>
            <p className="text-xs text-slate-300">Cool under clean running water for 10-20 minutes. Cover with clean, non-stick dressing. Do NOT apply ice or butter.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
