'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const InquiryRow = ({ inquiry }: { inquiry: any }) => {
  const trim = inquiry.trim || {};
  const modelName = trim.model?.name || 'Неизвестно';
  const trimName = trim.name || '';
  const priceRub = inquiry.total_price_rub ? `${(Number(inquiry.total_price_rub) / 1000000).toFixed(2)}M ₽` : '—';
  const priceCny = inquiry.total_price_cny ? `${(Number(inquiry.total_price_cny) / 1000).toFixed(0)}k ¥` : '—';

  const initials = inquiry.customer_name ? inquiry.customer_name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : '??';

  return (
    <tr className="hover:bg-zinc-800/50 transition-colors group border-b border-zinc-900 last:border-0">
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
      <td className="px-4 py-4 whitespace-nowrap text-[10px] font-bold text-zinc-400 uppercase italic">
          Система
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
        {format(new Date(inquiry.created_at), 'dd.MM.yy', { locale: ru })}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link href={`/admin/inquiries/${inquiry.id}`} className="text-zinc-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-zinc-800 inline-block">
          <span className="material-symbols-outlined" style={{fontSize: '20px'}}>visibility</span>
        </Link>
      </td>
    </tr>
  );
};

export default function InquiriesClient({ inquiries }: { inquiries: any[] }) {
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    model: '',
    trim: ''
  });

  const handleAddLead = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsAddModalOpen(false);
        setFormData({ name: '', phone: '', email: '', model: '', trim: '' });
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Customer', 'Phone', 'Email', 'Model', 'Trim', 'Status', 'Date'];
    const rows = inquiries.map(inq => [
      inq.id.slice(-4),
      inq.customer_name,
      inq.customer_phone,
      inq.customer_email,
      inq.trim?.model?.name,
      inq.trim?.name,
      inq.status,
      format(new Date(inq.created_at), 'yyyy-MM-dd HH:mm')
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-black/95 backdrop-blur-sm z-20 border-b border-zinc-900 sticky top-0">
        <div className="px-6 py-5 flex flex-col gap-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-white text-3xl font-black italic uppercase tracking-tighter leading-tight">Все <span className="text-zinc-600">Заявки</span></h1>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">Полный список всех запросов</p>
            </div>
            <div className="flex gap-3">
               <button
                onClick={exportCSV}
                className="h-12 px-6 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-white transition-all italic flex items-center gap-2"
               >
                  <span className="material-symbols-outlined text-sm">download</span>
                  Экспорт CSV
               </button>
               <button
                onClick={() => setIsAddModalOpen(true)}
                className="h-12 px-6 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all italic flex items-center gap-2 shadow-lg shadow-primary/10"
               >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Создать вручную
               </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 pt-0">
        <div className="border border-zinc-900 rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl mb-12">
          <table className="min-w-full divide-y divide-zinc-900">
            <thead className="bg-zinc-900/50">
              <tr>
                {['ID', 'Клиент', 'Автомобиль', 'Бюджет', 'Менеджер', 'Статус', 'Дата', 'Действие'].map((head, i) => (
                  <th key={head} className={`px-4 py-4 text-left text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ${i === 7 ? 'text-right' : ''}`}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {inquiries.map((inq: any) => (
                <InquiryRow key={inq.id} inquiry={inq} />
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

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-900 text-white max-w-md rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Новая Заявка</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Имя клиента</Label>
              <Input
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Александр"
                className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl focus:border-primary text-white italic"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Телефон</Label>
              <Input
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder="+7 (___) ___-__-__"
                className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl focus:border-primary text-white italic"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Автомобиль</Label>
              <Input
                value={formData.model}
                onChange={e => setFormData({...formData, model: e.target.value})}
                placeholder="напр. ZEEKR 001"
                className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl focus:border-primary text-white italic"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={isSubmitting}
              onClick={handleAddLead}
              className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all italic"
            >
              {isSubmitting ? 'Создание...' : 'Создать Lead'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
