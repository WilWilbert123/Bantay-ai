import React from 'react';
import { PasswordField } from './password-field';

export function LoginForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
        <input type="text" placeholder="admin" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <PasswordField />
      </div>
      <button type="submit" className="w-full py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition shadow-sm">
        Authenticate Locally
      </button>
    </form>
  );
}