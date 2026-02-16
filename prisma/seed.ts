import { PrismaClient, Prisma } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Create Brand
  const tesla = await prisma.brand.create({
    data: {
      name: 'Tesla',
      logo_url: 'https://example.com/tesla_logo.png',
      country_of_origin: 'USA',
    },
  });

  // Create Model
  const modelX = await prisma.model.create({
    data: {
      brand_id: tesla.id,
      name: 'Model X',
      body_type: 'Кроссовер',
      year: 2024,
      description: 'The most capable SUV ever built.',
    },
  });

  const specs = {
    brand: 'Tesla',
    power: 670,
    battery: '100 кВт·ч',
    length: '5 057',
    width: '2 271',
    height: '1 680',
    wheelbase: '2 965',
    seats: '5/6/7',
    engine_type: 'Электрический',
    range: '576 км',
    acceleration: '3.9 сек',
    top_speed: '250 км/ч',
    total_power: '500 кВт',
    drive: 'Полный (AWD)',
  };

  const plaidSpecs = {
    ...specs,
    power: 1020,
    acceleration: '2.6 сек',
    top_speed: '262 км/ч',
    total_power: '760 кВт',
  };

  // Trims
  const standardTrim = await prisma.trim.create({
    data: {
      model_id: modelX.id,
      name: 'Model X',
      base_price_cny: 720000,
      base_price_rub: 9500000,
      specifications: specs,
    },
  });

  const plaidTrim = await prisma.trim.create({
    data: {
      model_id: modelX.id,
      name: 'Plaid',
      base_price_cny: 850000,
      base_price_rub: 11500000,
      specifications: plaidSpecs,
    },
  });

  const trims = [standardTrim, plaidTrim];

  for (const trim of trims) {
    // Colors
    const colorsData = [
      { name: 'Mercury (Ртуть)', hex: '#7D7F7D' },
      { name: 'Gray (Серый)', hex: '#4B4D4E' },
      { name: 'Red (Красный)', hex: '#A11622' },
      { name: 'Blue (Синий)', hex: '#1C315E' },
      { name: 'Black (Черный)', hex: '#111111' },
      { name: 'White (Белый)', hex: '#F0F0F0' },
    ];

    const colors = [];
    for (const c of colorsData) {
      colors.push(await prisma.color.create({
        data: {
          trim_id: trim.id,
          name: c.name,
          hex_code: c.hex,
          image_url: `https://example.com/icons/color_${c.hex.replace('#','')}.png`,
          is_premium: false,
        }
      }));
    }

    // Wheels
    const wheelsData = [
      { name: '22" Turbine Wheels', size: '22"' },
      { name: '20" Cyber Wheels', size: '20"' },
    ];

    const wheels = [];
    for (const w of wheelsData) {
      wheels.push(await prisma.wheel.create({
        data: {
          trim_id: trim.id,
          name: w.name,
          size: w.size,
          image_url: `https://example.com/icons/wheel_${w.size.replace('"','')}.png`,
        }
      }));
    }

    // Interiors
    const interiorsData = [
        { name: 'White', material: 'Nappa Leather', img: 'https://example.com/int_white.jpg' },
        { name: 'Black', material: 'Premium', img: 'https://example.com/int_black.jpg' },
        { name: 'Beige', material: 'Walnut', img: 'https://example.com/int_beige.jpg' },
    ];

    for (const int of interiorsData) {
        await prisma.interior.create({
            data: {
                trim_id: trim.id,
                name: int.name,
                material: int.material,
                image_url: int.img,
            }
        });
    }

    // Steering Wheels (for Plaid)
    if (trim.name === 'Plaid') {
        await prisma.steeringWheel.create({
            data: {
                trim_id: trim.id,
                name: 'Standard Steering Wheel',
                image_url: 'https://example.com/steering_std.png',
            }
        });
        await prisma.steeringWheel.create({
            data: {
                trim_id: trim.id,
                name: 'Yoke Steering',
                image_url: 'https://example.com/steering_yoke.png',
            }
        });
    }

    // Configuration Images (Combinations)
    for (const wheel of wheels) {
        for (const color of colors) {
            await prisma.configurationImage.create({
                data: {
                    trim_id: trim.id,
                    color_id: color.id,
                    wheel_id: wheel.id,
                    image_url: `https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=1200`, // Placeholder
                    type: 'exterior'
                }
            });
        }
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
