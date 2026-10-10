import React from 'react';
import { PasswordField } from './password-field';

export function RegisterForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
          <input type="text" className="w-full px-3 py-2 rounded-lg border border-slate-300" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
          <input type="text" className="w-full px-3 py-2 rounded-lg border border-slate-300" required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
        <input type="text" className="w-full px-3 py-2 rounded-lg border border-slate-300" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <PasswordField />
      </div>
      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-sm">
        Create Local Account
      </button>
    </form>
  );
}