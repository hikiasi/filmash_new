import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function InquiryDetail() {
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <nav className="flex items-center text-sm font-medium">
          <Link to="/inquiries" className="text-slate-400 hover:text-white cursor-pointer">Заявки</Link>
          <span className="material-symbols-outlined mx-2 text-slate-400 text-[16px]">chevron_right</span>
          <span className="text-white">Заявка #1024</span>
        </nav>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm font-medium hover:bg-zinc-800 transition-colors">
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Печать</span>
          </button>
          <button
            onClick={() => setShowConfig(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
            <span>Конфигурация</span>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">LI AUTO L9 MAX</h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">Новая</span>
            </div>
            <p className="text-slate-400 font-medium">ID Заявки: #1024 • Создана Сегодня, 14:20</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Расчетная Стоимость</p>
            <p className="text-4xl font-black text-primary italic">7 250 000 ₽</p>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">~ 540 000 ¥</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Configuration Summary */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 shadow-xl">
             <h3 className="text-lg font-black text-white mb-8 flex items-center gap-3 uppercase italic">
              <span className="material-symbols-outlined text-primary">tune</span> Выбранные опции
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ConfigSummaryItem label="Цвет кузова" value="Черный металлик" price="+ 0 ₽" icon="palette" />
                <ConfigSummaryItem label="Диски" value="21-дюймовые черные" price="+ 120 000 ₽" icon="tire_repair" />
                <ConfigSummaryItem label="Интерьер" value="Оранжевая кожа Nappa" price="+ 0 ₽" icon="chair" />
                <ConfigSummaryItem label="Версия" value="Max (Full Options)" price="+ 850 000 ₽" icon="verified" />
            </div>

            <div className="mt-10 pt-10 border-t border-zinc-800">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Дополнительно</h4>
                <div className="flex flex-wrap gap-2">
                    <span className="bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full text-xs font-bold">Выдвижные пороги</span>
                    <span className="bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full text-xs font-bold">Зимний пакет</span>
                    <span className="bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full text-xs font-bold">Ковры 3D</span>
                </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Client Card */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 shadow-xl">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6">Клиент</h3>
            <div className="flex items-center gap-4 mb-8">
              <div className="size-14 rounded-2xl bg-primary text-black flex items-center justify-center font-black text-xl italic shadow-lg shadow-primary/20">ИП</div>
              <div>
                <p className="font-black text-xl text-white uppercase italic">Иван Петров</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="size-2 rounded-full bg-green-500"></span>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Онлайн сейчас</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-background border border-border">
                <span className="material-symbols-outlined text-slate-500">call</span>
                <span className="text-sm font-bold text-white">+7 (900) 123-45-67</span>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-background border border-border">
                <span className="material-symbols-outlined text-slate-500">mail</span>
                <span className="text-sm font-bold text-white">ivanov@mail.ru</span>
              </div>
            </div>
          </div>

          {/* Manager Notes */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 shadow-xl flex flex-col">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-4">Заметки</h3>
            <textarea
                className="w-full h-32 bg-zinc-800 border-zinc-700 rounded-xl p-4 text-sm text-white focus:ring-primary focus:border-primary resize-none"
                placeholder="Добавьте комментарий к заявке..."
            ></textarea>
            <button className="mt-4 w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-lg transition-colors">
                СОХРАНИТЬ ЗАМЕТКУ
            </button>
          </div>
        </div>
      </div>

      {/* Configuration Visualizer Modal */}
      {showConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowConfig(false)} />
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col lg:flex-row h-[80vh]">
             <div className="lg:w-2/3 bg-black flex items-center justify-center relative p-12">
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLtpdsG5zmyaWkkND7YDb31xFG4788mnmssYnWUuTu-Pwa4SJiE3fxDcU0QWw3VYKgwQFSgVMZoteeAY-E_tI0O9HmGyQPVP_Cxt3Oh72gmycrDZya-MLChToZwfAEa1RzT6adcjt3wMTyr_Uk2I_NJTrhaUI8xZfoife4rPL5tF3rdzsL6HNpRi2Lc3XBFg0OWUVIvVNbcgIDZyRwJapRdp_DDd7NvQzw02hXllLpDe2kF_oxTUmWz3pjlshODUYrw73ReXGFjhI"
                    className="w-full h-full object-contain drop-shadow-2xl scale-110"
                />
                <div className="absolute top-8 left-8">
                    <div className="bg-primary/20 backdrop-blur-md px-4 py-2 rounded-xl border border-primary/30">
                        <span className="text-primary text-xs font-black uppercase tracking-widest italic">Визуализация клиента</span>
                    </div>
                </div>
             </div>
             <div className="lg:w-1/3 p-8 flex flex-col overflow-y-auto bg-zinc-900">
                <button onClick={() => setShowConfig(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <h3 className="text-2xl font-black text-white uppercase italic mb-8 tracking-tighter">ДЕТАЛИ СБОРКИ</h3>

                <div className="space-y-6">
                    <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-800">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Комплектация</p>
                        <p className="text-white font-bold">Max (6 мест)</p>
                    </div>
                    <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-800">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Цвет кузова</p>
                        <p className="text-white font-bold">Deep Black</p>
                    </div>
                    <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-800">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Диски</p>
                        <p className="text-white font-bold">21-inch Black Wheels</p>
                    </div>
                    <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-800">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Интерьер</p>
                        <p className="text-white font-bold">Orange Nappa Leather</p>
                    </div>
                </div>

                <div className="mt-auto pt-8 border-t border-zinc-800">
                    <div className="flex justify-between items-end">
                        <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">ИТОГ</span>
                        <div className="text-right">
                            <p className="text-2xl font-black text-primary italic">7 250 000 ₽</p>
                            <p className="text-xs text-slate-500 font-bold">540 000 ¥</p>
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

const ConfigSummaryItem = ({ label, value, price, icon }: any) => (
  <div className="flex items-start gap-4">
    <div className="size-12 rounded-xl bg-zinc-800 flex items-center justify-center text-primary">
        <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{label}</p>
        <p className="text-white font-bold">{value}</p>
        <p className="text-xs text-primary/80 font-bold mt-0.5">{price}</p>
    </div>
  </div>
);
