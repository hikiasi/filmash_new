import { Suspense } from 'react';
import CatalogClient from './CatalogClient';
import { CarCardSkeleton } from '@/components/catalog/CarCardSkeleton';
import prisma from '@/lib/db';
import PopularBrands from './PopularBrands';

export async function generateMetadata() {
  return {
    title: 'Каталог Автомобилей - Filmash',
    description: 'Ознакомьтесь с нашим каталогом новейших электромобилей и гибридов, доступных для заказа из Китая.',
  };
}

// This is a Server Component that fetches initial data for non-interactive elements
export default async function CatalogPage() {
  const brands = await prisma.brand.findMany({
    select: {
      name: true,
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">Каталог <span className="text-zinc-600">Автомобилей</span></h1>
        <p className="text-zinc-400 max-w-2xl text-lg">Выбирайте из лучших предложений китайского автопрома. Каждая модель доступна для полной кастомизации под ваш стиль.</p>
      </div>

      <div className="mb-12">
        <h2 className="text-lg font-bold text-zinc-300 mb-4">Популярные марки</h2>
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