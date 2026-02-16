import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function TrimEditorPage({ params }: { params: Promise<{ modelId: string, trimId: string }> }) {
  const { modelId, trimId } = await params;

  const trim = await prisma.trim.findUnique({
    where: { id: trimId },
    include: {
      model: {
        include: { brand: true }
      }
    }
  });

  if (!trim) {
    notFound();
  }

  const specs = [
    { label: 'Мощность (л.с.)', key: 'power', type: 'number', val: trim.power },
    { label: 'Емкость батареи', key: 'batteryCapacity', type: 'text', val: trim.batteryCapacity },
    { label: 'Запас хода (км)', key: 'range', type: 'number', val: trim.range },
    { label: 'Разгон 0-100 (сек)', key: 'acceleration', type: 'number', val: Number(trim.acceleration) },
    { label: 'Макс. скорость (км/ч)', key: 'topSpeed', type: 'number', val: trim.topSpeed },
    { label: 'Привод', key: 'driveType', type: 'text', val: trim.driveType },
    { label: 'Двигатель', key: 'engineType', type: 'text', val: trim.engineType },
    { label: 'Длина (мм)', key: 'length', type: 'number', val: trim.length },
    { label: 'Ширина (мм)', key: 'width', type: 'number', val: trim.width },
    { label: 'Высота (мм)', key: 'height', type: 'number', val: trim.height },
    { label: 'Колесная база (мм)', key: 'wheelbase', type: 'number', val: trim.wheelbase },
    { label: 'Масса (кг)', key: 'curbWeight', type: 'number', val: trim.curbWeight },
    { label: 'Мест', key: 'seats', type: 'number', val: trim.seats },
    { label: 'Объем багажника (л)', key: 'trunkVolume', type: 'number', val: trim.trunkVolume },
    { label: 'Клиренс (мм)', key: 'groundClearance', type: 'number', val: trim.groundClearance },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-black">
      <header className="bg-black/95 backdrop-blur-sm z-10 border-b border-zinc-900 sticky top-0">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 italic">
              <Link href={`/admin/inventory/trim/${modelId}`} className="hover:text-primary transition-colors">Модель</Link>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <span className="text-zinc-300">Комплектация {trim.name}</span>
            </div>
            <h1 className="text-white text-4xl font-black italic uppercase tracking-tighter leading-none">Технические <span className="text-zinc-600">Характеристики</span></h1>
          </div>
          <button className="h-14 px-10 bg-primary text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all italic shadow-lg shadow-primary/10">
            Сохранить ТТХ
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
            <section className="bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">Название комплектации</label>
                        <input type="text" defaultValue={trim.name} className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-white font-black italic outline-none focus:border-primary" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">Базовая цена (CNY)</label>
                        <input type="number" defaultValue={Number(trim.basePrice)} className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-white font-black italic outline-none focus:border-primary" />
                    </div>
                    {specs.map(spec => (
                        <div key={spec.key} className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">{spec.label}</label>
                            <input type={spec.type} defaultValue={spec.val || ''} className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-white font-black italic outline-none focus:border-primary" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
      </div>
    </div>
  );
}
