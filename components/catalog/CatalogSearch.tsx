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
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <Input
        placeholder="Поиск по марке или модели..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="pl-10 bg-zinc-900 border-zinc-800 focus-visible:ring-primary text-white"
      />
    </div>
  );
}

export default CatalogSearch;
