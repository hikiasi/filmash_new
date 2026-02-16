'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCatalogFilters } from '@/lib/hooks/use-catalog-filters';

export function CatalogSort() {
  const { sortBy, order, setSort } = useCatalogFilters();

  const handleValueChange = (value: string) => {
    const [field, direction] = value.split('-');
    setSort(field, direction as 'asc' | 'desc');
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-zinc-500 whitespace-nowrap">Сортировать по:</span>
      <Select value={`${sortBy}-${order}`} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[180px] bg-zinc-900 border-zinc-800 text-white">
          <SelectValue placeholder="Выберите..." />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
          <SelectItem value="year-desc">Новые (год)</SelectItem>
          <SelectItem value="year-asc">Старые (год)</SelectItem>
          <SelectItem value="price-asc">Дешевле</SelectItem>
          <SelectItem value="price-desc">Дороже</SelectItem>
          <SelectItem value="name-asc">По названию (А-Я)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default CatalogSort;
