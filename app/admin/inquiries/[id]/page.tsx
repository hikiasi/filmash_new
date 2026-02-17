import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import InquiryDetailClient from './InquiryDetailClient';
import InquiryStatusCard from './InquiryStatusCard';

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: {
      trim: {
        include: {
          model: {
            include: { brand: true }
          }
        }
      },
      color: true,
      wheels: true,
      interior: true,
    }
  });

  if (!inquiry) {
    notFound();
  }

  // Get the exterior image for the config
  const configImage = await prisma.configurationImage.findFirst({
    where: {
      trim_id: inquiry.trim_id,
      color_id: inquiry.color_id,
      wheel_id: inquiry.wheels_id,
      type: 'exterior'
    }
  });

  const formattedDate = format(new Date(inquiry.created_at), 'eeee, dd MMMM yyyy HH:mm', { locale: ru });
  const priceRub = Number(inquiry.total_price_rub).toLocaleString();
  const priceCny = Number(inquiry.total_price_cny).toLocaleString();

  // Serialize Decimal for Client Component
  const serializedInquiry = JSON.parse(JSON.stringify(inquiry, (key, value) =>
    typeof value === 'object' && value !== null && value.constructor?.name === 'Decimal'
      ? Number(value)
      : value
  ));

  return (
    <div className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto bg-black">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <nav className="flex items-center text-[10px] font-black uppercase tracking-[0.2em]">
          <Link href="/admin/inquiries" className="text-zinc-500 hover:text-white transition-colors">Заявки</Link>
          <span className="material-symbols-outlined mx-2 text-zinc-700 text-[16px]">chevron_right</span>
          <span className="text-primary italic">Заявка #{inquiry.id.slice(-4)}</span>
        </nav>
      </div>

      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
                {inquiry.trim?.model?.brand?.name || (inquiry.configuration_snapshot as any)?.model || 'Лид без модели'}
              </h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  inquiry.status === 'NEW' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' :
                  inquiry.status === 'IN_PROGRESS' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                  'bg-green-500/10 text-green-400 border-green-500/20'
              }`}>
                {inquiry.status}
              </span>
            </div>
            <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest uppercase">ID Заявки: #{inquiry.id.slice(-4)} • {formattedDate}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1 italic">Расчетная Стоимость</p>
            <p className="text-5xl font-black text-primary italic tracking-tighter leading-none">{priceRub} ₽</p>
            <p className="text-sm text-zinc-500 font-black uppercase tracking-widest mt-1 opacity-70 italic">~ {priceCny} ¥</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <InquiryDetailClient
            inquiry={serializedInquiry}
            configImage={configImage?.image_url}
          />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Client Card */}
          <div className="bg-zinc-950 rounded-3xl border border-zinc-900 p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 size-40 bg-primary/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
            <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-8 italic">Информация о клиенте</h3>
            <div className="flex items-center gap-5 mb-10">
              <div className="size-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-primary flex items-center justify-center font-black text-2xl italic shadow-lg">
                {inquiry.customer_name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <div>
                <p className="font-black text-2xl text-white uppercase italic tracking-tighter leading-none">{inquiry.customer_name}</p>
                <div className="flex items-center gap-2 mt-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-500"></span>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Клиент</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 transition-all hover:border-primary/30 group/item">
                <span className="material-symbols-outlined text-zinc-600 group-hover/item:text-primary transition-colors">call</span>
                <span className="text-sm font-black text-white italic tracking-tight">{inquiry.customer_phone}</span>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 transition-all hover:border-primary/30 group/item">
                <span className="material-symbols-outlined text-zinc-600 group-hover/item:text-primary transition-colors">mail</span>
                <span className="text-sm font-black text-white italic tracking-tight truncate">{inquiry.customer_email}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <InquiryStatusCard inquiryId={inquiry.id} currentStatus={inquiry.status} />
        </div>
      </div>
    </div>
  );
}
