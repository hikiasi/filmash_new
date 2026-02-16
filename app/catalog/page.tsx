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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white uppercase italic">
          КАТАЛОГ <span className="text-zinc-600">АВТОМОБИЛЕЙ</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl text-lg font-medium">
          Выбирайте из лучших предложений китайского автопрома. Каждая модель доступна для полной кастомизации под ваш стиль.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-sm font-black text-primary mb-4 uppercase tracking-widest">Популярные марки</h2>
        <PopularBrands brands={brands.map(b => b.name)} />
      </div>

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
  );
}
