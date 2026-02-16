'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { CatalogGrid } from '@/components/catalog/CatalogGrid';
import { CatalogItem } from '@/types/catalog';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useCatalogFilters } from '@/lib/hooks/use-catalog-filters';
import { CarCardSkeleton } from '@/components/catalog/CarCardSkeleton';
import CatalogFilters from '@/components/catalog/CatalogFilters';
import CatalogSearch from '@/components/catalog/CatalogSearch';
import CatalogSort from '@/components/catalog/CatalogSort';

const fetchCatalog = async ({ pageParam = 1, queryKey }: { pageParam: number, queryKey: any[] }) => {
  const [_key, filters] = queryKey;

  const params = new URLSearchParams();
  params.append('page', pageParam.toString());
  params.append('limit', '9');

  if (filters.brands?.length) filters.brands.forEach((b: string) => params.append('brands', b));
  if (filters.bodyTypes?.length) filters.bodyTypes.forEach((bt: string) => params.append('bodyTypes', bt));
  if (filters.priceRange) params.append('priceRange', filters.priceRange.join(','));
  if (filters.powerRange) params.append('powerRange', filters.powerRange.join(','));
  if (filters.driveTypes?.length) filters.driveTypes.forEach((dt: string) => params.append('driveTypes', dt));
  if (filters.engineTypes?.length) filters.engineTypes.forEach((et: string) => params.append('engineTypes', et));
  if (filters.search) params.append('search', filters.search);
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  if (filters.order) params.append('order', filters.order);

  const res = await fetch(`/api/catalog?${params.toString()}`);
  if (!res.ok) {
    throw new Error('Failed to fetch catalog');
  }
  const data = await res.json();
  return data.items as CatalogItem[];
};

export default function CatalogClient() {
  const { ref, inView } = useInView();
  const filters = useCatalogFilters();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['catalog', filters],
    queryFn: fetchCatalog,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 9) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const cars = data?.pages.flatMap((page) => page) ?? [];

  if (status === 'error') {
    return <div className="text-center text-red-500 py-20">Ошибка: {error.message}</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-80 shrink-0">
        <CatalogFilters />
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CatalogSearch />
          <CatalogSort />
        </div>

        {status === 'pending' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <CarCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <CatalogGrid cars={cars} />
            <div ref={ref} className="h-10">
              {isFetchingNextPage && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <CarCardSkeleton key={i} />
                  ))}
                </div>
              )}
            </div>
            {!hasNextPage && cars.length > 0 && (
              <p className="text-center text-zinc-500 mt-10">Вы просмотрели все автомобили.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
