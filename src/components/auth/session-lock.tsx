import React from 'react';
import { PasswordField } from './password-field';

export function SessionLock() {
  return (
    <div className="bg-slate-900/90 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🔒</div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Session Locked</h2>
        <p className="text-sm text-slate-600 mb-6">Enter your PIN or password to unlock this terminal.</p>
        <form onSubmit={e => e.preventDefault()} className="space-y-4">
          <PasswordField />
          <button type="submit" className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">Unlock</button>
        </form>
      </div>
    </div>
  );
}