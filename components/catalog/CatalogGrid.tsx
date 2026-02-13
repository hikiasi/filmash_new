import { CatalogItem } from '@/types/catalog';
import CarCard from './CarCard';
import { CarCardSkeleton } from './CarCardSkeleton';

interface CatalogGridProps {
  cars: CatalogItem[];
  isLoading?: boolean;
}

export const CatalogGrid: React.FC<CatalogGridProps> = ({ cars, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-20 text-zinc-500">
        <p>По вашему запросу ничего не найдено.</p>
        <p className="text-sm">Попробуйте изменить параметры фильтра.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CatalogGrid;
