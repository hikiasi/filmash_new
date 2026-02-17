import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import VisualOptionsEditor from './VisualOptionsEditor';

export default async function ModelEditorPage({ params }: { params: Promise<{ modelId: string }> }) {
  const { modelId } = await params;

  const model = await prisma.model.findUnique({
    where: { id: modelId },
    include: {
      brand: true,
      trims: {
        orderBy: { base_price_cny: 'asc' },
        include: {
            colors: true,
            wheels: true,
            interiors: true,
            steering_wheels: true,
            additional_options: true,
        }
      },
    }
  });

  if (!model) {
    notFound();
  }

  // Aggregate unique colors/wheels/interiors from all trims of this model for the UI
  const allColors = Array.from(new Map(model.trims.flatMap((t: any) => t.colors).map((c: any) => [c.hex_code, c])).values());
  const allWheels = Array.from(new Map(model.trims.flatMap((t: any) => t.wheels).map((w: any) => [w.name, w])).values());
  const allInteriors = Array.from(new Map(model.trims.flatMap((t: any) => t.interiors).map((i: any) => [i.name, i])).values());
  const allSteering = Array.from(new Map(model.trims.flatMap((t: any) => t.steering_wheels).map((s: any) => [s.name, s])).values());
  const allOptions = Array.from(new Map(model.trims.flatMap((t: any) => t.additional_options).map((o: any) => [o.name, o])).values());

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-black">
      <header className="bg-black/95 backdrop-blur-sm z-10 border-b border-zinc-900 sticky top-0">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 italic">
              <Link href="/admin/inventory" className="hover:text-primary transition-colors">Инвентарь</Link>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <span className="text-zinc-300">{model.brand.name} {model.name}</span>
            </div>
            <h1 className="text-white text-4xl font-black italic uppercase tracking-tighter leading-none">Редактор <span className="text-zinc-600">Модели</span></h1>
          </div>
          <div className="flex gap-4">
             <button className="h-14 px-10 bg-primary text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all italic shadow-lg shadow-primary/10">
                Сохранить изменения
             </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto space-y-10">
            {/* General Info */}
            <section className="bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] shadow-2xl">
                <h3 className="text-lg font-black text-white mb-8 uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">info</span>
                    Общая информация
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">Название</label>
                        <input type="text" defaultValue={model.name} className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-white font-black italic outline-none focus:border-primary" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">Тип кузова</label>
                        <input type="text" defaultValue={model.body_type} className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-white font-black italic outline-none focus:border-primary" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">Год</label>
                        <input type="number" defaultValue={model.year} className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-white font-black italic outline-none focus:border-primary" />
                    </div>
                </div>
            </section>

            {/* Trims Management */}
            <section className="bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">layers</span>
                        Комплектации (Trims)
                    </h3>
                    <button className="h-10 px-6 bg-zinc-900 border border-zinc-800 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-all italic flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">add</span>
                        Добавить комплектацию
                    </button>
                </div>

                <div className="space-y-4">
                    {model.trims.map((trim: any) => (
                        <div key={trim.id} className="group bg-zinc-900/50 border border-zinc-900 rounded-3xl p-6 flex items-center justify-between hover:border-zinc-700 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="size-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-zinc-600">settings_suggest</span>
                                </div>
                                <div>
                                    <p className="text-white font-black uppercase italic tracking-tight">{trim.name}</p>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                                        От {Number(trim.base_price_cny).toLocaleString()} CNY • {Number(trim.base_price_rub).toLocaleString()} RUB
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                <Link
                                    href={`/admin/inventory/trim/${model.id}/edit/${trim.id}`}
                                    className="h-10 px-5 flex items-center bg-zinc-950 border border-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-primary hover:border-primary/30 transition-all italic"
                                >
                                    Редактировать ТТХ
                                </Link>
                                <button className="size-10 flex items-center justify-center rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-600 hover:text-red-500 transition-all">
                                    <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <VisualOptionsEditor
                initialColors={allColors}
                initialWheels={allWheels}
                initialInteriors={allInteriors}
                initialSteering={allSteering}
                initialOptions={allOptions}
                modelId={model.id}
            />
        </div>
      </div>
    </div>
  );
}
