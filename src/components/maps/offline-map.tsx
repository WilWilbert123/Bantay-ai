import React from 'react';

export function OfflineMap() {
  return (
    <div className="w-full h-[400px] bg-slate-100 border border-slate-200 rounded-xl relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="text-center z-10 p-6 bg-white/90 rounded-xl shadow-sm border border-slate-200 max-w-sm">
        <div className="text-4xl mb-2">🗺️</div>
        <h3 className="font-bold text-slate-800">Map Interface Mounted</h3>
        <p className="text-sm text-slate-600 mt-1">Requires local mbtiles cache and Leaflet integration for full offline rendering.</p>
      </div>
    </div>
  );
}