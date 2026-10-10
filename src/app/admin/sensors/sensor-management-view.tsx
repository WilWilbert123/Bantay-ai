'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { SensorDeviceWithReading } from '@/lib/db/repositories/sensors.repository';
import { registerSensorAction, pushReadingAction } from './actions';

interface Props {
  initialSensors: SensorDeviceWithReading[];
}

export default function SensorManagementView({ initialSensors }: Props) {
  const [isPending, startTransition] = useTransition();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [activeViewSensor, setActiveViewSensor] = useState<SensorDeviceWithReading | null>(null);
  const [testValue, setTestValue] = useState<string>('15.8');

  return (
    <div className="h-full w-full flex flex-col bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden">
      {/* Top Header */}
      <div className="flex-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 p-6 bg-slate-900/50 z-10">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            📡 Sensor Network
            <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
              {initialSensors.length} Online
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage local telemetry, water gauges, rain sensors, and automated warning thresholds.
          </p>
        </div>
        <button
          onClick={() => setShowRegisterModal(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-sm text-sm cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          Register Sensor
        </button>
      </div>

      <div className="flex-1 min-h-0 flex flex-col lg:flex-row p-6 gap-6 overflow-hidden">
        {/* Sensor List */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0">
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-0 custom-scrollbar">
            {initialSensors.map((sensor) => (
              <div key={sensor.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col sm:flex-row hover:border-slate-700 transition-all">
                <div className="w-2 bg-emerald-500 shrink-0"></div>
                
                <div className="p-5 flex-1 flex flex-col sm:flex-row justify-between sm:items-center gap-4 min-w-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-white text-base truncate">{sensor.device_name}</h3>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                        {sensor.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                      <span className="font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">
                        ID: {sensor.id.substring(0, 18)}...
                      </span>
                      <span className="font-bold text-slate-300">{sensor.device_type}</span>
                      <span className="text-slate-400 truncate">📍 {sensor.location_name}</span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
                    <div className="text-2xl font-black text-cyan-400 tracking-tight flex items-baseline gap-1">
                      {sensor.latest_value !== undefined ? (
                        <>
                          <span>{sensor.latest_value}</span>
                          <span className="text-xs font-semibold text-slate-400">{sensor.latest_unit}</span>
                        </>
                      ) : (
                        <span className="text-sm font-semibold text-slate-500">-- {sensor.measurement_unit}</span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      Last Seen: {sensor.latest_measured_at ? new Date(sensor.latest_measured_at).toLocaleTimeString() : 'Active'}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/60 border-t sm:border-t-0 sm:border-l border-slate-800 flex flex-row sm:flex-col justify-center px-4 py-3 gap-2 shrink-0">
                  <button
                    onClick={() => setActiveViewSensor(sensor)}
                    className="flex-1 sm:flex-none text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/60 px-3 py-1.5 rounded-lg border border-cyan-800/60 transition-colors text-center cursor-pointer"
                  >
                    View Telemetry
                  </button>
                  <button
                    onClick={() => setActiveViewSensor(sensor)}
                    className="flex-1 sm:flex-none text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors text-center cursor-pointer"
                  >
                    Push Test Data
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="w-full lg:w-80 flex-none flex flex-col gap-6 overflow-y-auto pr-1 min-h-0 custom-scrollbar">
          {/* Automated Thresholds Card */}
          <div className="bg-emerald-950/30 rounded-xl p-5 border border-emerald-900/50 flex-none">
            <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-1.5 text-base">
              ⚙️ Automated Thresholds
            </h3>
            <p className="text-xs text-emerald-100/70 mb-4 leading-relaxed">
              Configure alert rules (e.g. if Water Level &gt; 15m for 5 mins, issue CRITICAL Alert).
            </p>
            <Link
              href="/admin/sensors/rules"
              className="w-full inline-block text-center bg-emerald-600 text-white font-extrabold py-2 px-4 rounded-xl shadow-sm hover:bg-emerald-500 transition-colors text-xs uppercase tracking-wider"
            >
              Manage Rules & Thresholds
            </Link>
          </div>

          {/* Ingestion API Details */}
          <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 shadow-sm flex-none space-y-3">
            <h3 className="font-bold text-white text-sm">📡 Local Telemetry Ingestion API</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Edge sensors push data locally via JSON payload:
            </p>
            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl font-mono text-[11px] text-cyan-300 space-y-1">
              <div className="font-bold text-emerald-400">POST /api/sensors/ingest</div>
              <div className="text-slate-400 text-[10px]">{`{ "sensor_id": "...", "value": 15.5 }`}</div>
            </div>
            <p className="text-[11px] text-slate-500">
              Triggered threshold violations automatically broadcast emergency alerts to the platform.
            </p>
          </div>
        </div>
      </div>

      {/* Register Sensor Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Register New Telemetry Sensor</h3>
              <button onClick={() => setShowRegisterModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form
              action={(formData) => {
                startTransition(async () => {
                  await registerSensorAction(formData);
                  setShowRegisterModal(false);
                });
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-bold mb-1">Device Name</label>
                <input name="device_name" required placeholder="e.g. Marikina River Telemetry Sensor #460" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-medium" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Sensor Type</label>
                  <select name="device_type" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-medium">
                    <option value="WATER_LEVEL">WATER_LEVEL</option>
                    <option value="RAINFALL">RAINFALL</option>
                    <option value="SEISMIC">SEISMIC</option>
                    <option value="WIND_SPEED">WIND_SPEED</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Measurement Unit</label>
                  <input name="measurement_unit" defaultValue="meters" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-medium" />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Location Name</label>
                <input name="location_name" required placeholder="e.g. Tumana Station, Marikina" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-medium" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Latitude</label>
                  <input name="latitude" type="number" step="any" defaultValue="14.6300" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-medium" />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Longitude</label>
                  <input name="longitude" type="number" step="any" defaultValue="121.0960" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-medium" />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowRegisterModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold">Cancel</button>
                <button type="submit" disabled={isPending} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold">
                  {isPending ? 'Registering...' : 'Save Sensor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Push Telemetry / View Sensor Data Modal */}
      {activeViewSensor && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-white text-base">{activeViewSensor.device_name}</h3>
                <p className="text-xs text-slate-400">Location: {activeViewSensor.location_name}</p>
              </div>
              <button onClick={() => setActiveViewSensor(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {/* Current Telemetry Display */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Latest Telemetry Reading</span>
                <span className="text-3xl font-black text-cyan-400">
                  {activeViewSensor.latest_value !== undefined ? `${activeViewSensor.latest_value} ${activeViewSensor.latest_unit}` : `-- ${activeViewSensor.measurement_unit}`}
                </span>
              </div>
              <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded-full font-bold">
                {activeViewSensor.status}
              </span>
            </div>

            {/* Push Live Test Data Form */}
            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-200">Push Live Test Telemetry Reading</h4>
              <p className="text-[11px] text-slate-400">
                Simulate an IoT sensor sending data. Exceeding set rules (e.g. &gt;15m) will generate an emergency alert instantly.
              </p>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="any"
                  value={testValue}
                  onChange={(e) => setTestValue(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-sm font-bold"
                  placeholder="Enter test value"
                />
                <button
                  onClick={() => {
                    const val = parseFloat(testValue);
                    if (!isNaN(val)) {
                      startTransition(async () => {
                        await pushReadingAction(
                          activeViewSensor.id,
                          val,
                          activeViewSensor.measurement_unit,
                          activeViewSensor.device_type
                        );
                        setActiveViewSensor(null);
                      });
                    }
                  }}
                  disabled={isPending}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  {isPending ? 'Sending...' : 'Transmit Telemetry'}
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setActiveViewSensor(null)} className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
