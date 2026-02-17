'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InquiryStatusCard({ inquiryId, currentStatus }: { inquiryId: string, currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}/status`, {
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

  const handleStartLogistics = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch('/api/admin/deliveries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            inquiry_id: inquiryId,
            status: 'PURCHASED'
        }),
      });
      if (res.ok) {
        router.push('/admin/logistics');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-zinc-950 rounded-3xl border border-zinc-900 p-8 shadow-2xl flex flex-col gap-4">
      <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4 italic">Статус заявки</h3>

      {currentStatus === 'COMPLETED' && (
        <button
            onClick={handleStartLogistics}
            disabled={isUpdating}
            className="w-full h-14 mb-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all italic shadow-lg flex items-center justify-center gap-2"
        >
            <span className="material-symbols-outlined text-sm">local_shipping</span>
            Запустить логистику
        </button>
      )}

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
        className="h-14 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all italic shadow-lg shadow-primary/10 disabled:opacity-50"
      >
          {isUpdating ? 'ОБНОВЛЕНИЕ...' : 'СОХРАНИТЬ СТАТУС'}
      </button>
    </div>
  );
}
