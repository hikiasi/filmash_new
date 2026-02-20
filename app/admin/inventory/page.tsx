import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import ImageOptimized from '@/components/shared/ImageOptimized';

export default async function InventoryPage() {
  const models = await prisma.model.findMany({
    include: {
      brand: true,
      trims: {
        include: {
            colors: true,
            config_images: {
              where: { type: 'exterior' },
            }
        }
      },
    },
    orderBy: {
      brand: {
        name: 'asc',
      },
    },
  });

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-black">
      <header className="bg-black/95 backdrop-blur-sm z-10 border-b border-zinc-900 sticky top-0">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-white text-4xl font-black italic uppercase tracking-tighter leading-none">Управление <span className="text-zinc-600">Каталогом</span></h1>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mt-2 italic">Модельный ряд и комплектации</p>
          </div>
          <Link href="/admin/inventory/add" className="h-14 px-8 bg-primary text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all italic flex items-center gap-3 shadow-lg shadow-primary/10">
            <span className="material-symbols-outlined font-black">add</span>
            Добавить модель
          </Link>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-96 relative group">
              <span className="absolute inset-y-0 left-6 flex items-center text-zinc-600 group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined">search</span>
              </span>
              <input
                className="w-full h-14 rounded-2xl bg-zinc-950 border border-zinc-900 pl-16 pr-6 text-white text-sm font-bold placeholder:text-zinc-700 focus:border-primary focus:outline-none transition-all shadow-2xl"
                placeholder="Поиск по названию или бренду..."
                type="text"
              />
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-900">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-600">Модель & Бренд</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-600">Тип кузова</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-600 text-center">Комплектации</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-600 text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {models.map((model: any) => {
                  // Search all trims for an exterior image, then any color image
                  let imageUrl = '/placeholder-car.jpg';

                  for (const trim of model.trims) {
                    const extImg = trim.config_images?.find((img: any) => img.image_url);
                    if (extImg) {
                        imageUrl = extImg.image_url;
                        break;
                    }
                    const colorImg = trim.colors?.find((c: any) => c.image_url);
                    if (colorImg) {
                        imageUrl = colorImg.image_url;
                        break;
                    }
                  }

                  return (
                    <tr key={model.id} className="group hover:bg-zinc-900/30 transition-all">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-20 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 relative">
                            {imageUrl && (
                              <ImageOptimized
                                src={imageUrl}
                                alt={model.name}
                                fill
                                imgClassName="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                              />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-black uppercase italic tracking-tight">{model.name}</p>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{model.brand.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900 text-zinc-400 text-[10px] font-black uppercase tracking-widest border border-zinc-800">
                          {model.body_type}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="text-white font-black italic">{model.trims.length}</span>
                        <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest ml-2">вариантов</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/inventory/trim/${model.id}`}
                            title="Редактировать комплектации"
                            className="size-10 flex items-center justify-center rounded-xl bg-zinc-900 text-zinc-500 hover:text-primary border border-zinc-800 hover:border-primary/30 transition-all group/btn"
                          >
                            <span className="material-symbols-outlined text-xl">edit</span>
                          </Link>
                          <button className="size-10 flex items-center justify-center rounded-xl bg-zinc-900 text-zinc-500 hover:text-red-500 border border-zinc-800 hover:border-red-500/30 transition-all">
                            <span className="material-symbols-outlined text-xl">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {models.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <p className="text-zinc-600 font-black uppercase italic tracking-widest">Каталог пуст</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
