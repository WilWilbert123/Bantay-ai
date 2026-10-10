import Link from 'next/link';

export default function FloodProtocolPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 text-slate-100">
      <div>
        <div className="flex items-center gap-2 text-xs mb-2">
          <Link href="/emergency" className="text-slate-400 hover:text-blue-400 transition-colors">Emergency Guides</Link>
          <span className="text-slate-600">/</span>
          <span className="font-semibold text-cyan-400">Flood Protocol</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Flood Protocol</h1>
        <p className="text-sm text-slate-400 mt-1">Verified survival guidelines for rising water levels, flash floods, and waterborne hazards.</p>
      </div>

      {/* Warning Banner */}
      <div className="bg-red-950/40 border border-red-800/60 p-4 rounded-xl backdrop-blur-md">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h3 className="font-bold text-red-400 text-base">Turn Around, Don't Drown!</h3>
            <p className="text-xs text-red-200/90 mt-1 leading-relaxed">Just 6 inches of fast-moving water can knock over an adult. Just 12 inches of rushing water can carry away most cars.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 shadow-lg backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="bg-cyan-600/30 text-cyan-400 border border-cyan-500/30 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              Immediate Actions
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0"></div>
                <span>Move to higher ground immediately if advised or if water begins rising rapidly.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0"></div>
                <span>Disconnect all electrical appliances and turn off the main breaker if water enters your home. Do not touch wet electrical equipment.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0"></div>
                <span>Grab your <Link href="/emergency/emergency-kit" className="text-blue-400 font-semibold hover:underline">Emergency Go Bag</Link> before moving.</span>
              </li>
            </ul>
          </section>

          <section className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 shadow-lg backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="bg-red-600/30 text-red-400 border border-red-500/30 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              What NOT to Do
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="font-semibold text-red-300">Do not walk through moving water.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="font-semibold text-red-300">Do not drive into flooded areas. If your vehicle stalls, abandon it immediately and seek higher ground.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="font-semibold text-red-300">Avoid contact with floodwater—it is highly contaminated with sewage, chemicals, and debris (leptospirosis risk).</span>
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
                Ask Local AI about Floods
              </Link>
              <Link href="/monitoring" className="block w-full bg-cyan-600 hover:bg-cyan-500 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-center shadow-lg shadow-cyan-950/50">
                Check Water Level Sensors
              </Link>
              <Link href="/map" className="block w-full bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors border border-slate-700/60 text-center">
                View Flood Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
