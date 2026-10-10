import React from 'react';

export function EmergencyContactCard({ name = 'Local Police', number = '117', desc = 'Emergency hotline' }) {
  return (
    <div className="border border-slate-200 p-4 rounded-xl flex justify-between items-center bg-white">
      <div>
        <h4 className="font-bold text-slate-800">{name}</h4>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
      <a href={`tel:${number}`} className="bg-red-50 text-red-700 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition-colors">
        {number}
      </a>
    </div>
  );
}