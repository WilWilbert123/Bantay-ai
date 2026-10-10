import React from 'react';

export function SourceMetadata({ source = 'NDRRMC', page = 12, relevance = 0.95 }) {
  return (
    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-100 font-medium">
      <span>{source}</span>
      <span className="text-blue-300">|</span>
      <span>Page {page}</span>
      <span className="text-blue-300">|</span>
      <span>Score: {relevance.toFixed(2)}</span>
    </div>
  );
}