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

  const brandsData = [
    { name: 'ZEEKR', logo: 'https://example.com/zeekr.png', country: 'China' },
    { name: 'BYD', logo: 'https://example.com/byd.png', country: 'China' },
    { name: 'Lixiang', logo: 'https://example.com/li.png', country: 'China' },
    { name: 'Tesla', logo: 'https://example.com/tesla.png', country: 'USA' },
    { name: 'BMW', logo: 'https://example.com/bmw.png', country: 'Germany' },
    { name: 'Xiaomi', logo: 'https://example.com/xiaomi.png', country: 'China' },
    { name: 'Lynk & Co', logo: 'https://example.com/lynk.png', country: 'China' },
  ];

  const brands: Record<string, any> = {};
  for (const b of brandsData) {
    brands[b.name] = await prisma.brand.create({
      data: { name: b.name, logo_url: b.logo, country_of_origin: b.country }
    });
  }

  const cars = [
    {
      brand: 'ZEEKR',
      name: '001FR',
      year: 2024,
      body_type: 'Лифтбек',
      price_cny: 769000,
      specs: {
        length: '5018', width: '1999', height: '1545', wheelbase: '3005',
        seats: '5', engine_type: 'Электрический', drive: 'Полный (AWD)',
        power: '1247', battery: '100 кВт·ч', acceleration: '2.02', top_speed: '280'
      }
    },
    {
        brand: 'ZEEKR',
        name: '007',
        year: 2024,
        body_type: 'Седан',
        price_cny: 209900,
        specs: {
          length: '4865', width: '1900', height: '1450', wheelbase: '2928',
          seats: '5', engine_type: 'Электрический', drive: 'Полный (AWD)',
          power: '646', battery: '75-100 кВт·ч', acceleration: '2.84', top_speed: '210'
        }
    },
    {
        brand: 'ZEEKR',
        name: '001',
        year: 2024,
        body_type: 'Лифтбек',
        price_cny: 269000,
        specs: {
          length: '4970', width: '1999', height: '1560', wheelbase: '3005',
          seats: '5', engine_type: 'Электрический', drive: 'Задний (RWD)',
          power: '272', battery: '100 кВт·ч', acceleration: '7.2', top_speed: '200'
        }
    },
    {
        brand: 'Xiaomi',
        name: 'SU7',
        year: 2024,
        body_type: 'Седан',
        price_cny: 215900,
        specs: {
          length: '4997', width: '1963', height: '1455', wheelbase: '3000',
          seats: '5', engine_type: 'Электрический', drive: 'Полный (AWD)',
          power: '673', battery: '101 кВт·ч', acceleration: '2.78', top_speed: '265'
        }
    },
    {
        brand: 'Lixiang',
        name: 'L9',
        year: 2024,
        body_type: 'Внедорожник',
        price_cny: 429800,
        specs: {
          length: '5218', width: '1998', height: '1800', wheelbase: '3105',
          seats: '6', engine_type: 'Гибрид', drive: 'Полный (AWD)',
          power: '449', battery: '52.3 кВт·ч', acceleration: '5.3', top_speed: '180'
        }
    },
    {
        brand: 'Tesla',
        name: 'Cybertruck',
        year: 2024,
        body_type: 'Пикап',
        price_cny: 1000000,
        specs: {
          length: '5885', width: '2027', height: '1905', wheelbase: '3810',
          seats: '5', engine_type: 'Электрический', drive: 'Полный (AWD)',
          power: '845', battery: '123 кВт·ч', acceleration: '2.7', top_speed: '180'
        }
    },
    {
        brand: 'Lixiang',
        name: 'Mega Ultra',
        year: 2024,
        body_type: 'Минивэн',
        price_cny: 529800,
        specs: {
            length: '5350', width: '1965', height: '1850', wheelbase: '3300',
            seats: '7', engine_type: 'Электрический', drive: 'Полный (AWD)',
            power: '544', battery: '102.7 кВт·ч', acceleration: '5.5', top_speed: '180'
        }
    },
    {
        brand: 'Xiaomi',
        name: 'YU7',
        year: 2024,
        body_type: 'Кроссовер',
        price_cny: 253500,
        specs: {
            length: '4999', width: '1996', height: '1608', wheelbase: '3000',
            seats: '5', engine_type: 'Электрический', drive: 'Задний (RWD)',
            power: '315', battery: '96.3 кВт·ч', acceleration: '5.9', top_speed: '240'
        }
    },
    {
        brand: 'BMW',
        name: '318 i',
        year: 2024,
        body_type: 'Седан',
        price_cny: 250000,
        specs: {
            length: '4709', width: '1827', height: '1442', wheelbase: '2851',
            seats: '5', engine_type: 'Бензин', drive: 'Задний (RWD)',
            power: '156', battery: 'N/A', acceleration: '8.4', top_speed: '223'
        }
    },
    {
        brand: 'Lynk & Co',
        name: '900',
        year: 2024,
        body_type: 'Внедорожник',
        price_cny: 304900,
        specs: {
            length: '5240', width: '1999', height: '1810', wheelbase: '3160',
            seats: '6', engine_type: 'Гибрид (PHEV)', drive: 'Полный (AWD)',
            power: '734', battery: '52.4 кВт·ч', acceleration: '4.3', top_speed: '240'
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
        description: `Premium car from ${car.brand}`,
      }
    });

    const trim = await prisma.trim.create({
      data: {
        model_id: model.id,
        name: 'Standard',
        base_price_cny: car.price_cny,
        base_price_rub: car.price_cny * 13.5,
        specifications: car.specs,
      }
    });

    // Default options for each car
    const colors = [
        { name: 'Electric Blue', hex: '#0000FF', price: 0 },
        { name: 'Matte Black', hex: '#111111', price: 10000 },
        { name: 'Pearl White', hex: '#FFFFFF', price: 5000 },
    ];

    for (const c of colors) {
        await prisma.color.create({
            data: {
                trim_id: trim.id,
                name: c.name,
                hex_code: c.hex,
                image_url: '', // Will be filled by admin
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
