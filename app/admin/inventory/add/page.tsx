import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';

export default async function AddVehiclePage() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-black">
      <header className="bg-black/95 backdrop-blur-sm z-10 border-b border-zinc-900 sticky top-0">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 italic">
              <Link href="/admin/inventory" className="hover:text-primary transition-colors">Инвентарь</Link>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <span className="text-zinc-300">Новая модель</span>
            </div>
            <h1 className="text-white text-4xl font-black italic uppercase tracking-tighter leading-none">Добавить <span className="text-zinc-600">Автомобиль</span></h1>
          </div>
          <div className="flex gap-4">
             <button className="h-14 px-8 bg-zinc-900 text-zinc-400 text-xs font-black uppercase tracking-widest rounded-2xl hover:text-white transition-all italic border border-zinc-800">
                Отмена
             </button>
             <button className="h-14 px-10 bg-primary text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all italic shadow-lg shadow-primary/10">
                Сохранить
             </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
            <section className="bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] shadow-2xl">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-lg font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">info</span>
                        Основная информация
                    </h3>
                    <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">Шаг 1 из 3</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">Марка (Бренд)</label>
                        <select className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-white font-black italic outline-none focus:border-primary appearance-none">
                            <option value="">Выберите бренд...</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">Название модели</label>
                        <input type="text" placeholder="напр. Model X, G-Class" className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-white font-black italic outline-none focus:border-primary" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">Тип кузова</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {['Внедорожник', 'Седан', 'Купе', 'Пикап'].map(type => (
                                <button key={type} className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-600 hover:border-primary hover:text-white transition-all">
                                    <span className="material-symbols-outlined">directions_car</span>
                                    <span className="text-[10px] font-black uppercase tracking-tight">{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-2">Изображение (URL)</label>
                        <input type="text" placeholder="https://..." className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 text-white font-black italic outline-none focus:border-primary" />
                    </div>
                </div>
            </section>

             <section className="bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] shadow-2xl">
                <h3 className="text-lg font-black text-white mb-10 uppercase italic tracking-tighter flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">palette</span>
                    Визуализация
                </h3>
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block mb-4 ml-2">Доступные цвета экстерьера</label>
                        <div className="flex flex-wrap gap-3 p-6 bg-zinc-900 border border-zinc-800 rounded-[2rem]">
                            <button className="flex items-center gap-3 bg-black border border-zinc-800 px-5 py-2.5 rounded-2xl text-[10px] font-black text-white uppercase italic tracking-widest hover:border-primary transition-all">
                                <span className="size-3 rounded-full bg-white"></span>
                                Pearl White
                            </button>
                            <button className="flex items-center gap-3 bg-black border border-zinc-800 px-5 py-2.5 rounded-2xl text-[10px] font-black text-white uppercase italic tracking-widest hover:border-primary transition-all">
                                <span className="size-3 rounded-full bg-zinc-900"></span>
                                Solid Black
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-dashed border-zinc-700 text-zinc-500 hover:text-primary hover:border-primary text-[10px] font-black uppercase italic tracking-widest transition-all">
                                <span className="material-symbols-outlined text-sm">add</span>
                                Добавить цвет
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
}
