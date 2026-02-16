'use client';

import React, { useState } from 'react';

export default function InquiryDetailClient({ inquiry, configImage }: { inquiry: any, configImage?: string }) {
  const [showConfig, setShowConfig] = useState(false);

  return (
    <>
      <div className="bg-zinc-950 rounded-[2.5rem] border border-zinc-900 p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 size-80 bg-primary/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-all duration-1000" />

        <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-white flex items-center gap-4 uppercase italic tracking-tighter">
                <span className="size-10 rounded-xl bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800">
                    <span className="material-symbols-outlined">tune</span>
                </span>
                Выбранная конфигурация
            </h3>
            <button
                onClick={() => setShowConfig(true)}
                className="h-10 px-6 bg-primary text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all italic flex items-center gap-2"
            >
                <span className="material-symbols-outlined text-sm">visibility</span>
                Показать визуализацию
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 relative z-10">
            <ConfigSummaryItem label="Версия (Trim)" value={inquiry.trim.name} icon="verified" />
            <ConfigSummaryItem label="Цвет кузова" value={inquiry.color.name} icon="palette" />
            <ConfigSummaryItem label="Диски" value={inquiry.wheels?.name || 'Стандартные'} icon="tire_repair" />
            <ConfigSummaryItem label="Интерьер" value={inquiry.interior?.name || 'Стандартный'} icon="chair" />
        </div>

        {inquiry.selected_options && Object.keys(inquiry.selected_options as any).length > 0 && (
            <div className="mt-12 pt-12 border-t border-zinc-900">
                <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-6 italic">Дополнительное оборудование</h4>
                <div className="flex flex-wrap gap-3">
                    {Object.entries(inquiry.selected_options as any).map(([category, options]: [string, any]) => (
                        Array.isArray(options) ? options.map(opt => (
                            <span key={opt} className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm italic">
                                {opt}
                            </span>
                        )) : null
                    ))}
                </div>
            </div>
        )}
      </div>

      {showConfig && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl transition-all" onClick={() => setShowConfig(false)} />
          <div className="relative bg-zinc-950 border border-zinc-900 rounded-[3rem] w-full max-w-6xl overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row h-[80vh] animate-in fade-in zoom-in duration-500">
             <div className="lg:w-2/3 bg-black flex items-center justify-center relative p-12 overflow-hidden border-r border-zinc-900">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />

                {configImage ? (
                    <img
                        src={configImage}
                        className="w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] scale-110 relative z-10"
                        alt="Configuration Preview"
                    />
                ) : (
                    <div className="text-zinc-800 font-black italic uppercase tracking-widest text-xl relative z-10">Изображение отсутствует</div>
                )}
                <div className="absolute top-10 left-10 z-20">
                    <div className="bg-zinc-900/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/5 shadow-2xl">
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] italic">ВИЗУАЛИЗАЦИЯ КЛИЕНТА</span>
                    </div>
                </div>
             </div>
             <div className="lg:w-1/3 p-12 flex flex-col overflow-y-auto bg-zinc-950 relative z-20">
                <button onClick={() => setShowConfig(false)} className="absolute top-10 right-10 size-12 flex items-center justify-center rounded-2xl bg-zinc-900 text-zinc-600 hover:text-white transition-all">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <h3 className="text-3xl font-black text-white uppercase italic mb-12 tracking-tighter leading-none">ДЕТАЛИ <br/><span className="text-zinc-700 font-black italic">СБОРКИ</span></h3>

                <div className="space-y-6">
                    <DetailItem label="Версия" value={inquiry.trim.name} />
                    <DetailItem label="Цвет кузова" value={inquiry.color.name} />
                    <DetailItem label="Диски" value={inquiry.wheels?.name || 'Стандартные'} />
                    <DetailItem label="Интерьер" value={inquiry.interior?.name || 'Стандартный'} />
                </div>

                <div className="mt-auto pt-10 border-t border-zinc-900">
                    <div className="flex justify-between items-end">
                        <span className="text-zinc-600 font-black uppercase text-[10px] tracking-[0.2em] italic">ИТОГОВАЯ ЦЕНА</span>
                        <div className="text-right">
                            <p className="text-4xl font-black text-primary italic tracking-tighter leading-none">{Number(inquiry.total_price_rub).toLocaleString()} ₽</p>
                            <p className="text-xs text-zinc-500 font-black uppercase tracking-widest mt-2 opacity-60 italic">{Number(inquiry.total_price_cny).toLocaleString()} ¥</p>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
}

const DetailItem = ({ label, value }: { label: string, value: string }) => (
    <div className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-900 group hover:border-zinc-800 transition-all">
        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-2 italic">{label}</p>
        <p className="text-white font-black uppercase italic tracking-tight">{value}</p>
    </div>
);

const ConfigSummaryItem = ({ label, value, icon }: any) => (
  <div className="flex items-start gap-6 group/item">
    <div className="size-14 rounded-2xl bg-zinc-900 border border-zinc-900 flex items-center justify-center text-zinc-600 group-hover/item:text-primary group-hover/item:border-primary/20 transition-all shadow-lg">
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
    </div>
    <div className="flex-1 min-w-0">
        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-2 leading-none italic">{label}</p>
        <p className="text-white font-black uppercase italic tracking-tight leading-tight truncate">{value}</p>
    </div>
  </div>
);
