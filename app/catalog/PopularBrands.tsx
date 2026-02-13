'use client';

import { useCatalogFilters } from '@/lib/hooks/use-catalog-filters';

interface PopularBrandsProps {
  brands: string[];
}

const PopularBrands: React.FC<PopularBrandsProps> = ({ brands }) => {
  const { brand: activeBrand, setBrand } = useCatalogFilters();

  const handleBrandClick = (brandName: string) => {
    // If clicking the same brand again, toggle it off.
    if (activeBrand === brandName) {
      setBrand(null);
    } else {
      setBrand(brandName);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {brands.map((brandName) => (
        <button
          key={brandName}
          onClick={() => handleBrandClick(brandName)}
          className={`text-2xl font-bold p-8 rounded-2xl text-left transition-all border
            ${activeBrand === brandName 
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
