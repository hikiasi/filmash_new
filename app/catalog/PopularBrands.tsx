'use client';

import { useCatalogFilters } from '@/lib/hooks/use-catalog-filters';

interface PopularBrandsProps {
  brands: string[];
}

const PopularBrands: React.FC<PopularBrandsProps> = ({ brands: availableBrands }) => {
  const { brands: activeBrands, setBrands } = useCatalogFilters();

  const handleBrandClick = (brandName: string) => {
    // Single selection logic: if already selected, deselect. If not, select only this one.
    if (activeBrands?.includes(brandName)) {
      setBrands([]);
    } else {
      setBrands([brandName]);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {availableBrands.map((brandName) => (
        <button
          key={brandName}
          onClick={() => handleBrandClick(brandName)}
          className={`text-2xl font-black p-8 rounded-3xl text-left transition-all border uppercase italic
            ${activeBrands?.includes(brandName)
              ? 'bg-primary text-black border-primary shadow-[0_0_20px_rgba(207,249,2,0.3)]'
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
