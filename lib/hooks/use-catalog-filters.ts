import { create } from 'zustand';

interface CatalogFiltersState {
  brand: string | null;
  setBrand: (brand: string | null) => void;
}

export const useCatalogFilters = create<CatalogFiltersState>((set) => ({
  brand: null,
  setBrand: (brand) => set({ brand }),
}));
