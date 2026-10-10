import React from 'react';

export function EmergencyActionCard({ title = 'Evacuate Now', desc = 'Proceed to nearest center.' }) {
  return (
    <button className="w-full text-left bg-red-600 text-white p-5 rounded-xl hover:bg-red-700 transition shadow-sm">
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-red-100 text-sm">{desc}</p>
    </button>
  );
}