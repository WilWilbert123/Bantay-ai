import React from 'react';

export function SensorSummaryCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-800">Local Sensor Grid</h3>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">2 / 2 ACTIVE</span>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-slate-600">Marikina River Level</span>
          <span className="font-bold text-amber-600">14.8m (Warning)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Local Rainfall</span>
          <span className="font-bold text-slate-800">45mm / hr</span>
        </div>
      </div>
    </div>
  );
}