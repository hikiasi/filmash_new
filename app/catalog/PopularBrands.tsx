'use client';

import { useCatalogFilters } from '@/lib/hooks/use-catalog-filters';

interface PopularBrandsProps {
  brands: string[];
}

const PopularBrands: React.FC<PopularBrandsProps> = ({ brands: availableBrands }) => {
  const { brands: activeBrands, setBrands } = useCatalogFilters();

  const handleBrandClick = (brandName: string) => {
    if (activeBrands?.includes(brandName)) {
      setBrands(activeBrands.filter(b => b !== brandName));
    } else {
      setBrands([...(activeBrands || []), brandName]);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {availableBrands.map((brandName) => (
        <button
          key={brandName}
          onClick={() => handleBrandClick(brandName)}
          className={`text-2xl font-bold p-8 rounded-2xl text-left transition-all border
            ${activeBrands?.includes(brandName)
              ? 'bg-primary/90 text-white border-blue-400' 
              : 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700'
            }`}
        >
          {brandName}
        </button>
      ))}
    </div>
  );
};

export default PopularBrands;
