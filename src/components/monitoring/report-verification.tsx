import React from 'react';

export function ReportVerification({ isVerified = true }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${isVerified ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
      {isVerified ? 'Verified Report' : 'Unverified Report'}
    </span>
  );
}