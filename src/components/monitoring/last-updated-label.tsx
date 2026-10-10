import React from 'react';

export function LastUpdatedLabel({ timestamp = new Date() }) {
  return (
    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
      ⏱️ Updated {new Date(timestamp).toLocaleTimeString()}
    </span>
  );
}