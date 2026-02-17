'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface InquiryDetailClientProps {
  inquiry: any;
  configImage?: string;
}

export default function InquiryDetailClient({ inquiry, configImage }: InquiryDetailClientProps) {
  const [showConfig, setShowConfig] = useState(false);
  const [status, setStatus] = useState(inquiry.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiry.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const snapshot = inquiry.configuration_snapshot as any;
  const options = snapshot?.options as string[] | null;

  return (
    <div className="space-y-8">
      {/* Configuration Summary Card */}
      <div className="bg-zinc-950 rounded-[2.5rem] border border-zinc-900 p-10 shadow-2xl relative group">
        <div className="flex items-center justify-between mb-10 relative z-10">
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
            <ConfigSummaryItem label="Версия (Trim)" value={inquiry.trim?.name || snapshot?.trim || 'Не указана'} icon="verified" />
            <ConfigSummaryItem label="Цвет кузова" value={inquiry.color?.name || snapshot?.color || 'Не указан'} icon="palette" />
            <ConfigSummaryItem label="Диски" value={inquiry.wheels?.name || snapshot?.wheels || 'Стандартные'} icon="tire_repair" />
            <ConfigSummaryItem label="Интерьер" value={inquiry.interior?.name || snapshot?.interior || 'Стандартный'} icon="chair" />
        </div>

        {options && options.length > 0 && (
            <div className="mt-12 pt-12 border-t border-zinc-900 relative z-10">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-6 italic">Дополнительное оборудование</h4>
                <div className="flex flex-wrap gap-3">
                    {options.map(opt => (
                        <span key={opt} className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm italic">
                            {opt}
                        </span>
                    ))}
                </div>
            </div>
        )}
      </div>

      {/* Mobile Status Update (Visible only on small screens in this layout) */}
      <div className="lg:hidden bg-zinc-950 rounded-[2.5rem] border border-zinc-900 p-8 shadow-2xl space-y-6">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] italic">Статус заявки</h3>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest italic text-white outline-none focus:border-primary appearance-none"
          >
              <option value="NEW">НОВАЯ</option>
              <option value="IN_PROGRESS">В РАБОТЕ</option>
              <option value="COMPLETED">ЗАВЕРШЕНА</option>
              <option value="CANCELLED">ОТМЕНЕНА</option>
          </select>
          <button
            onClick={handleStatusUpdate}
            disabled={isUpdating}
            className="w-full h-14 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all italic shadow-lg shadow-primary/10 disabled:opacity-50"
          >
              {isUpdating ? 'ОБНОВЛЕНИЕ...' : 'СОХРАНИТЬ СТАТУС'}
          </button>
      </div>

      {/* Fullscreen Config Preview */}
      {showConfig && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl transition-all" onClick={() => setShowConfig(false)} />
          <div className="relative bg-zinc-950 border border-zinc-900 rounded-[3rem] w-full max-w-6xl overflow-hidden shadow-2xl flex flex-col lg:flex-row h-[85vh] animate-in fade-in zoom-in duration-300">
             <div className="lg:w-2/3 bg-black flex items-center justify-center relative p-12 overflow-hidden border-r border-zinc-900">
                {configImage ? (
                    <img
                        src={configImage}
                        className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10"
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
                <button onClick={() => setShowConfig(false)} className="absolute top-10 right-10 size-12 flex items-center justify-center rounded-2xl bg-zinc-900 text-zinc-500 hover:text-white transition-all">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <h3 className="text-3xl font-black text-white uppercase italic mb-12 tracking-tighter leading-none">ДЕТАЛИ <br/><span className="text-zinc-700">СБОРКИ</span></h3>

                <div className="space-y-6">
                    <DetailItem label="Версия" value={inquiry.trim?.name || snapshot?.trim || 'Не указана'} />
                    <DetailItem label="Цвет кузова" value={inquiry.color?.name || snapshot?.color || 'Не указан'} />
                    <DetailItem label="Диски" value={inquiry.wheels?.name || snapshot?.wheels || 'Стандартные'} />
                    <DetailItem label="Интерьер" value={inquiry.interior?.name || snapshot?.interior || 'Стандартный'} />
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
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-900 group hover:border-zinc-800 transition-all">
        <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-2 italic">{label}</p>
        <p className="text-white font-black uppercase italic tracking-tight">{value}</p>
    </div>
  );
}

function ConfigSummaryItem({ label, value, icon }: any) {
  return (
    <div className="flex items-start gap-6 group/item">
        <div className="size-14 rounded-2xl bg-zinc-900 border border-zinc-900 flex items-center justify-center text-zinc-600 group-hover/item:text-primary group-hover/item:border-primary/20 transition-all shadow-lg">
            <span className="material-symbols-outlined text-[28px]">{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-2 leading-none italic">{label}</p>
            <p className="text-white font-black uppercase italic tracking-tight leading-tight truncate">{value}</p>
        </div>
    </div>
  );
}
