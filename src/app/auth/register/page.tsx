'use client';

import { useState } from 'react';
import { bootstrapSystem } from '../../actions/bootstrap';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await bootstrapSystem(formData);
      
      if (result.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-red-600/10 blur-[100px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-blue-600/10 blur-[100px] mix-blend-screen pointer-events-none" />
      
      {/* Icon/Logo */}
      <div className="mb-6 z-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20 border border-red-400/30 mb-2">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      </div>

      <div className="max-w-md w-full bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-8 border border-zinc-800/80 shadow-2xl z-10 relative animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">INITIAL SETUP</h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Create the master administrator account to secure the offline node.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-xl text-sm border border-red-500/20 flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
          )}
          
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">Display Name</label>
            <div className="relative">
              <input 
                name="displayName" 
                type="text" 
                required 
                className="w-full bg-zinc-950/50 text-white px-4 py-3 pl-11 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all outline-none placeholder:text-zinc-600"
                placeholder="Admin or Command Center"
              />
              <svg className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">Admin Username</label>
            <div className="relative">
              <input 
                name="username" 
                type="text" 
                required 
                className="w-full bg-zinc-950/50 text-white px-4 py-3 pl-11 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all outline-none placeholder:text-zinc-600"
                placeholder="Secure identifier"
              />
              <svg className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">Master Password</label>
            <div className="relative">
              <input 
                name="password" 
                type="password" 
                required 
                minLength={8}
                className="w-full bg-zinc-950/50 text-white px-4 py-3 pl-11 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all outline-none placeholder:text-zinc-600"
                placeholder="Minimum 8 characters"
              />
              <svg className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-red-900/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-6"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Bootstrapping...</span>
              </>
            ) : (
              <>
                <span>Initialize Secure Node</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
