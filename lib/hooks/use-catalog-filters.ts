import { create } from 'zustand';
import { CatalogFilters } from '@/types/catalog';

interface CatalogFiltersState extends CatalogFilters {
  sortBy: string;
  order: 'asc' | 'desc';
  setBrands: (brands: string[]) => void;
  setBodyTypes: (bodyTypes: string[]) => void;
  setPriceRange: (range: [number, number] | undefined) => void;
  setPowerRange: (range: [number, number] | undefined) => void;
  setDriveTypes: (types: string[]) => void;
  setEngineTypes: (types: string[]) => void;
  setSearch: (search: string) => void;
  setSort: (sortBy: string, order: 'asc' | 'desc') => void;
  resetFilters: () => void;
}

export const useCatalogFilters = create<CatalogFiltersState>((set) => ({
  brands: [],
  bodyTypes: [],
  priceRange: undefined,
  powerRange: undefined,
  driveTypes: [],
  engineTypes: [],
  search: '',
  sortBy: 'year',
  order: 'desc',

  setBrands: (brands) => set({ brands }),
  setBodyTypes: (bodyTypes) => set({ bodyTypes }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setPowerRange: (powerRange) => set({ powerRange }),
  setDriveTypes: (driveTypes) => set({ driveTypes }),
  setEngineTypes: (engineTypes) => set({ engineTypes }),
  setSearch: (search) => set({ search }),
  setSort: (sortBy, order) => set({ sortBy, order }),
  resetFilters: () => set({
    brands: [],
    bodyTypes: [],
    priceRange: undefined,
    powerRange: undefined,
    driveTypes: [],
    engineTypes: [],
    search: '',
    sortBy: 'year',
    order: 'desc',
  }),
}));
