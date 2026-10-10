import React from 'react';

export function FacilityCard({ name = 'Barangay Covered Court', type = 'Evacuation Center', capacity = '200 families' }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <div className="bg-blue-50 px-4 py-2 border-b border-blue-100 flex justify-between items-center">
        <span className="text-xs font-bold text-blue-700 uppercase">{type}</span>
      </div>
      <div className="p-4 space-y-2">
        <h4 className="font-bold text-slate-800">{name}</h4>
        <div className="flex gap-2 text-sm text-slate-600">
          <span className="font-medium text-slate-900">Capacity:</span> {capacity}
        </div>
      </div>
    </div>
  );
}