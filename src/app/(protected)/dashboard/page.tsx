import Link from 'next/link';
import { connection } from 'next/server';
import { RealTimeClock } from '@/components/dashboard/real-time-clock';
import { AskBantayAI } from '@/components/dashboard/ask-bantay-ai';
import MapWrapper from '@/components/map/map-wrapper';
import { alertsRepository } from '@/lib/db/repositories/alerts.repository';
import { facilitiesRepository } from '@/lib/db/repositories/facilities.repository';
import { sensorsRepository } from '@/lib/db/repositories/sensors.repository';

export const instant = false;

export default async function DashboardPage() {
  await connection();
  const alerts = alertsRepository.getActiveAlerts();
  const facilities = facilitiesRepository.getAllFacilities();
  const sensors = sensorsRepository.getAllDevices();


  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto h-full overflow-hidden flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 overflow-hidden min-h-0">
        
        {/* LEFT COLUMN - 8/12 */}
        <div className="lg:col-span-8 flex flex-col gap-4 overflow-hidden">
          
          {/* Hero Banner */}
          <div className="relative shrink-0 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-md">
            <div 
              className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518105658664-964293f0b224?q=80&w=1200&auto=format&fit=crop")' }}
            />
            <div className="relative z-10 p-4 md:p-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🇵🇭</span>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">Good afternoon!</h1>
              </div>
              <p className="text-sm font-medium text-blue-100 max-w-lg">
                BANTAY AI is your offline AI assistant for a safer Philippines.
              </p>
            </div>
          </div>

          {/* Ask Bantay AI Widget */}
          <AskBantayAI />

          {/* Quick Action Grid */}
          <div className="grid grid-cols-5 gap-3 shrink-0">
            {[
              { title: 'Guides', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'text-blue-400', bg: 'bg-blue-900/20', link: '/emergency/emergency-kit' },
              { title: 'Checklists', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-emerald-400', bg: 'bg-emerald-900/20', link: '/checklists' },
              { title: 'Map', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', color: 'text-indigo-400', bg: 'bg-indigo-900/20', link: '/map' },
              { title: 'Reports', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', color: 'text-rose-400', bg: 'bg-rose-900/20', link: '/reports' },
              { title: 'Docs', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z', color: 'text-slate-400', bg: 'bg-slate-800', link: '/knowledge' },
            ].map((item, i) => (
              <Link href={item.link} key={i} className="bg-slate-900 py-3 px-2 rounded-xl border border-slate-800 hover:shadow-md hover:border-slate-300 transition-all flex flex-col items-center text-center group cursor-pointer shadow-sm">
                <div className={`w-8 h-8 ${item.bg} rounded-lg flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform`}>
                  <svg className={`w-4 h-4 ${item.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-white text-[11px] leading-tight">{item.title}</h3>
              </Link>
            ))}
          </div>

          {/* Bottom Grid: Reports & Map */}
          <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
            <div className="bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-800 flex flex-col min-h-0">
              <div className="flex justify-between items-center mb-3 shrink-0">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Recent Reports
                </h3>
                <Link href="/reports" className="text-[10px] text-blue-400 font-medium hover:underline">View all</Link>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {[
                  { title: 'Flooding in Brgy San Isidro', location: 'San Isidro, Bulacan', time: '2h ago', icon: 'text-pink-400 bg-pink-900/40', status: 'Verified', statusColor: 'text-emerald-400 bg-emerald-900/20' },
                  { title: 'Landslide in Sitio Maligaya', location: 'Tuba, Benguet', time: '4h ago', icon: 'text-amber-400 bg-amber-900/40', status: 'Review', statusColor: 'text-amber-400 bg-amber-900/20' },
                ].map((report, i) => (
                  <div key={i} className="flex items-start gap-2 pb-3 border-b border-slate-800 last:border-0 last:pb-0">
                    <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center ${report.icon}`}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-xs truncate">{report.title}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <p className="text-[10px] text-slate-400 truncate">{report.location}</p>
                        <span className="text-slate-300 text-[8px]">•</span>
                        <p className="text-[10px] text-slate-400 shrink-0">{report.time}</p>
                      </div>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${report.statusColor} shrink-0 border border-white/10`}>
                      {report.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-800 flex flex-col min-h-0 relative z-0">
              <div className="flex items-center justify-between mb-3 shrink-0">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Local Map
                </h3>
                <Link href="/map" className="text-[10px] text-blue-400 font-medium hover:underline">Open Map</Link>
              </div>
              <div className="flex-1 rounded-xl border border-slate-800 overflow-hidden relative min-h-[120px] bg-slate-900/50">
                <div className="absolute inset-0 z-0 opacity-90">
                  <MapWrapper alerts={alerts} facilities={facilities} sensors={sensors} />
                </div>
                <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]"></div>
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-slate-900/90 backdrop-blur-md rounded-md text-white text-[9px] font-bold flex items-center gap-1.5 z-20 shadow-lg border border-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)]"></div>
                  GPS ONLINE
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - 4/12 */}
        <div className="lg:col-span-4 flex flex-col gap-4 overflow-hidden">
          
          {/* Emergency Information Alert */}
          {alerts.length > 0 ? (
            <div className="bg-red-950/40 shrink-0 rounded-2xl p-4 border border-red-900/50 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-950/40 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
              <div className="flex items-center justify-between mb-2 relative z-10">
                <div className="flex items-center gap-1.5 text-red-500 font-bold text-xs">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Active Alert
                </div>
                <span className="bg-red-900/50 text-red-400 text-[9px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1 border border-red-800">
                  <span className="relative flex h-1 w-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-red-500"></span>
                  </span>
                  LIVE
                </span>
              </div>
              <h3 className="font-bold text-white mb-1 relative z-10 text-sm">{alerts[0].title}</h3>
              <p className="text-[11px] text-slate-300 mb-3 leading-snug relative z-10">
                {alerts[0].description}
              </p>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1 text-[9px] text-slate-400 font-medium">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Updated: <RealTimeClock />
                </div>
                <Link href="/emergency/flood" className="text-[10px] font-bold text-red-400 hover:text-red-300 hover:underline">
                  Protocol →
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-950/30 shrink-0 rounded-2xl p-4 border border-emerald-900/50 relative overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                System Normal
              </div>
              <p className="text-xs text-slate-300">No active emergency alerts recorded.</p>
            </div>
          )}

          {/* Local Conditions */}
          <div className="bg-slate-900 shrink-0 rounded-2xl p-4 border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-900/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="flex items-center gap-2 mb-3 relative z-10">
              <div className="w-8 h-8 rounded-full bg-blue-900/20 border border-blue-900/50 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Local Sensors</h3>
                <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-medium">
                  <div className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
                  {sensors.length} Connected
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3 relative z-10">
              <div className="bg-slate-900/50 rounded-xl p-2.5 border border-slate-800 group">
                <p className="text-[9px] text-slate-400 font-bold mb-0.5 uppercase tracking-wider">River Level</p>
                <div className="flex items-end gap-1">
                  <span className="text-lg font-black text-white group-hover:text-blue-400 transition-colors">14.5</span>
                  <span className="text-[10px] text-slate-400 mb-0.5 font-medium">m</span>
                </div>
                <div className="w-full bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-orange-500 h-full rounded-full w-[85%]"></div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-2.5 border border-slate-800 group">
                <p className="text-[9px] text-slate-400 font-bold mb-0.5 uppercase tracking-wider">Rainfall</p>
                <div className="flex items-end gap-1">
                  <span className="text-lg font-black text-white group-hover:text-blue-400 transition-colors">24.2</span>
                  <span className="text-[10px] text-slate-400 mb-0.5 font-medium">mm/h</span>
                </div>
                <div className="w-full bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full w-[60%] animate-pulse"></div>
                </div>
              </div>
            </div>

            <Link href="/monitoring" className="relative z-10 flex items-center justify-between p-2.5 bg-blue-900/20 rounded-xl hover:bg-blue-900/40 transition-colors border border-blue-900/50 text-[11px] group">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                View all metrics
              </div>
              <svg className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Data Sources & Freshness */}
          <div className="bg-slate-900 flex-1 min-h-0 rounded-2xl p-4 border border-slate-800 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <h3 className="font-bold text-white text-sm">Data Sources</h3>
              <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-900/20 px-1.5 py-0.5 rounded border border-emerald-900">
                <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></div>
                SYNCED
              </div>
            </div>
            <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
              {[
                { label: 'Official Data', date: <RealTimeClock />, color: 'bg-emerald-500' },
                { label: 'Manuals', date: <RealTimeClock />, color: 'bg-blue-500' },
                { label: 'Reports', date: <RealTimeClock />, color: 'bg-purple-500' },
                { label: 'Sensors', date: <RealTimeClock />, color: 'bg-orange-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                    <span className="text-slate-300 font-medium">{item.label}</span>
                  </div>
                  <span className="text-slate-500 font-mono text-[9px]">{item.date}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-start gap-1.5 text-[9px] text-slate-500 shrink-0">
              <svg className="w-3 h-3 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Operating offline. Metrics generated from local cache.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
