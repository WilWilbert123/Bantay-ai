import MapWrapper from '@/components/map/map-wrapper';
import { alertsRepository } from '@/lib/db/repositories/alerts.repository';
import { facilitiesRepository } from '@/lib/db/repositories/facilities.repository';
import { sensorsRepository } from '@/lib/db/repositories/sensors.repository';
import { formatDistanceToNow } from 'date-fns';
import { connection } from 'next/server';
import Link from 'next/link';

export const instant = false;

export default async function MapPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  await connection();
  const resolvedParams = await searchParams;
  const activeFilter = resolvedParams.filter || 'all';

  const alerts = alertsRepository.getActiveAlerts();
  const allFacilities = facilitiesRepository.getAllFacilities();
  const sensors = sensorsRepository.getAllDevices();
  
  // Filter facilities by category
  let facilities = allFacilities;
  if (activeFilter === 'pharmacy') {
    facilities = allFacilities.filter(f => f.facility_type === 'PHARMACY');
  } else if (activeFilter === 'hospital') {
    facilities = allFacilities.filter(f => f.facility_type === 'HOSPITAL');
  } else if (activeFilter === 'evacuation') {
    facilities = allFacilities.filter(f => f.facility_type === 'EVACUATION');
  } else if (activeFilter === 'lgu') {
    facilities = allFacilities.filter(f => f.facility_type === 'BARANGAY' || f.facility_type === 'LGU');
  } else if (activeFilter === 'police_fire') {
    facilities = allFacilities.filter(f => f.facility_type === 'POLICE_FIRE');
  }
  
  const categories = [
    { key: 'all', label: 'All', icon: '🌐', count: allFacilities.length },
    { key: 'pharmacy', label: 'Pharmacy', icon: '💊', count: allFacilities.filter(f => f.facility_type === 'PHARMACY').length },
    { key: 'hospital', label: 'Hospital', icon: '🏥', count: allFacilities.filter(f => f.facility_type === 'HOSPITAL').length },
    { key: 'evacuation', label: 'Evacuation', icon: '🏫', count: allFacilities.filter(f => f.facility_type === 'EVACUATION').length },
    { key: 'lgu', label: 'Barangay', icon: '🏛️', count: allFacilities.filter(f => f.facility_type === 'BARANGAY' || f.facility_type === 'LGU').length },
    { key: 'police_fire', label: 'Police', icon: '🚓', count: allFacilities.filter(f => f.facility_type === 'POLICE_FIRE').length },
  ];

  return (
    <div className="h-full flex flex-col p-4 md:p-6 max-w-7xl mx-auto gap-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-white">Tactical Map</h1>
          <p className="text-slate-400 mt-1">Offline-first geographical situational awareness and real-time emergency services.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-emerald-900/20 text-emerald-300 border border-emerald-200 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            Map Cache Active
          </div>
        </div>
      </div>

      {/* Quick Nearby Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 shrink-0">
        {categories.map((cat) => {
          const isActive = activeFilter === cat.key;
          return (
            <Link
              key={cat.key}
              href={`?filter=${cat.key}`}
              replace
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                isActive
                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/40 scale-105'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-extrabold ${isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-800 text-slate-400'}`}>
                {cat.count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Main Map Area */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
        {/* Map Container */}
        <div className="flex-1 rounded-2xl relative z-0 min-h-0 border border-slate-800 shadow-sm overflow-hidden">
          <MapWrapper alerts={alerts} facilities={facilities} sensors={sensors} />
        </div>

        {/* Sidebar Info Panel */}
        <div className="w-full md:w-80 flex flex-col gap-4 shrink-0 overflow-y-auto custom-scrollbar md:overflow-hidden pr-1 md:pr-0">
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm md:flex-1 md:flex md:flex-col md:min-h-0">
            <h3 className="font-bold text-white mb-3 flex items-center justify-between shrink-0">
              Active Alerts
              <span className="bg-red-900/50 text-red-400 text-xs px-2 py-0.5 rounded-full font-bold">{alerts.length} Active</span>
            </h3>
            
            {alerts.length === 0 ? (
              <div className="text-sm text-slate-400 py-4 text-center shrink-0">No active alerts.</div>
            ) : (
              <div className="space-y-3 md:overflow-y-auto md:custom-scrollbar pr-1 md:flex-1 md:min-h-0">
                {alerts.map(alert => (
                  <div key={alert.id} className={`border rounded-xl p-3 flex gap-3 ${
                    alert.severity === 'CRITICAL' ? 'bg-red-950/40 border-red-900/50' : 'bg-orange-950/40 border-orange-900/50'
                  }`}>
                    <div className={`${alert.severity === 'CRITICAL' ? 'text-red-500' : 'text-orange-500'} shrink-0 mt-0.5`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${alert.severity === 'CRITICAL' ? 'text-red-400' : 'text-orange-400'}`}>{alert.title}</h4>
                      <p className={`text-xs mt-1 leading-relaxed ${alert.severity === 'CRITICAL' ? 'text-red-300' : 'text-orange-300'}`}>{alert.description}</p>
                      <p className={`text-[10px] mt-2 font-medium uppercase tracking-wider ${alert.severity === 'CRITICAL' ? 'text-red-400' : 'text-orange-400'}`}>
                        {formatDistanceToNow(new Date(alert.issued_at))} ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Facilities Panel */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm md:flex-1 md:flex md:flex-col md:min-h-0">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <h3 className="font-bold text-white flex items-center gap-1.5">
                Facilities
                <span className="text-xs text-blue-400 font-semibold">({facilities.length})</span>
              </h3>
              <div className="flex bg-slate-800 rounded-lg p-0.5">
                <Link href="?filter=all" replace className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-colors ${activeFilter === 'all' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>
                  All
                </Link>
                <Link href="?filter=pharmacy" replace className={`px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${activeFilter === 'pharmacy' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>
                  💊
                </Link>
                <Link href="?filter=hospital" replace className={`px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${activeFilter === 'hospital' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>
                  🏥
                </Link>
                <Link href="?filter=evacuation" replace className={`px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${activeFilter === 'evacuation' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>
                  🏫
                </Link>
              </div>
            </div>

            {facilities.length === 0 ? (
              <div className="text-sm text-slate-400 py-4 text-center shrink-0">No facilities match this category filter.</div>
            ) : (
              <div className="space-y-3 md:overflow-y-auto md:custom-scrollbar pr-1 md:flex-1 md:min-h-0">
                {facilities.map(facility => (
                  <div key={facility.id} className="p-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-blue-400 group-hover:text-blue-300">{facility.name}</h4>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full">Open</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{facility.address}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md">
                        {facility.facility_type === 'PHARMACY' && '💊 Pharmacy'}
                        {facility.facility_type === 'HOSPITAL' && '🏥 Medical Center'}
                        {facility.facility_type === 'EVACUATION' && '🏫 Evacuation Hub'}
                        {facility.facility_type === 'BARANGAY' && '🏛️ Barangay Hall'}
                        {facility.facility_type === 'LGU' && '🏛️ City / LGU Hall'}
                        {facility.facility_type === 'POLICE_FIRE' && '🚓 Police & Fire'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
