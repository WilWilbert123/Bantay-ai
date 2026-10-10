import React, { useState } from 'react';

export function PasswordField() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input 
        type={show ? "text" : "password"} 
        placeholder="••••••••" 
        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500" 
        required 
      />
      <button 
        type="button" 
        onClick={() => setShow(!show)}
        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 font-medium text-sm"
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}