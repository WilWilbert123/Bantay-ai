import Link from 'next/link';
import { connection } from 'next/server';
import { alertsRepository } from '@/lib/db/repositories/alerts.repository';
import { RealTimeClock } from '@/components/dashboard/real-time-clock';

export const instant = false;

export default async function EmergencyHubPage() {
  await connection();
  const activeAlerts = alertsRepository.getActiveAlerts();
  const activeThreat = activeAlerts.length > 0 ? activeAlerts[0] : null;

  const getThreatType = (title: string, alertType: string) => {
    const lower = (title + alertType).toLowerCase();
    if (lower.includes('typhoon') || lower.includes('bagyo')) return 'typhoon';
    if (lower.includes('flood') || lower.includes('baha')) return 'flood';
    if (lower.includes('earthquake') || lower.includes('lindol')) return 'earthquake';
    return 'evacuation';
  };

  const guides = [
    { id: 'typhoon', title: 'Typhoon', href: '/emergency/typhoon', icon: '🌀', desc: 'Winds, cyclones, and storm surges', color: 'bg-blue-950/60 border border-blue-800/60 text-blue-400', hover: 'hover:border-blue-500' },
    { id: 'flood', title: 'Flood', href: '/emergency/flood', icon: '🌊', desc: 'Rising water levels and flash floods', color: 'bg-cyan-950/60 border border-cyan-800/60 text-cyan-400', hover: 'hover:border-cyan-500' },
    { id: 'earthquake', title: 'Earthquake', href: '/emergency/earthquake', icon: '🫨', desc: 'Tremors and structural collapse', color: 'bg-amber-950/60 border border-amber-800/60 text-amber-400', hover: 'hover:border-amber-500' },
    { id: 'evacuation', title: 'Evacuation', href: '/emergency/evacuation', icon: '🏃', desc: 'How to leave safely and where to go', color: 'bg-emerald-950/60 border border-emerald-800/60 text-emerald-400', hover: 'hover:border-emerald-500' },
    { id: 'first-aid', title: 'First Aid', href: '/emergency/first-aid', icon: '⚕️', desc: 'Immediate medical protocols', color: 'bg-red-950/60 border border-red-800/60 text-red-400', hover: 'hover:border-red-500' },
    { id: 'emergency-kit', title: 'Emergency Kit', href: '/emergency/emergency-kit', icon: '🎒', desc: '72-Hour "Go Bag" Checklist', color: 'bg-purple-950/60 border border-purple-800/60 text-purple-400', hover: 'hover:border-purple-500' },
  ];

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto p-4 md:p-6 gap-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white">Emergency & Survival Guides</h1>
          <p className="text-slate-400 mt-1 max-w-2xl text-sm">These protocols are loaded locally on your device and are accessible entirely offline. Always prioritize physical safety over property.</p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800 shadow-sm shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-300 font-mono"><RealTimeClock /></span>
        </div>
      </div>

      {/* Real-time Threat Banner */}
      {activeThreat ? (
        <div className="shrink-0 bg-gradient-to-r from-red-950 to-red-900/40 border-l-4 border-red-500 rounded-r-xl rounded-l-md p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-1">
              <span className="px-2 py-0.5 rounded border border-red-800 bg-red-950/80 text-red-400 text-[10px] font-black uppercase tracking-wider">
                Active Local Threat ({activeThreat.severity})
              </span>
            </div>
            <h2 className="text-lg font-bold text-white">{activeThreat.title}</h2>
            <p className="text-red-200 mt-0.5 max-w-xl text-sm leading-relaxed">{activeThreat.description}</p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <Link href={`/emergency/${getThreatType(activeThreat.title, activeThreat.alert_type)}`} className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm text-sm">
              View Protocol
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      ) : (
        <div className="shrink-0 bg-emerald-950/40 border-l-4 border-emerald-500 rounded-r-xl rounded-l-md p-4 shadow-sm flex items-center justify-between gap-4 relative overflow-hidden border border-emerald-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-900/40 flex items-center justify-center text-emerald-400 font-bold shrink-0 border border-emerald-700/50">
              ✓
            </div>
            <div>
              <h2 className="text-base font-bold text-emerald-400">All Clear - No Active Emergency Threats</h2>
              <p className="text-xs text-emerald-200/80">Local sensor networks and PAGASA offline caches indicate normal conditions.</p>
            </div>
          </div>
        </div>
      )}

      {/* Guide Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 min-h-0 overflow-y-auto custom-scrollbar pr-1">
        {guides.map(guide => {
          const isRecommended = activeThreat && (guide.id === getThreatType(activeThreat.title, activeThreat.alert_type) || guide.id === 'evacuation');
          
          return (
            <Link href={guide.href} key={guide.title} className="group block h-full">
              <div className={`h-full p-4 flex flex-col rounded-xl border transition-all duration-300 relative overflow-hidden ${isRecommended ? 'bg-slate-900 border-red-800 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:border-red-400 hover:shadow-md' : `bg-slate-900 border-slate-800 shadow-sm hover:shadow-md hover:border-slate-500`}`}>
                
                {isRecommended && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-red-500">Suggested</span>
                  </div>
                )}
                
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 shrink-0 ${guide.color}`}>
                  {guide.icon}
                </div>
                
                <h2 className="text-base font-bold text-white mb-0.5 group-hover:text-blue-400 transition-colors">{guide.title}</h2>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{guide.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* AI Assistant Banner */}
      <div className="shrink-0 bg-slate-900 rounded-xl p-5 relative overflow-hidden shadow-sm border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="font-bold text-white text-base">Need specific advice?</h3>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs max-w-lg">
            Our Local AI can analyze your situation using offline knowledge and real-time sensor data.
          </p>
        </div>
        
        <Link 
          href="/assistant" 
          className="relative z-10 shrink-0 flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-slate-200 border border-slate-800 font-bold rounded-lg hover:bg-slate-800 hover:text-white transition-all shadow-sm text-sm"
        >
          Ask Offline Assistant
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
