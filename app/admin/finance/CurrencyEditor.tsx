'use client';

import React, { useState } from 'react';

export default function CurrencyEditor({ currentRate }: { currentRate: number }) {
  const [rate, setRate] = useState(currentRate);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch('/api/admin/currency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rate }),
      });
      if (res.ok) {
        alert('Курс обновлен');
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="md:col-span-2 bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between">
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">tune</span>
                Настройка курса
            </h3>
            <div className="flex items-center gap-3 bg-zinc-900/50 p-2 rounded-2xl border border-zinc-900">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Авто-обновление</span>
                <div className="size-8 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-600">
                <span className="material-symbols-outlined text-sm font-black">close</span>
                </div>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
            <input
                type="number"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-6 text-2xl font-black italic text-white outline-none focus:border-primary transition-all"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-700 font-black italic uppercase text-xs">CNY/RUB</span>
            </div>
            <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="h-16 px-10 bg-primary text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all italic shadow-lg shadow-primary/10 disabled:opacity-50"
            >
            {isUpdating ? 'ОБНОВЛЕНИЕ...' : 'Обновить вручную'}
            </button>
        </div>
    </div>
  );
}
