'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import VisualOptionsEditor from '../../VisualOptionsEditor';
import ConfigImageEditor from './ConfigImageEditor';
import { serializePrisma } from '@/lib/utils/serialization';

export default function TrimEditorClient({ trim, modelId }: { trim: any, modelId: string }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [trimData, setTrimData] = useState({
    name: trim.name,
    base_price_cny: Number(trim.base_price_cny),
    specifications: trim.specifications || {}
  });

  const specsList = [
    { label: 'Мощность (л.с.)', key: 'power', type: 'number' },
    { label: 'Емкость батареи', key: 'battery', type: 'text' },
    { label: 'Запас хода (км)', key: 'range', type: 'text' },
    { label: 'Разгон 0-100 (сек)', key: 'acceleration', type: 'text' },
    { label: 'Макс. скорость (км/ч)', key: 'top_speed', type: 'text' },
    { label: 'Привод', key: 'drive', type: 'text' },
    { label: 'Двигатель', key: 'engine_type', type: 'text' },
    { label: 'Длина (мм)', key: 'length', type: 'text' },
    { label: 'Ширина (мм)', key: 'width', type: 'text' },
    { label: 'Высота (мм)', key: 'height', type: 'text' },
    { label: 'Колесная база (мм)', key: 'wheelbase', type: 'text' },
    { label: 'Масса (кг)', key: 'curb_weight', type: 'text' },
    { label: 'Мест', key: 'seats', type: 'text' },
    { label: 'Объем багажника (л)', key: 'trunk_volume', type: 'text' },
    { label: 'Клиренс (мм)', key: 'ground_clearance', type: 'text' },
  ];

  const handleSaveSpecs = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/trims/${trim.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimData),
      });
      if (res.ok) {
        router.refresh();
        alert('Характеристики и данные комплектации сохранены');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const updateSpec = (key: string, value: any) => {
    setTrimData({
      ...trimData,
      specifications: {
        ...trimData.specifications,
        [key]: value
      }
    });
  };

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
            <h1 className="text-white text-4xl font-black italic uppercase tracking-tighter leading-none">Редактор <span className="text-zinc-600">Комплектации</span></h1>
          </div>
          <button
            onClick={handleSaveSpecs}
            disabled={isSaving}
            className="h-14 px-10 bg-primary text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all italic shadow-lg shadow-primary/10 disabled:opacity-50"
          >
            {isSaving ? 'Сохранение...' : 'Сохранить ТТХ'}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto space-y-12">
            <section className="bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] shadow-2xl">
                <h3 className="text-lg font-black text-white mb-8 uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">settings</span>
                    Основные данные
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">Название комплектации</label>
                        <input
                          type="text"
                          value={trimData.name}
                          onChange={e => setTrimData({...trimData, name: e.target.value})}
                          className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-white font-black italic outline-none focus:border-primary"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">Базовая цена (CNY)</label>
                        <input
                          type="number"
                          value={trimData.base_price_cny}
                          onChange={e => setTrimData({...trimData, base_price_cny: parseFloat(e.target.value)})}
                          className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-white font-black italic outline-none focus:border-primary"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] shadow-2xl">
                <h3 className="text-lg font-black text-white mb-8 uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">analytics</span>
                    Технические характеристики
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {specsList.map(spec => (
                        <div key={spec.key} className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">{spec.label}</label>
                            <input
                              type={spec.type}
                              value={trimData.specifications[spec.key] || ''}
                              onChange={e => updateSpec(spec.key, spec.type === 'number' ? parseFloat(e.target.value) : e.target.value)}
                              className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-white font-black italic outline-none focus:border-primary"
                            />
                        </div>
                    ))}
                </div>
            </section>

            <ConfigImageEditor
                trimId={trim.id}
                configImages={serializePrisma(trim.config_images)}
                colors={serializePrisma(trim.colors)}
                wheels={serializePrisma(trim.wheels)}
                interiors={serializePrisma(trim.interiors)}
                steeringWheels={serializePrisma(trim.steering_wheels)}
            />

            <VisualOptionsEditor
                initialColors={serializePrisma(trim.colors)}
                initialWheels={serializePrisma(trim.wheels)}
                initialInteriors={serializePrisma(trim.interiors)}
                initialSteering={serializePrisma(trim.steering_wheels)}
                initialOptions={serializePrisma(trim.additional_options)}
                trimId={trim.id}
            />
        </div>
      </div>
    </div>
  );
}
