import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Clear existing data
  console.log('Clearing existing data...');
  try {
    await prisma.configurationImage.deleteMany();
    await prisma.inquiry.deleteMany();
    await prisma.additionalOption.deleteMany();
    await prisma.steeringWheel.deleteMany();
    await prisma.interior.deleteMany();
    await prisma.wheel.deleteMany();
    await prisma.color.deleteMany();
    await prisma.trim.deleteMany();
    await prisma.model.deleteMany();
    await prisma.brand.deleteMany();
  } catch (e) {
    console.log('Delete failed (might be empty or connection issue), continuing...');
  }

  const brandsData = [
    { name: 'ZEEKR', logo: '/images/brands/zeekr.png', country: 'Китай' },
    { name: 'BYD', logo: '/images/brands/byd.png', country: 'Китай' },
    { name: 'Lixiang', logo: '/images/brands/li.png', country: 'Китай' },
    { name: 'Tesla', logo: '/images/brands/tesla.png', country: 'США' },
    { name: 'BMW', logo: '/images/brands/bmw.png', country: 'Германия' },
    { name: 'Xiaomi', logo: '/images/brands/xiaomi.png', country: 'Китай' },
    { name: 'Lynk & Co', logo: '/images/brands/lynk.png', country: 'Китай' },
  ];

  const brands: Record<string, any> = {};
  for (const b of brandsData) {
    brands[b.name] = await prisma.brand.create({
      data: { name: b.name, logo_url: b.logo, country_of_origin: b.country }
    });
  }

  const cars = [
    {
      brand: 'ZEEKR', name: '001FR', year: 2024, body_type: 'Лифтбек', price_cny: 769000,
      specs: {
        length: 5018, width: 1999, height: 1545, wheelbase: 3005, seats: 5,
        engine_type: 'Электрический', drive: 'Полный (AWD)', power: 1247,
        battery: '100 кВт·ч', acceleration: 2.02, top_speed: 280, torque: 1280
      }
    },
    {
      brand: 'ZEEKR', name: '007', year: 2024, body_type: 'Седан', price_cny: 209900,
      specs: {
        length: 4865, width: 1900, height: 1450, wheelbase: 2928, seats: 5,
        engine_type: 'Электрический', drive: 'Полный (AWD)', power: 646,
        battery: '75-100 кВт·ч', acceleration: 2.84, top_speed: 210, range: 870
      }
    },
    {
      brand: 'ZEEKR', name: '001', year: 2024, body_type: 'Лифтбек', price_cny: 269000,
      specs: {
        length: 4970, width: 1999, height: 1560, wheelbase: 3005, seats: 5,
        engine_type: 'Электрический', drive: 'Задний (RWD)', power: 272,
        battery: '100 кВт·ч', acceleration: 7.2, top_speed: 200, range: 620
      }
    },
    {
        brand: 'ZEEKR', name: '007GT', year: 2024, body_type: 'Седан', price_cny: 232900,
        specs: {
            length: 4864, width: 1900, height: 1445, wheelbase: 2925, seats: 5,
            engine_type: 'Электрический', drive: 'Полный (AWD)', power: 544,
            battery: '90-98 кВт·ч', acceleration: 2.9, top_speed: 210, range: 720
        }
    },
    {
        brand: 'ZEEKR', name: 'X', year: 2024, body_type: 'Кроссовер', price_cny: 149900,
        specs: {
            length: 4450, width: 1836, height: 1572, wheelbase: 2750, seats: 5,
            engine_type: 'Электрический', drive: 'Полный (AWD)', power: 428,
            battery: '66 кВт·ч', acceleration: 3.8, top_speed: 190, range: 500
        }
    },
    {
        brand: 'ZEEKR', name: '9x', year: 2024, body_type: 'Внедорожник', price_cny: 465900,
        specs: {
            length: 5239, width: 2029, height: 1819, wheelbase: 3169, seats: 6,
            engine_type: 'Гибрид (PHEV)', drive: 'Полный (AWD)', power: 600,
            battery: '55 кВт·ч', acceleration: 3.9, top_speed: 240, range: 1200
        }
    },
    {
        brand: 'ZEEKR', name: '009', year: 2024, body_type: 'Минивэн', price_cny: 469000,
        specs: {
            length: 5167, width: 1998, height: 1782, wheelbase: 3110, seats: 7,
            engine_type: 'Электрический', drive: 'Полный (AWD)', power: 544,
            battery: '108 кВт·ч', acceleration: 4.5, top_speed: 210, range: 720
        }
    },
    {
        brand: 'BYD', name: 'Dolphin', year: 2024, body_type: 'Хэтчбек', price_cny: 125800,
        specs: {
            length: 4290, width: 1770, height: 1570, wheelbase: 2700, seats: 5,
            engine_type: 'Электрический', drive: 'Передний (FWD)', power: 95,
            battery: '44.9 кВт·ч', acceleration: 12.3, top_speed: 150, range: 420
        }
    },
    {
        brand: 'BYD', name: 'Han L EV', year: 2024, body_type: 'Седан', price_cny: 219800,
        specs: {
            length: 5050, width: 1960, height: 1505, wheelbase: 2970, seats: 5,
            engine_type: 'Гибрид', drive: 'Полный (AWD)', power: 544,
            battery: '36.8 кВт·ч', acceleration: 3.9, top_speed: 200, range: 200
        }
    },
    {
        brand: 'Lixiang', name: 'Mega Ultra', year: 2024, body_type: 'Минивэн', price_cny: 529800,
        specs: {
            length: 5350, width: 1965, height: 1850, wheelbase: 3300, seats: 7,
            engine_type: 'Электрический', drive: 'Полный (AWD)', power: 544,
            battery: '102.7 кВт·ч', acceleration: 5.5, top_speed: 180, range: 770
        }
    },
    {
        brand: 'Lixiang', name: 'L9', year: 2024, body_type: 'Внедорожник', price_cny: 429800,
        specs: {
            length: 5218, width: 1998, height: 1800, wheelbase: 3105, seats: 6,
            engine_type: 'Гибрид', drive: 'Полный (AWD)', power: 449,
            battery: '52.3 кВт·ч', acceleration: 5.3, top_speed: 180, range: 1315
        }
    },
    {
        brand: 'Tesla', name: 'Cybertruck', year: 2024, body_type: 'Пикап', price_cny: 1000000,
        specs: {
            length: 5885, width: 2027, height: 1905, wheelbase: 3810, seats: 5,
            engine_type: 'Электрический', drive: 'Полный (AWD)', power: 845,
            battery: '123 кВт·ч', acceleration: 2.7, top_speed: 180, range: 515
        }
    },
    {
        brand: 'Xiaomi', name: 'SU7', year: 2024, body_type: 'Седан', price_cny: 215900,
        specs: {
            length: 4997, width: 1963, height: 1455, wheelbase: 3000, seats: 5,
            engine_type: 'Электрический', drive: 'Полный (AWD)', power: 673,
            battery: '101 кВт·ч', acceleration: 2.78, top_speed: 265, range: 800
        }
    },
    {
        brand: 'BMW', name: '318 i', year: 2024, body_type: 'Седан', price_cny: 250000,
        specs: {
            length: 4709, width: 1827, height: 1442, wheelbase: 2851, seats: 5,
            engine_type: 'Бензин', drive: 'Задний (RWD)', power: 156,
            battery: 'N/A', acceleration: 8.4, top_speed: 223
        }
    }
  ];

  for (const car of cars) {
    const model = await prisma.model.create({
      data: {
        brand_id: brands[car.brand].id,
        name: car.name,
        body_type: car.body_type,
        year: car.year,
        description: `Премиальный автомобиль от ${car.brand}`,
      }
    });

    const trim = await prisma.trim.create({
      data: {
        model_id: model.id,
        name: 'Standard',
        base_price_cny: car.price_cny,
        base_price_rub: car.price_cny * 13.5,
        specifications: car.specs as any,
      }
    });

    const colors = [
        { name: 'Electric Blue', hex: '#0000FF', price: 0, image: '/uploads/cars/zeekr-001.jpg' },
        { name: 'Matte Black', hex: '#111111', price: 10000, image: '/uploads/cars/zeekr-001.jpg' },
        { name: 'Pearl White', hex: '#FFFFFF', price: 5000, image: '/uploads/cars/zeekr-001.jpg' },
    ];

    for (const c of colors) {
        await prisma.color.create({
            data: {
                trim_id: trim.id,
                name: c.name,
                hex_code: c.hex,
                image_url: c.image || '',
                is_premium: c.price > 0,
                additional_price_cny: c.price,
                additional_price_rub: c.price * 13.5,
            }
        });
    }

    const wheels = [
        { name: '20" Sport', size: '20', price: 0 },
        { name: '21" Performance', size: '21', price: 15000 },
    ];

    for (const w of wheels) {
        await prisma.wheel.create({
            data: {
                trim_id: trim.id,
                name: w.name,
                size: w.size,
                additional_price_cny: w.price,
                additional_price_rub: w.price * 13.5,
                image_url: '',
            }
        });
    }

    const interiors = [
        { name: 'Black Leather', material: 'Leather', price: 0 },
        { name: 'White Nappa', material: 'Nappa', price: 12000 },
    ];

    for (const i of interiors) {
        await prisma.interior.create({
            data: {
                trim_id: trim.id,
                name: i.name,
                material: i.material,
                additional_price_cny: i.price,
                additional_price_rub: i.price * 13.5,
                image_url: '',
            }
        });
    }
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
