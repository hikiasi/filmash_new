import { Suspense } from 'react';
import CatalogClient from './CatalogClient';
import { CarCardSkeleton } from '@/components/catalog/CarCardSkeleton';
import prisma from '@/lib/db';
import PopularBrands from './PopularBrands';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Каталог автомобилей из Китая | Филмаш - Заказать авто с доставкой в РФ',
  description: 'Посмотрите актуальный каталог новых автомобилей из Китая, Кореи и Японии. Подберите комплектацию в интерактивном конфигураторе. Честные цены, доставка и растаможка.',
  openGraph: {
    title: 'Каталог автомобилей из Китая | Filmash',
    description: 'Более 100 моделей электромобилей и гибридов с возможностью кастомизации.',
    images: ['/og-catalog.jpg'],
  },
};

export default async function CatalogPage() {
  const brands = await prisma.brand.findMany({
    select: {
      name: true,
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 size-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mb-12 relative">
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 uppercase italic leading-none">
          <span className="text-zinc-100 drop-shadow-xl">КАТАЛОГ</span> <br/>
          <span className="text-primary drop-shadow-[0_0_15px_rgba(207,249,2,0.2)]">АВТОМОБИЛЕЙ</span>
        </h1>
        <p className="text-zinc-500 max-w-2xl text-lg font-bold uppercase tracking-tight">
          Выбирайте из лучших предложений китайского автопрома. <br/>
          <span className="text-zinc-400">Каждая модель доступна для полной кастомизации под ваш стиль.</span>
        </p>
      </div>

      <div className="mb-12 relative">
        <h2 className="text-sm font-black text-zinc-600 mb-4 uppercase tracking-[0.2em]">Популярные марки</h2>
        <PopularBrands brands={brands.map(b => b.name)} />
      </div>

      <div className="relative">
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <CarCardSkeleton key={i} />
              ))}
          </div>
        }>
          <CatalogClient />
        </Suspense>
      </div>
    </div>
  );
}
