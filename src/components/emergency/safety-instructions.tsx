import React from 'react';

export function SafetyInstructions({ steps = ['Stay calm.', 'Turn off main breaker.'] }) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
      <h3 className="font-bold text-yellow-900 mb-3">Safety Protocols</h3>
      <ol className="list-decimal list-inside space-y-2 text-yellow-800 text-sm">
        {steps.map((s, i) => <li key={i}>{s}</li>)}
      </ol>
    </div>
  );
}