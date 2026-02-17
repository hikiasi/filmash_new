import React from 'react';
import prisma from '@/lib/db';
import CurrencyEditor from './CurrencyEditor';

export default async function FinancePage() {
  const latestRate = await prisma.currencyRate.findFirst({
    orderBy: { created_at: 'desc' },
  });

  const currentRate = latestRate ? Number(latestRate.rate_cny_to_rub) : 13.52;

  const history = await prisma.currencyRate.findMany({
    take: 10,
    orderBy: { created_at: 'desc' },
  });

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-black">
      <header className="bg-black/95 backdrop-blur-sm z-10 border-b border-zinc-900 sticky top-0">
        <div className="px-8 py-6">
          <h1 className="text-white text-4xl font-black italic uppercase tracking-tighter leading-none">Контроль <span className="text-zinc-600">Финансов</span></h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mt-2 italic">Мониторинг курсов и логистики</p>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-[1200px] mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8">
                  <span className="material-symbols-outlined text-primary text-4xl opacity-20 group-hover:opacity-100 transition-all duration-700 rotate-12">currency_exchange</span>
               </div>
               <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4 italic">Текущий курс CNY</p>
               <div className="flex items-baseline gap-2 mb-2">
                 <span className="text-6xl font-black text-white italic tracking-tighter">{currentRate.toFixed(2)}</span>
                 <span className="text-2xl font-black text-zinc-700 italic">₽</span>
               </div>
               <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-primary text-[10px] font-black uppercase tracking-widest">
                    <span className="material-symbols-outlined text-xs">trending_up</span>
                    Актуально
                  </span>
                  <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{latestRate?.source || 'Default'}</span>
               </div>
            </div>

            <CurrencyEditor currentRate={currentRate} />
          </div>

          <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
             <div className="px-10 py-8 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/10">
                <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="material-symbols-outlined text-zinc-600">history</span>
                    История изменений
                </h3>
             </div>
             <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-900">
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-600">Дата & Время</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-600">Источник</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-600 text-right">Курс</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/50">
                   {history.map((row, i) => (
                     <tr key={i} className="hover:bg-zinc-900/30 transition-all">
                        <td className="px-10 py-6">
                           <p className="text-white text-xs font-black uppercase italic tracking-tight">{row.created_at.toLocaleString()}</p>
                        </td>
                        <td className="px-10 py-6">
                           <div className="flex items-center gap-3">
                              <span className={`size-2 rounded-full ${row.is_manual_override ? 'bg-orange-500' : 'bg-primary'}`}></span>
                              <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">{row.source}</p>
                           </div>
                        </td>
                        <td className="px-10 py-6 text-right text-white font-black italic text-lg">
                           {Number(row.rate_cny_to_rub).toFixed(2)} ₽
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  );
}
