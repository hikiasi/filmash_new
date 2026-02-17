'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo logic: set cookie and redirect to dashboard
    document.cookie = 'filmash-auth=true; path=/; max-age=86400';
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 size-[600px] bg-primary/5 blur-[150px] rounded-full -mr-40 -mt-40 animate-pulse" />
      <div className="absolute bottom-0 left-0 size-[400px] bg-primary/5 blur-[120px] rounded-full -ml-20 -mb-20" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-12">
           <div className="inline-flex size-20 bg-primary rounded-3xl items-center justify-center shadow-[0_0_40px_rgba(188,224,2,0.3)] mb-8 rotate-3">
              <span className="material-symbols-outlined text-black font-black text-4xl">dashboard</span>
           </div>
           <h1 className="text-white text-5xl font-black italic uppercase tracking-tighter mb-2 leading-none">Filmash <span className="text-zinc-700 font-black italic">CRM</span></h1>
           <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] italic">Система управления импортом</p>
        </div>

        <form onSubmit={handleLogin} className="bg-zinc-950 border border-zinc-900 rounded-[3rem] p-10 shadow-2xl space-y-8">
           <div className="space-y-6">
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-4 italic">Логин (Email)</label>
                 <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-zinc-700 group-focus-within:text-primary transition-colors">person</span>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl pl-16 pr-6 text-white text-sm font-bold focus:border-primary focus:outline-none transition-all"
                        placeholder="admin@filmash.com"
                    />
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-4 italic">Пароль</label>
                 <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-zinc-700 group-focus-within:text-primary transition-colors">lock</span>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl pl-16 pr-6 text-white text-sm font-bold focus:border-primary focus:outline-none transition-all"
                        placeholder="••••••••"
                    />
                 </div>
              </div>
           </div>

           <button
              type="submit"
              className="w-full h-16 bg-primary text-black text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:opacity-90 transition-all italic shadow-lg shadow-primary/10 active:scale-[0.98]"
           >
              ВХОД В СИСТЕМУ
           </button>

           <div className="text-center">
              <Link href="/" className="text-[10px] font-black text-zinc-700 uppercase tracking-widest hover:text-white transition-colors italic">Вернуться на сайт</Link>
           </div>
        </form>

        <p className="text-center text-[10px] font-bold text-zinc-800 mt-12 uppercase tracking-widest italic">© 2024 FILMASH AUTO TRADING CO.</p>
      </div>
    </div>
  );
}

import Link from 'next/link';
