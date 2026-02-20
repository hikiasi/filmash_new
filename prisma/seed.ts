import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import bcrypt from 'bcryptjs';

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
    await prisma.staff.deleteMany();
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
        brand: 'Lixiang', name: 'L9', year: 2024, body_type: 'Внедорожник', price_cny: 409800,
        trims: [
          {
            name: 'L9 Pro',
            base_price_cny: 409800,
            specs: {"drive": "4WD", "power": 449, "range": "1100", "seats": "6", "width": "1998", "height": "1800", "length": "5218", "battery": "44,5 кВт·ч", "top_speed": "180", "wheelbase": "3105", "engine_type": "330 кВт", "acceleration": "5,3 с"},
            colors: [
              { name: 'Белый перламутр', hex: '#FFFFFF', image: '/uploads/color/bb5be34e-c927-4977-84ef-5d4599edab74-bel2.png' },
              { name: 'Зеленый перламутр', hex: '#006400', image: '/uploads/color/9ec7ca65-0928-4674-a625-c35efdd4eb94-zel2.png' },
              { name: 'Черный металлик', hex: '#000000', image: '/uploads/color/9eec25f4-660e-4724-a607-0d55b91cad6a-black2.png' },
              { name: 'Холодный глянец', hex: '#A9A9A9', image: '/uploads/color/43aa7c10-76ee-4dd3-bb92-6a78c640e2e1-cold2.png' },
              { name: 'Серый металлик', hex: '#808080', image: '/uploads/color/e293ec46-c09e-4432-b7dc-faf7b661c19a-gray2.png' },
              { name: 'Фиолетовый перламутровый', hex: '#4B0082', image: '/uploads/color/832ccc5e-41e9-4181-b672-00979e300fcb-purple2.png' },
              { name: 'Серебряный металлик', hex: '#C0C0C0', image: '/uploads/color/07864a9c-33f3-4d5e-bd63-48d7af37b027-serebr2.png' },
            ],
            interiors: [
              { name: 'Коричневый', material: 'Кожа Наппа', image: '/uploads/interior/db975855-28a1-4dec-b87f-91277137ce84-brown1.png' },
              { name: 'Черный', material: 'Кожа Наппа', image: '/uploads/interior/f855023a-a2a0-4011-9c5a-0b2a35be0301-black1.png' },
              { name: 'Оранжевый', material: 'Кожа Наппа', image: '/uploads/interior/4236f7d0-be9d-467e-a9f0-1752c19d73c6-orange1.png' },
              { name: 'Белый', material: 'Кожа Наппа', image: '/uploads/interior/9b536434-95ad-40c5-8f02-6a108f6cf17d-white1.png' },
            ],
            wheels: [
              { name: '21" серебристо-серые', size: '21', image: '/uploads/wheel/8b02bfe7-70d1-4491-b880-ceb227714b4e-jgpa1vmvaf4uxc32lksd9o8btospet5i.png' },
              { name: '21" черно-серые', size: '21', image: '/uploads/wheel/47c32bf8-1d0a-4a25-b84a-c291ee9d45b1-black_rims.png' },
            ],
            images: [
                // White
                { type: 'exterior', color: 'Белый перламутр', wheel: '21" серебристо-серые', url: '/uploads/config-views/7588566d-1053-470b-a861-75b2084142e1-bel.png' },
                { type: 'exterior', color: 'Белый перламутр', wheel: '21" серебристо-серые', url: '/uploads/config-views/ea9e0ff4-4ae8-4827-b627-65d1138a4f94-bel1.png' },
                // Green
                { type: 'exterior', color: 'Зеленый перламутр', wheel: '21" серебристо-серые', url: '/uploads/config-views/f72225b4-296d-4e90-ace2-8a54d2a03a18-zel.png' },
                { type: 'exterior', color: 'Зеленый перламутр', wheel: '21" серебристо-серые', url: '/uploads/config-views/578e9355-8e80-44e8-af4f-02f4e6fcaf3e-zel1.png' },
                // Brown Interior
                { type: 'interior', interior: 'Коричневый', url: '/uploads/config-views/eb5084cf-cd4d-432f-a8fe-ae5ee7c3e2e2-brown.png' },
                { type: 'interior', interior: 'Коричневый', url: '/uploads/config-views/4be4ed7d-54a8-455b-8e26-0e96dfef0c09-brown2.png' },
                // Black Interior
                { type: 'interior', interior: 'Черный', url: '/uploads/config-views/24c683a7-cf8a-4c18-8e0b-d7fc93e21280-black.png' },
                { type: 'interior', interior: 'Черный', url: '/uploads/config-views/57afba15-3bd5-409a-a172-710e7816cd7e-black2.png' },
                // Orange Interior
                { type: 'interior', interior: 'Оранжевый', url: '/uploads/config-views/510d7733-65f3-41f0-9a1d-858e3958de3c-orange.png' },
                { type: 'interior', interior: 'Оранжевый', url: '/uploads/config-views/59de0cf3-2dc0-4dda-afb2-e4acebcc1ea6-orange2.png' },
            ]
          }
        ]
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

    const carTrims = (car as any).trims || [
        {
            name: 'Standard',
            base_price_cny: car.price_cny,
            specs: (car as any).specs
        }
    ];

    for (const trimData of carTrims) {
        const trim = await prisma.trim.create({
          data: {
            model_id: model.id,
            name: trimData.name,
            base_price_cny: trimData.base_price_cny,
            base_price_rub: Number(trimData.base_price_cny) * 13.5,
            specifications: trimData.specs as any,
          }
        });

        const colors = trimData.colors || [
            { name: 'Electric Blue', hex: '#0000FF', price: 0, image: '/uploads/cars/zeekr-001.jpg' },
            { name: 'Matte Black', hex: '#111111', price: 10000, image: '/uploads/cars/zeekr-001.jpg' },
            { name: 'Pearl White', hex: '#FFFFFF', price: 5000, image: '/uploads/cars/zeekr-001.jpg' },
        ];

        const createdColors: Record<string, any> = {};
        for (const c of colors) {
            createdColors[c.name] = await prisma.color.create({
                data: {
                    trim_id: trim.id,
                    name: c.name,
                    hex_code: c.hex,
                    image_url: c.image || '',
                    is_premium: (c.price || 0) > 0,
                    additional_price_cny: c.price || 0,
                    additional_price_rub: (c.price || 0) * 13.5,
                }
            });
        }

        const wheels = trimData.wheels || [
            { name: '20" Sport', size: '20', price: 0 },
            { name: '21" Performance', size: '21', price: 15000 },
        ];

        const createdWheels: Record<string, any> = {};
        for (const w of wheels) {
            createdWheels[w.name] = await prisma.wheel.create({
                data: {
                    trim_id: trim.id,
                    name: w.name,
                    size: w.size,
                    additional_price_cny: w.price || 0,
                    additional_price_rub: (w.price || 0) * 13.5,
                    image_url: w.image || '',
                }
            });
        }

        const interiors = trimData.interiors || [
            { name: 'Black Leather', material: 'Leather', price: 0 },
            { name: 'White Nappa', material: 'Nappa', price: 12000 },
        ];

        const createdInteriors: Record<string, any> = {};
        for (const i of interiors) {
            createdInteriors[i.name] = await prisma.interior.create({
                data: {
                    trim_id: trim.id,
                    name: i.name,
                    material: i.material,
                    additional_price_cny: i.price || 0,
                    additional_price_rub: (i.price || 0) * 13.5,
                    image_url: i.image || '',
                }
            });
        }

        if (trimData.images) {
            for (const img of trimData.images) {
                await prisma.configurationImage.create({
                    data: {
                        trim_id: trim.id,
                        type: img.type,
                        image_url: img.url,
                        color_id: img.color ? createdColors[img.color]?.id : null,
                        wheel_id: img.wheel ? createdWheels[img.wheel]?.id : null,
                        interior_id: img.interior ? createdInteriors[img.interior]?.id : null,
                    }
                });
            }
        }
    }
  }

  // Create default admin
  console.log('Creating default admin...');
  await prisma.staff.create({
    data: {
      name: 'Admin',
      email: 'admin@filmash.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
    }
  });

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
