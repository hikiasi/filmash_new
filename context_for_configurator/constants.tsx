
import { Car, Lead } from './types';

export const INITIAL_EXCHANGE_RATE = 13.5; // 1 CNY = 13.5 RUB

export const MOCK_CARS: Car[] = [
  {
    id: 'lixiang-l7',
    brand: 'Lixiang',
    name: 'L7',
    basePriceCNY: 301800,
    mainImage: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1000',
    models: [
      { id: 'pro', name: 'L7 Pro', priceModifierCNY: 0, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000' },
      { id: 'max', name: 'L7 Max', priceModifierCNY: 30000, image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&q=80&w=1000' },
      { id: 'ultra', name: 'L7 Ultra', priceModifierCNY: 65000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000' }
    ],
    colors: [
      { id: 'silver', name: 'Серебристый', hex: '#C0C0C0', priceModifierCNY: 0, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000' },
      { id: 'grey', name: 'Серый матовый', hex: '#555555', priceModifierCNY: 10000, image: 'https://images.unsplash.com/photo-1617788138017-80ad422432a9?auto=format&fit=crop&q=80&w=1000' },
      { id: 'green', name: 'Зеленый перламутр', hex: '#2E473B', priceModifierCNY: 10000, image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1000' }
    ],
    wheels: [
      { id: '20-std', name: '20" Стандартные', priceModifierCNY: 0, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000' },
      { id: '21-sport', name: '21" Спортивные', priceModifierCNY: 12000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000' }
    ],
    interiors: [
      { id: 'black', name: 'Черная кожа', priceModifierCNY: 0, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000' },
      { id: 'white', name: 'Белая наппа', priceModifierCNY: 15000, image: 'https://images.unsplash.com/photo-1594732832278-abd644401426?auto=format&fit=crop&q=80&w=1000' },
      { id: 'orange', name: 'Рыжий салон', priceModifierCNY: 15000, image: 'https://images.unsplash.com/photo-1614165933394-06b810419262?auto=format&fit=crop&q=80&w=1000' }
    ],
    specs: {
      acceleration: '5.3 сек',
      range: '1315 км (CLTC)',
      power: '449 л.с.',
      drive: 'Полный',
      dimensions: '5050 x 1995 x 1750 мм'
    }
  },
  {
    id: 'zeekr-001',
    brand: 'Zeekr',
    name: '001',
    basePriceCNY: 269000,
    mainImage: 'https://images.unsplash.com/photo-1614165933394-06b810419262?auto=format&fit=crop&q=80&w=1000',
    models: [
      { id: 'we-95', name: 'WE 95kWh', priceModifierCNY: 0, image: 'https://images.unsplash.com/photo-1614165933394-06b810419262?auto=format&fit=crop&q=80&w=1000' },
      { id: 'you-100', name: 'YOU 100kWh', priceModifierCNY: 60000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000' }
    ],
    colors: [
      { id: 'blue', name: 'Электрик синий', hex: '#0000FF', priceModifierCNY: 0, image: 'https://images.unsplash.com/photo-1614165933394-06b810419262?auto=format&fit=crop&q=80&w=1000' }
    ],
    wheels: [{ id: '21', name: '21" Диски', priceModifierCNY: 0, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000' }],
    interiors: [{ id: 'grey', name: 'Серый алькантара', priceModifierCNY: 0, image: 'https://images.unsplash.com/photo-1594732832278-abd644401426?auto=format&fit=crop&q=80&w=1000' }],
    specs: {
      acceleration: '3.3 сек',
      range: '750 км',
      power: '789 л.с.',
      drive: 'Полный',
      dimensions: '4977 x 1999 x 1545 мм'
    }
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    carName: 'Lixiang L7',
    config: 'Ultra / Grey / 21" / Orange',
    priceRUB: 5500000,
    userName: 'Иван Петров',
    userPhone: '+7 999 123 44 55',
    date: '2023-10-25',
    status: 'new'
  }
];
