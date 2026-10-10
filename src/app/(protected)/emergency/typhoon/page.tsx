import Link from 'next/link';

export default function TyphoonProtocolPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 text-slate-100">
      <div>
        <div className="flex items-center gap-2 text-xs mb-2">
          <Link href="/emergency" className="text-slate-400 hover:text-blue-400 transition-colors">Emergency Guides</Link>
          <span className="text-slate-600">/</span>
          <span className="font-semibold text-blue-400">Typhoon Protocol</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Typhoon Protocol</h1>
        <p className="text-sm text-slate-400 mt-1">Verified survival and response guidelines for severe tropical cyclones in the Philippines.</p>
      </div>

      {/* Warning Banner */}
      <div className="bg-red-950/40 border border-red-800/60 p-4 rounded-xl backdrop-blur-md">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h3 className="font-bold text-red-400 text-base">PAGASA Warning System Rules</h3>
            <p className="text-xs text-red-200/90 mt-1 leading-relaxed">If Signal No. 3 or higher is raised in your area, coastal and low-lying areas must evacuate immediately. Do not wait for the storm to peak.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 shadow-lg backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="bg-blue-600/30 text-blue-400 border border-blue-500/30 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              Before the Typhoon
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                <span>Check your <Link href="/emergency/emergency-kit" className="text-blue-400 font-semibold hover:underline">72-Hour Emergency Kit</Link> and ensure all power banks and electronics are fully charged.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                <span>Store clean drinking water in containers. The water supply may be compromised during floods.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                <span>Secure loose objects outside (pots, furniture, tin roofs) that could become lethal projectiles in high winds.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                <span>Identify your designated local evacuation center and plan your route.</span>
              </li>
            </ul>
          </section>

          <section className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 shadow-lg backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="bg-amber-600/30 text-amber-400 border border-amber-500/30 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              During the Typhoon
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></div>
                <span>Stay indoors and away from windows. Close all windows and doors securely.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></div>
                <span>Turn off the main electrical breaker if your house begins to flood to prevent electrocution.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></div>
                <span>Monitor updates via battery-powered radio. Beware of the "eye" of the storm—the calm is temporary, violent winds will return from the opposite direction.</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-xl">
            <h3 className="font-bold text-white text-sm mb-3">Quick Actions</h3>
            <div className="space-y-2.5">
              <Link href="/assistant" className="block w-full bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors border border-slate-700/60 text-center">
                Ask Local AI about Typhoons
              </Link>
              <Link href="/map" className="block w-full bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors border border-slate-700/60 text-center">
                View Local Hazard Map
              </Link>
              <Link href="/admin/alerts" className="block w-full bg-red-600 hover:bg-red-500 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-center shadow-lg shadow-red-950/50">
                Broadcast Distress Signal
              </Link>
            </div>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80 shadow-lg">
            <h3 className="font-bold text-white text-sm mb-3">Important Contacts</h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">National Emergency</span>
                <span className="font-bold text-white">911</span>
              </li>
              <li className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">NDRRMC</span>
                <span className="font-bold text-white">(02) 8911-1406</span>
              </li>
              <li className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">Red Cross</span>
                <span className="font-bold text-white">143</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-400">PAGASA</span>
                <span className="font-bold text-white">(02) 8284-0800</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
