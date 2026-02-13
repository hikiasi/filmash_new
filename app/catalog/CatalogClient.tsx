'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { CatalogGrid } from '@/components/catalog/CatalogGrid';
import { CatalogItem } from '@/types/catalog';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useCatalogFilters } from '@/lib/hooks/use-catalog-filters';
import { CarCardSkeleton } from '@/components/catalog/CarCardSkeleton';

const fetchCatalog = async ({ pageParam = 1, queryKey }: { pageParam: number, queryKey: (string | null)[] }) => {
  const [_key, brand] = queryKey;
  let url = `/api/catalog?page=${pageParam}&limit=6`;
  if (brand) {
    url += `&brands=${brand}`;
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch catalog');
  }
  const data = await res.json();
  return data.items as CatalogItem[];
};

export default function CatalogClient() {
  const { ref, inView } = useInView();
  const { brand } = useCatalogFilters();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['catalog', brand],
    queryFn: fetchCatalog,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 6) return undefined;
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

  if (status === 'pending') {
    return (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return <div className="text-center text-red-500">Ошибка: {error.message}</div>;
  }

  return (
    <div>
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
    </div>
  );
}
