'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function InquiryDetail() {
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <nav className="flex items-center text-[10px] font-black uppercase tracking-[0.2em]">
          <Link href="/admin/inquiries" className="text-zinc-500 hover:text-white transition-colors">Заявки</Link>
          <span className="material-symbols-outlined mx-2 text-zinc-700 text-[16px]">chevron_right</span>
          <span className="text-primary italic">Заявка #1024</span>
        </nav>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors">
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Печать</span>
          </button>
          <button
            onClick={() => setShowConfig(true)}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
            <span>Конфигурация</span>
          </button>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">LI AUTO L9 MAX</h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">Новая</span>
            </div>
            <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest">ID Заявки: #1024 • Создана Сегодня, 14:20</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">Расчетная Стоимость</p>
            <p className="text-5xl font-black text-primary italic tracking-tighter">7 250 000 ₽</p>
            <p className="text-sm text-zinc-500 font-black uppercase tracking-widest mt-1 opacity-70">~ 540 000 ¥</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Configuration Summary */}
          <div className="bg-zinc-950 rounded-3xl border border-zinc-900 p-10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 size-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

             <h3 className="text-xl font-black text-white mb-10 flex items-center gap-4 uppercase italic tracking-tighter">
              <span className="size-10 rounded-xl bg-zinc-900 flex items-center justify-center text-primary border border-zinc-800">
                <span className="material-symbols-outlined">tune</span>
              </span>
              Выбранные опции
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <ConfigSummaryItem label="Цвет кузова" value="Черный металлик" price="+ 0 ₽" icon="palette" />
                <ConfigSummaryItem label="Диски" value="21-дюймовые черные" price="+ 120 000 ₽" icon="tire_repair" />
                <ConfigSummaryItem label="Интерьер" value="Оранжевая кожа Nappa" price="+ 0 ₽" icon="chair" />
                <ConfigSummaryItem label="Версия" value="Max (Full Options)" price="+ 850 000 ₽" icon="verified" />
            </div>

            <div className="mt-12 pt-12 border-t border-zinc-900">
                <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-6">Дополнительное оборудование</h4>
                <div className="flex flex-wrap gap-3">
                    {['Выдвижные пороги', 'Зимний пакет', 'Ковры 3D', 'Защитная пленка'].map(tag => (
                        <span key={tag} className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Client Card */}
          <div className="bg-zinc-950 rounded-3xl border border-zinc-900 p-8 shadow-2xl">
            <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-8">Информация о клиенте</h3>
            <div className="flex items-center gap-5 mb-10">
              <div className="size-16 rounded-2xl bg-primary text-black flex items-center justify-center font-black text-2xl italic shadow-lg shadow-primary/20">ИП</div>
              <div>
                <p className="font-black text-2xl text-white uppercase italic tracking-tighter">Иван Петров</p>
                <div className="flex items-center gap-2 mt-1.5">
                    <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                    <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Онлайн сейчас</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-900 transition-all hover:border-zinc-800">
                <span className="material-symbols-outlined text-zinc-600">call</span>
                <span className="text-sm font-bold text-white tracking-tight">+7 (900) 123-45-67</span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-900 transition-all hover:border-zinc-800">
                <span className="material-symbols-outlined text-zinc-600">mail</span>
                <span className="text-sm font-bold text-white truncate tracking-tight">ivanov@mail.ru</span>
              </div>
            </div>
          </div>

          {/* Manager Notes */}
          <div className="bg-zinc-950 rounded-3xl border border-zinc-900 p-8 shadow-2xl flex flex-col">
            <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-6">Заметки менеджера</h3>
            <textarea
                className="w-full h-40 bg-zinc-900 border-zinc-800 rounded-2xl p-5 text-sm font-medium text-white focus:ring-1 focus:ring-primary focus:border-primary resize-none placeholder-zinc-700 transition-all shadow-inner"
                placeholder="Добавьте внутренний комментарий..."
            ></textarea>
            <button className="mt-6 w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all active:scale-[0.98]">
                СОХРАНИТЬ ЗАМЕТКУ
            </button>
          </div>
        </div>
      </div>

      {/* Configuration Visualizer Modal */}
      {showConfig && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-all" onClick={() => setShowConfig(false)} />
          <div className="relative bg-zinc-950 border border-zinc-900 rounded-[2.5rem] w-full max-w-6xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row h-[85vh] animate-in fade-in zoom-in duration-300">
             <div className="lg:w-2/3 bg-black flex items-center justify-center relative p-12 overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />

                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLtpdsG5zmyaWkkND7YDb31xFG4788mnmssYnWUuTu-Pwa4SJiE3fxDcU0QWw3VYKgwQFSgVMZoteeAY-E_tI0O9HmGyQPVP_Cxt3Oh72gmycrDZya-MLChToZwfAEa1RzT6adcjt3wMTyr_Uk2I_NJTrhaUI8xZfoife4rPL5tF3rdzsL6HNpRi2Lc3XBFg0OWUVIvVNbcgIDZyRwJapRdp_DDd7NvQzw02hXllLpDe2kF_oxTUmWz3pjlshODUYrw73ReXGFjhI"
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] scale-110 relative z-10"
                    alt="Configuration Preview"
                />
                <div className="absolute top-10 left-10 z-20">
                    <div className="bg-zinc-900/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/5 shadow-2xl">
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] italic">ВИЗУАЛИЗАЦИЯ КЛИЕНТА</span>
                    </div>
                </div>
             </div>
             <div className="lg:w-1/3 p-10 flex flex-col overflow-y-auto bg-zinc-950 relative z-20">
                <button onClick={() => setShowConfig(false)} className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[32px]">close</span>
                </button>
                <h3 className="text-3xl font-black text-white uppercase italic mb-10 tracking-tighter leading-none">ДЕТАЛИ <br/><span className="text-zinc-700">СБОРКИ</span></h3>

                <div className="space-y-6">
                    <DetailItem label="Комплектация" value="Max (6 мест)" />
                    <DetailItem label="Цвет кузова" value="Deep Black Pearl" />
                    <DetailItem label="Диски" value="21-inch Black Sport" />
                    <DetailItem label="Интерьер" value="Orange Nappa Leather" />
                </div>

                <div className="mt-auto pt-10 border-t border-zinc-900">
                    <div className="flex justify-between items-end">
                        <span className="text-zinc-600 font-black uppercase text-[10px] tracking-[0.2em]">ИТОГОВАЯ ЦЕНА</span>
                        <div className="text-right">
                            <p className="text-3xl font-black text-primary italic tracking-tighter">7 250 000 ₽</p>
                            <p className="text-xs text-zinc-500 font-black uppercase tracking-widest mt-1 opacity-60">540 000 ¥</p>
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

const DetailItem = ({ label, value }: { label: string, value: string }) => (
    <div className="p-5 bg-zinc-900/50 rounded-2xl border border-zinc-900 group hover:border-zinc-800 transition-all">
        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-2">{label}</p>
        <p className="text-white font-black uppercase italic tracking-tight">{value}</p>
    </div>
);

const ConfigSummaryItem = ({ label, value, price, icon }: any) => (
  <div className="flex items-start gap-5">
    <div className="size-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary shadow-sm">
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
    </div>
    <div className="flex-1 min-w-0">
        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-1.5 leading-none">{label}</p>
        <p className="text-white font-black uppercase italic tracking-tight leading-tight truncate">{value}</p>
        <p className="text-[10px] text-primary font-black mt-2 uppercase tracking-widest bg-primary/5 inline-block px-2 py-0.5 rounded-md border border-primary/10">{price}</p>
    </div>
  </div>
);
