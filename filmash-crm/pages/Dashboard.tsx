import React from 'react';
import { Link } from 'react-router-dom';

const InquiryRow = ({ id, initials, color, name, car, price, status, date }: any) => (
  <tr className="hover:bg-surfaceHover/50 transition-colors group border-b border-border last:border-0">
    <td className="px-4 py-4 whitespace-nowrap">
      <input type="checkbox" className="size-4 rounded border-border bg-transparent text-primary focus:ring-offset-surface focus:ring-primary" />
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-primary">{id}</td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex items-center gap-3">
        <div className={`size-8 rounded-full ${color} flex items-center justify-center text-xs font-bold border border-white/10`}>{initials}</div>
        <div className="text-sm font-medium text-white">{name}</div>
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex flex-col">
        <span className="text-sm text-white">{car.model}</span>
        <span className="text-xs text-slate-500">{car.detail}</span>
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white">{price.rub}</span>
        <span className="text-xs text-slate-500">{price.cny}</span>
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.style}`}>
        {status.dot && <span className={`size-1.5 rounded-full ${status.dotColor} mr-1.5 ${status.pulse ? 'animate-pulse' : ''}`}></span>}
        {status.icon && <span className="material-symbols-outlined mr-1" style={{fontSize: '14px'}}>{status.icon}</span>}
        {status.label}
      </span>
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400">{date}</td>
    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
      <Link to="/inquiries/detail" className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-border inline-block">
        <span className="material-symbols-outlined" style={{fontSize: '20px'}}>visibility</span>
      </Link>
    </td>
  </tr>
);

export default function Dashboard() {
  return (
    <>
      <header className="bg-background/95 backdrop-blur-sm z-10 border-b border-border sticky top-0">
        <div className="px-6 py-5 flex flex-col gap-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-white text-2xl font-bold leading-tight">Обзор Заявок</h1>
              <p className="text-slate-400 text-sm mt-1">Управление и отслеживание входящих запросов на импорт</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 h-9 px-4 rounded-lg border border-border bg-surfaceHover hover:bg-slate-700 text-white text-sm font-medium transition-colors">
                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>file_download</span>
                Экспорт
              </button>
              <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-primary hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all">
                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>add</span>
                Новая заявка
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mt-2">
            <div className="relative w-full lg:max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-500 group-focus-within:text-primary transition-colors">search</span>
              </div>
              <input className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-surface text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm" placeholder="Поиск по ID, клиенту или авто..." type="text" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {['Статус: Все', 'Марка: Все', 'Период: 30 дней'].map((filter) => (
                <button key={filter} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surfaceHover hover:bg-slate-700 text-white text-sm border border-transparent hover:border-border transition-all">
                  <span>{filter}</span>
                  <span className="material-symbols-outlined text-slate-400" style={{fontSize: '18px'}}>arrow_drop_down</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6 pt-0">
        <div className="border border-border rounded-xl overflow-hidden bg-surface shadow-xl shadow-black/20">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-surfaceHover">
              <tr>
                <th className="px-4 py-3.5 text-left w-[48px]"><input type="checkbox" className="size-4 rounded border-border bg-transparent text-primary" /></th>
                {['ID', 'Клиент', 'Автомобиль', 'Цена (RUB/CNY)', 'Статус', 'Дата', 'Действие'].map((head, i) => (
                  <th key={head} className={`px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider ${i === 6 ? 'text-right' : ''}`}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface">
              <InquiryRow 
                id="#1024" initials="ИП" color="bg-indigo-500/20 text-indigo-300" name="Иван Петров"
                car={{model: 'Li Auto L9 Max', detail: 'Черный / Оранжевый салон'}}
                price={{rub: '7.2M ₽', cny: '540k ¥'}}
                status={{label: 'Новая', style: 'bg-blue-500/10 text-blue-400 border-blue-500/20', dot: true, dotColor: 'bg-blue-400'}}
                date="24 Окт 2023"
              />
              <InquiryRow 
                id="#1023" initials="ЕС" color="bg-pink-500/20 text-pink-300" name="Елена Смирнова"
                car={{model: 'Zeekr 001 FR', detail: 'Белый / Серый салон'}}
                price={{rub: '9.5M ₽', cny: '760k ¥'}}
                status={{label: 'В работе', style: 'bg-amber-500/10 text-amber-400 border-amber-500/20', dot: true, dotColor: 'bg-amber-400', pulse: true}}
                date="23 Окт 2023"
              />
               <InquiryRow 
                id="#1022" initials="ДВ" color="bg-teal-500/20 text-teal-300" name="Дмитрий Волков"
                car={{model: 'Geely Monjaro', detail: 'Изумрудный / Черный'}}
                price={{rub: '3.8M ₽', cny: '280k ¥'}}
                status={{label: 'Заказан', style: 'bg-purple-500/10 text-purple-400 border-purple-500/20', dot: true, dotColor: 'bg-purple-400'}}
                date="22 Окт 2023"
              />
               <InquiryRow 
                id="#1021" initials="АС" color="bg-orange-500/20 text-orange-300" name="Алексей Соколов"
                car={{model: 'Voyah Free', detail: 'Зеленый / Кремовый'}}
                price={{rub: '5.1M ₽', cny: '390k ¥'}}
                status={{label: 'Доставлен', style: 'bg-green-500/10 text-green-400 border-green-500/20', icon: 'check_circle'}}
                date="20 Окт 2023"
              />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}