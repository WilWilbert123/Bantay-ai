import React from 'react';

export function DocumentViewer({ content = 'Document content loaded from SQLite FTS5...' }) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-xl prose max-w-none text-slate-800 shadow-sm">
      <p>{content}</p>
    </div>
  );
}