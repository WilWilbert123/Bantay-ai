import React from 'react';

export function ModelSettings() {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-slate-800">Local AI Engine</h3>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Ollama Model Binding</label>
        <select className="w-full p-2 border border-slate-300 rounded focus:ring-blue-500 focus:border-blue-500 bg-white">
          <option value="llama3:8b">Llama 3 (8B) - Recommended</option>
          <option value="mistral:7b">Mistral (7B)</option>
          <option value="gemma:2b">Gemma (2B) - Low RAM</option>
        </select>
        <p className="text-xs text-slate-500 mt-1">Changes take effect immediately on next inference.</p>
      </div>
    </div>
  );
}