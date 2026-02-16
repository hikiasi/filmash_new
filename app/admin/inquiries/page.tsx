'use client';

import React from 'react';
import Link from 'next/link';

const InquiryRow = ({ id, initials, color, name, car, price, status, date, manager }: any) => (
  <tr className="hover:bg-zinc-800/50 transition-colors group border-b border-zinc-900 last:border-0">
    <td className="px-4 py-4 whitespace-nowrap">
      <input type="checkbox" className="size-4 rounded border-zinc-800 bg-transparent text-primary focus:ring-offset-zinc-950 focus:ring-primary" />
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-primary italic uppercase tracking-tighter">{id}</td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex items-center gap-3">
        <div className={`size-8 rounded-lg ${color} flex items-center justify-center text-xs font-black border border-white/10 italic`}>{initials}</div>
        <div className="text-sm font-bold text-white uppercase italic tracking-tight">{name}</div>
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex flex-col">
        <span className="text-sm text-white font-black uppercase italic tracking-tighter">{car.model}</span>
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{car.detail}</span>
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex flex-col">
        <span className="text-sm font-black text-white italic">{price.rub}</span>
        <span className="text-[10px] text-zinc-500 font-bold">{price.cny}</span>
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-[10px] font-bold text-zinc-400 uppercase italic">
        {manager}
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${status.style}`}>
        {status.dot && <span className={`size-1.5 rounded-full ${status.dotColor} mr-1.5 ${status.pulse ? 'animate-pulse' : ''}`}></span>}
        {status.icon && <span className="material-symbols-outlined mr-1" style={{fontSize: '14px'}}>{status.icon}</span>}
        {status.label}
      </span>
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{date}</td>
    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
      <Link href={`/admin/inquiries/${id.replace('#', '')}`} className="text-zinc-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-zinc-800 inline-block">
        <span className="material-symbols-outlined" style={{fontSize: '20px'}}>visibility</span>
      </Link>
    </td>
  </tr>
);

export default function InquiriesPage() {
  const allInquiries = [
    {
      id: "#1024", initials: "ИП", color: "bg-indigo-500/20 text-indigo-400", name: "Иван Петров",
      car: {model: 'Li Auto L9 Max', detail: 'Черный / Оранжевый'},
      price: {rub: '7.2M ₽', cny: '540k ¥'},
      manager: "Алексей М.",
      status: {label: 'Новая', style: 'bg-blue-500/10 text-blue-400 border-blue-500/20', dot: true, dotColor: 'bg-blue-400'},
      date: "24 Окт 2023"
    },
    {
      id: "#1023", initials: "ЕС", color: "bg-pink-500/20 text-pink-400", name: "Елена Смирнова",
      car: {model: 'Zeekr 001 FR', detail: 'Белый / Серый'},
      price: {rub: '9.5M ₽', cny: '760k ¥'},
      manager: "Мария К.",
      status: {label: 'В работе', style: 'bg-amber-500/10 text-amber-400 border-amber-500/20', dot: true, dotColor: 'bg-amber-400', pulse: true},
      date: "23 Окт 2023"
    },
    {
      id: "#1022", initials: "ДВ", color: "bg-emerald-500/20 text-emerald-400", name: "Дмитрий Волков",
      car: {model: 'Geely Monjaro', detail: 'Изумруд / Черный'},
      price: {rub: '3.8M ₽', cny: '280k ¥'},
      manager: "Алексей М.",
      status: {label: 'Заказан', style: 'bg-purple-500/10 text-purple-400 border-purple-500/20', dot: true, dotColor: 'bg-purple-400'},
      date: "22 Окт 2023"
    }
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <header className="bg-black/95 backdrop-blur-sm z-10 border-b border-zinc-900 sticky top-0">
        <div className="px-6 py-5 flex flex-col gap-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-white text-3xl font-black italic uppercase tracking-tighter leading-tight">Все <span className="text-zinc-600">Заявки</span></h1>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">Полный список всех запросов</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 h-10 px-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest transition-all">
                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>filter_alt</span>
                Фильтры
              </button>
              <button className="flex items-center gap-2 h-10 px-4 rounded-xl bg-primary hover:opacity-90 text-black text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all">
                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>add</span>
                Новая заявка
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mt-2">
            <div className="relative w-full lg:max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-zinc-600 group-focus-within:text-primary transition-colors">search</span>
              </div>
              <input className="block w-full pl-10 pr-3 py-3 border border-zinc-800 rounded-xl bg-zinc-950 text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary text-sm font-bold" placeholder="Поиск заявки..." type="text" />
            </div>
             <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black text-zinc-600 uppercase tracking-widest mr-2">Сортировка:</span>
                <select className="bg-zinc-900 border border-zinc-800 text-white text-xs font-bold rounded-xl focus:ring-primary focus:border-primary block p-2.5 outline-none uppercase tracking-widest">
                  <option>Дате (Новые)</option>
                  <option>Дате (Старые)</option>
                  <option>Цене (По убыванию)</option>
                  <option>Цене (По возрастанию)</option>
                </select>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6 pt-0">
        <div className="border border-zinc-900 rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl">
          <table className="min-w-full divide-y divide-zinc-900">
            <thead className="bg-zinc-900/50">
              <tr>
                <th className="px-4 py-4 text-left w-[48px]"><input type="checkbox" className="size-4 rounded border-zinc-800 bg-transparent text-primary" /></th>
                {['ID', 'Клиент', 'Автомобиль', 'Бюджет', 'Менеджер', 'Статус', 'Дата', 'Действие'].map((head, i) => (
                  <th key={head} className={`px-4 py-4 text-left text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ${i === 7 ? 'text-right' : ''}`}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {allInquiries.map((inq, i) => (
                <InquiryRow key={i} {...inq} />
              ))}
            </tbody>
          </table>
          <div className="px-6 py-4 border-t border-zinc-900 bg-zinc-900/30 flex items-center justify-between">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Показано 1-3 из 145</span>
              <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 text-[10px] font-black uppercase tracking-widest transition-all">Назад</button>
                  <button className="px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 text-[10px] font-black uppercase tracking-widest transition-all">Вперед</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
