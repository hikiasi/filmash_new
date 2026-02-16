'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useCatalogFilters } from '@/lib/hooks/use-catalog-filters';
import { useEffect, useState } from 'react';

export function CatalogSearch() {
  const { search, setSearch } = useCatalogFilters();
  const [localSearch, setLocalSearch] = useState(search || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, setSearch]);

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-600" />
      <Input
        placeholder="Поиск по марке или модели..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="pl-12 h-14 bg-zinc-950 border-zinc-800 focus-visible:ring-primary text-white text-lg font-medium placeholder:text-zinc-700 rounded-2xl shadow-inner"
      />
    </div>
  );
}

export default CatalogSearch;
