import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const InquiryRow = ({ inquiry }: { inquiry: any }) => {
  const trim = inquiry.trim || {};
  const modelName = trim.model?.name || 'Неизвестно';
  const trimName = trim.name || '';
  const priceRub = inquiry.total_price_rub ? `${(Number(inquiry.total_price_rub) / 1000000).toFixed(1)}M ₽` : '—';
  const priceCny = inquiry.total_price_cny ? `${(Number(inquiry.total_price_cny) / 1000).toFixed(0)}k ¥` : '—';

  const initials = inquiry.customer_name ? inquiry.customer_name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : '??';

  return (
    <tr className="hover:bg-zinc-800/50 transition-colors group border-b border-zinc-900 last:border-0">
      <td className="px-4 py-4 whitespace-nowrap">
        <input type="checkbox" className="size-4 rounded border-zinc-800 bg-transparent text-primary focus:ring-offset-zinc-950 focus:ring-primary" />
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-primary italic uppercase tracking-tighter">#{inquiry.id.slice(-4)}</td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-black border border-white/10 italic text-zinc-400">{initials}</div>
          <div className="text-sm font-bold text-white uppercase italic tracking-tight">{inquiry.customer_name}</div>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="text-sm text-white font-black uppercase italic tracking-tighter">{modelName}</span>
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{trimName}</span>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="text-sm font-black text-white italic">{priceRub}</span>
          <span className="text-[10px] text-zinc-500 font-bold">{priceCny}</span>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
            inquiry.status === 'NEW' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
            inquiry.status === 'IN_PROGRESS' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
            'bg-green-500/10 text-green-400 border-green-500/20'
        }`}>
          {inquiry.status === 'NEW' && <span className="size-1.5 rounded-full bg-blue-400 mr-1.5"></span>}
          {inquiry.status === 'IN_PROGRESS' && <span className="size-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse"></span>}
          {inquiry.status === 'COMPLETED' && <span className="material-symbols-outlined mr-1" style={{fontSize: '14px'}}>check_circle</span>}
          {inquiry.status}
        </span>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
        {format(new Date(inquiry.created_at), 'dd MMM yyyy', { locale: ru })}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link href={`/admin/inquiries/${inquiry.id}`} className="text-zinc-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-zinc-800 inline-block">
          <span className="material-symbols-outlined" style={{fontSize: '20px'}}>visibility</span>
        </Link>
      </td>
    </tr>
  );
};

export default async function Dashboard() {
  const inquiries = await prisma.inquiry.findMany({
    take: 10,
    orderBy: { created_at: 'desc' },
    include: {
      trim: {
        include: {
          model: true
        }
      }
    }
  });

  const stats = {
    total: await prisma.inquiry.count(),
    new: await prisma.inquiry.count({ where: { status: 'NEW' } }),
    models: await prisma.model.count(),
    brands: await prisma.brand.count(),
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <header className="bg-black/95 backdrop-blur-sm z-10 border-b border-zinc-900 sticky top-0">
        <div className="px-6 py-5 flex flex-col gap-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-white text-3xl font-black italic uppercase tracking-tighter leading-tight">Обзор <span className="text-zinc-600">Заявок</span></h1>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">Управление входящими запросами</p>
            </div>
            <div className="flex gap-3">
              <a
                href="/api/admin/inquiries/export"
                download
                className="flex items-center gap-2 h-10 px-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                Экспорт
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Всего заявок', val: stats.total, icon: 'inbox', color: 'text-primary' },
              { label: 'Новых', val: stats.new, icon: 'notifications_active', color: 'text-blue-500' },
              { label: 'Моделей в базе', val: stats.models, icon: 'directions_car', color: 'text-zinc-400' },
              { label: 'Брендов', val: stats.brands, icon: 'stars', color: 'text-amber-500' },
            ].map(stat => (
              <div key={stat.label} className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`material-symbols-outlined ${stat.color} text-xl`}>{stat.icon}</span>
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</span>
                </div>
                <div className="text-3xl font-black text-white italic">{stat.val}</div>
              </div>
            ))}
        </div>

        <div className="border border-zinc-900 rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl">
          <div className="px-6 py-4 border-b border-zinc-900 bg-zinc-900/30 flex items-center justify-between">
             <h3 className="text-sm font-black text-white uppercase italic tracking-widest">Последние заявки</h3>
             <Link href="/admin/inquiries" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline italic">Все заявки</Link>
          </div>
          <table className="min-w-full divide-y divide-zinc-900">
            <thead className="bg-zinc-900/50">
              <tr>
                <th className="px-4 py-4 text-left w-[48px]"><input type="checkbox" className="size-4 rounded border-zinc-800 bg-transparent text-primary" /></th>
                {['ID', 'Клиент', 'Автомобиль', 'Бюджет', 'Статус', 'Дата', 'Действие'].map((head, i) => (
                  <th key={head} className={`px-4 py-4 text-left text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ${i === 6 ? 'text-right' : ''}`}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {inquiries.map((inquiry: any) => (
                <InquiryRow key={inquiry.id} inquiry={inquiry} />
              ))}
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-20 text-center">
                    <p className="text-zinc-600 font-black uppercase italic tracking-widest">Заявок пока нет</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
