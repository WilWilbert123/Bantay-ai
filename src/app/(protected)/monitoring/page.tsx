import Link from 'next/link';
import { alertsRepository } from '../../../lib/db/repositories/alerts.repository';
import { sensorsRepository } from '../../../lib/db/repositories/sensors.repository';
import { facilitiesRepository } from '../../../lib/db/repositories/facilities.repository';
import MapWrapper from '../../../components/map/map-wrapper';

export default async function MonitoringPage() {
  const activeAlerts = alertsRepository.getActiveAlerts();
  const devices = sensorsRepository.getAllDevices();
  const facilities = facilitiesRepository.getAllFacilities();

  return (
    <div className="h-full flex flex-col p-4 md:p-6 max-w-7xl mx-auto gap-4">
      <div className="shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-white">Disaster Monitoring & Sensors</h1>
          <p className="text-slate-400 text-sm">Real-time local tracking and automated alerts based on sensor thresholds.</p>
        </div>
        <Link 
          href="/admin/sensors" 
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          Register Offline Sensor
        </Link>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        <div className="lg:col-span-2 flex flex-col gap-6 min-h-0">
          <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-4 shrink-0">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Active Alerts
              </h2>
              <span className="bg-red-900/50 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full border border-red-800/80">
                {activeAlerts.length} Critical
              </span>
            </div>
            
            {activeAlerts.length === 0 ? (
              <div className="p-8 text-center text-slate-400 bg-slate-950/40 rounded-xl border border-dashed border-slate-800 text-sm">
                No active alerts in your monitored areas.
              </div>
            ) : (
              <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                {activeAlerts.map(alert => (
                  <div key={alert.id} className="border-l-4 border-red-500 bg-red-950/40 p-3.5 rounded-r-xl border-y border-r border-red-900/40 hover:bg-red-950/60 transition-colors">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-white text-sm">{alert.title}</h3>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">{new Date(alert.issued_at).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{alert.description}</p>
                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-[10px] font-medium text-red-400">Source: {alert.trigger_source}</span>
                      <Link href="/map" className="text-[11px] font-bold text-blue-400 hover:text-blue-300 hover:underline">
                        View on Map &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex-1 bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-4 flex flex-col min-h-0">
            <h2 className="text-lg font-bold text-white mb-3 shrink-0 flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Local Map Integration
            </h2>
            <div className="flex-1 relative rounded-xl border border-slate-800 overflow-hidden min-h-[200px]">
              <MapWrapper alerts={activeAlerts} facilities={facilities} sensors={devices} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 min-h-0">
          <div className="flex-1 bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-4 flex flex-col min-h-0">
            <h2 className="text-lg font-bold text-white mb-3 shrink-0 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Local Sensor Mesh
            </h2>
            {devices.length === 0 ? (
              <p className="text-sm text-slate-400">No sensors registered to this node.</p>
            ) : (
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2.5 pr-1">
                {devices.map(device => (
                  <div key={device.id} className="flex items-center justify-between p-3 bg-slate-950/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
                    <div>
                      <div className="font-semibold text-white text-xs">{device.device_name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wide">{device.device_type} • {device.location_name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-emerald-400">{device.status}</span>
                      <div className={`h-2 w-2 rounded-full ${device.status === 'ACTIVE' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-500'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Link 
              href="/admin/sensors" 
              className="mt-4 shrink-0 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 border border-slate-700"
            >
              + Register Offline Sensor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
