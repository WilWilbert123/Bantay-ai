import { sensorsRepository } from '@/lib/db/repositories/sensors.repository';
import Link from 'next/link';
import { addSensorRule, deleteSensorRule, toggleSensorRule } from './actions';

export default async function ManageSensorRulesPage() {
  const rules = sensorsRepository.getRules();
  const sensors = sensorsRepository.getAllDevices();

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-8">
      <div className="flex items-center gap-4 border-b pb-6">
        <Link href="/admin/sensors" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors text-slate-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Sensor Rules</h1>
          <p className="text-slate-400 mt-1">Configure automated alerts and thresholds for your sensor network.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Rules List */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-white">Active Rules</h2>
          {rules.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
              No rules configured yet.
            </div>
          ) : (
            rules.map(rule => (
              <div key={rule.id} className={`bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between shadow-sm ${rule.is_active ? '' : 'opacity-60'}`}>
                <div>
                  <h3 className="font-bold text-white">{rule.rule_name}</h3>
                  <div className="text-sm text-slate-400 mt-1 flex items-center gap-2">
                    <span className="bg-slate-800 font-mono px-2 py-0.5 rounded text-xs">{rule.sensor_id}</span>
                    <span>
                      If value <b>{rule.condition_operator} {rule.threshold_value}</b> for {rule.duration_minutes}m
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-bold uppercase tracking-wider">
                    <span className={`px-2 py-0.5 rounded-md ${
                      rule.severity === 'CRITICAL' ? 'bg-red-900/50 text-red-700' :
                      rule.severity === 'WARNING' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-900/40 text-blue-400'
                    }`}>
                      {rule.severity} {rule.action_type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <form action={async () => {
                    'use server';
                    await toggleSensorRule(rule.id, rule.is_active ? 0 : 1);
                  }}>
                    <button type="submit" className={`text-sm font-bold ${rule.is_active ? 'text-slate-400 hover:text-slate-400' : 'text-emerald-400 hover:text-emerald-300'}`}>
                      {rule.is_active ? 'Disable' : 'Enable'}
                    </button>
                  </form>
                  <form action={async () => {
                    'use server';
                    await deleteSensorRule(rule.id);
                  }}>
                    <button type="submit" className="p-2 text-red-400 hover:bg-red-950/40 hover:text-red-600 rounded transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create Rule Form */}
        <div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 sticky top-6 shadow-sm">
            <h2 className="text-xl font-bold text-white mb-4">Create New Rule</h2>
            <form action={addSensorRule} className="space-y-4">
              
              <div>
                <label className="block text-sm font-bold text-slate-200 mb-1">Rule Name</label>
                <input required type="text" name="rule_name" placeholder="e.g. Critical Water Level" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-200 mb-1">Target Sensor</label>
                <select required name="sensor_id" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                  <option value="">Select a sensor...</option>
                  {sensors.map(s => (
                    <option key={s.id} value={s.id}>{s.device_name} ({s.id})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-slate-200 mb-1">Condition</label>
                  <select required name="condition_operator" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                    <option value=">">Greater than</option>
                    <option value=">=">Greater or eq</option>
                    <option value="<">Less than</option>
                    <option value="<=">Less or eq</option>
                    <option value="=">Equals</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-200 mb-1">Value</label>
                  <input required type="number" step="0.01" name="threshold_value" placeholder="e.g. 15.0" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-200 mb-1">Duration (minutes)</label>
                <input required type="number" name="duration_minutes" defaultValue={5} min={0} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-slate-200 mb-1">Action</label>
                  <select required name="action_type" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                    <option value="ALERT">ALERT</option>
                    <option value="NOTIFY">NOTIFY</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-200 mb-1">Severity</label>
                  <select required name="severity" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                    <option value="INFO">INFO</option>
                    <option value="WARNING">WARNING</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition-colors mt-2">
                Save Rule
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
