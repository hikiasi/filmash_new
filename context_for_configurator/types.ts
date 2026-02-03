
export enum View {
  CATALOG = 'catalog',
  CONFIGURATOR = 'configurator',
  ADMIN = 'admin',
  AI_GEN = 'ai_gen'
}

export interface CarModel {
  id: string;
  name: string; // e.g. "L7 Pro"
  priceModifierCNY: number;
  image: string;
}

export interface CarColor {
  id: string;
  name: string;
  hex: string;
  priceModifierCNY: number;
  image: string;
}

export interface CarWheels {
  id: string;
  name: string;
  priceModifierCNY: number;
  image: string;
}

export interface CarInterior {
  id: string;
  name: string;
  priceModifierCNY: number;
  image: string;
}

export interface TechSpecs {
  acceleration: string;
  range: string;
  power: string;
  drive: string;
  dimensions: string;
}

export interface Car {
  id: string;
  brand: string;
  name: string;
  basePriceCNY: number;
  mainImage: string;
  models: CarModel[];
  colors: CarColor[];
  wheels: CarWheels[];
  interiors: CarInterior[];
  specs: TechSpecs;
}

export interface Lead {
  id: string;
  carName: string;
  config: string;
  priceRUB: number;
  userName: string;
  userPhone: string;
  date: string;
  status: 'new' | 'contacted' | 'sold';
}

export interface AppState {
  cars: Car[];
  leads: Lead[];
  exchangeRate: number;
}
