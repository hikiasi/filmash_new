'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function SettingsClient({ initialRate }: { initialRate: number }) {
  const [rate, setRate] = useState(initialRate.toString());
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleUpdateRate = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch('/api/admin/currency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rate: parseFloat(rate) }),
      });
      if (res.ok) {
        router.refresh();
        alert('Курс успешно обновлен');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-black">
      <header className="bg-black/95 backdrop-blur-sm z-20 border-b border-zinc-900 sticky top-0">
        <div className="px-8 py-6">
          <h1 className="text-white text-4xl font-black italic uppercase tracking-tighter leading-none">Настройки <span className="text-zinc-600">Системы</span></h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mt-2 italic">Конфигурация параметров платформы</p>
        </div>
      </header>

      <div className="p-8">
        <div className="max-w-4xl space-y-8 mb-12">
            <section className="bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] shadow-2xl">
                 <h3 className="text-lg font-black text-white mb-8 uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">currency_exchange</span>
                    Валютные курсы
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block mb-3">Текущий курс CNY → RUB</label>
                        <div className="flex items-center gap-4">
                            <input type="text" value={initialRate.toFixed(2)} readOnly className="flex-1 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-zinc-500 font-black italic outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block mb-3">Ручная корректировка</label>
                        <div className="flex items-center gap-4">
                            <input
                              type="number"
                              step="0.01"
                              value={rate}
                              onChange={e => setRate(e.target.value)}
                              placeholder="14.00"
                              className="flex-1 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-white font-black italic outline-none focus:border-primary"
                            />
                            <button
                              onClick={handleUpdateRate}
                              disabled={isUpdating}
                              className="h-14 px-8 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all italic shadow-lg shadow-primary/10 disabled:opacity-50"
                            >
                              {isUpdating ? '...' : 'Применить'}
                            </button>
                        </div>
                    </div>
                 </div>
            </section>

             <section className="bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] shadow-2xl">
                 <h3 className="text-lg font-black text-white mb-8 uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">notifications</span>
                    Уведомления
                 </h3>
                 <div className="space-y-6">
                    {[
                        { label: 'Telegram оповещения для менеджеров', desc: 'Отправлять новые заявки в общий чат', active: true },
                        { label: 'Email подтверждение для клиентов', desc: 'Автоматическое письмо после отправки формы', active: true },
                        { label: 'Уведомления о статусе логистики', desc: 'SMS/WA оповещения при смене этапа доставки', active: false },
                    ].map(item => (
                        <div key={item.label} className="flex items-center justify-between py-4 border-b border-zinc-900 last:border-0">
                            <div>
                                <p className="text-white font-black uppercase italic tracking-tight">{item.label}</p>
                                <p className="text-xs text-zinc-500 font-bold tracking-tight">{item.desc}</p>
                            </div>
                            <div className={cn("size-12 rounded-2xl flex items-center justify-center border transition-all cursor-pointer", item.active ? "bg-primary border-primary text-black" : "bg-zinc-900 border-zinc-800 text-zinc-700")}>
                                <span className="material-symbols-outlined font-black">{item.active ? 'check' : 'close'}</span>
                            </div>
                        </div>
                    ))}
                 </div>
            </section>
        </div>
      </div>
    </div>
  );
}
