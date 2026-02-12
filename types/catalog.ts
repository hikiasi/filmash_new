export interface CatalogItem {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  bodyType: string;
  imageUrl: string;
  minPriceCny: number;
  minPriceRub: number;
  specifications: {
    power?: number;
    range?: number;
    driveType?: string;
    engineType?: string;
  };
}

export interface CatalogFilters {
  brands?: string[];
  bodyTypes?: string[];
  priceRange?: [number, number];
  powerRange?: [number, number];
  driveTypes?: string[];
  engineTypes?: string[];
  search?: string;
}

export interface CatalogResponse {
  items: CatalogItem[];
  totalCount: number;
  totalPages: number;
}
