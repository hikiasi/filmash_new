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
  // Create Brands
  const brand1 = await prisma.brand.create({
    data: {
      name: 'Tesla',
      logo_url: 'https://example.com/tesla_logo.png',
      country_of_origin: 'USA',
    },
  });

  const brand2 = await prisma.brand.create({
    data: {
      name: 'BYD',
      logo_url: 'https://example.com/byd_logo.png',
      country_of_origin: 'China',
    },
  });

  const brand3 = await prisma.brand.create({
    data: {
      name: 'NIO',
      logo_url: 'https://example.com/nio_logo.png',
      country_of_origin: 'China',
    },
  });

  // Create Models
  const model1 = await prisma.model.create({
    data: {
      brand_id: brand1.id,
      name: 'Model S',
      body_type: 'Sedan',
      year: 2023,
      description: 'A premium electric sedan.',
    },
  });

  const model2 = await prisma.model.create({
    data: {
      brand_id: brand1.id,
      name: 'Model X',
      body_type: 'SUV',
      year: 2023,
      description: 'A premium electric SUV with Falcon Wing doors.',
    },
  });

  const model3 = await prisma.model.create({
    data: {
      brand_id: brand2.id,
      name: 'Han',
      body_type: 'Sedan',
      year: 2023,
      description: 'A stylish and powerful electric sedan from BYD.',
    },
  });

  const model4 = await prisma.model.create({
    data: {
      brand_id: brand2.id,
      name: 'Tang',
      body_type: 'SUV',
      year: 2023,
      description: 'A spacious and versatile electric SUV from BYD.',
    },
  });

  const model5 = await prisma.model.create({
    data: {
      brand_id: brand3.id,
      name: 'ET7',
      body_type: 'Sedan',
      year: 2023,
      description: 'A smart electric flagship sedan from NIO.',
    },
  });

  // Create Trims (15 total)
  const trims = [];
  for (let i = 0; i < 3; i++) {
    trims.push(
      await prisma.trim.create({
        data: {
          model_id: model1.id,
          name: `Model S Trim ${i + 1}`,
          base_price_cny: 700000 + i * 50000,
          base_price_rub: 8000000 + i * 600000,
          specifications: { power: 670 + i * 100, range: 650 + i * 50 },
        },
      })
    );
    trims.push(
      await prisma.trim.create({
        data: {
          model_id: model2.id,
          name: `Model X Trim ${i + 1}`,
          base_price_cny: 800000 + i * 50000,
          base_price_rub: 9000000 + i * 600000,
          specifications: { power: 670 + i * 100, range: 580 + i * 40 },
        },
      })
    );
    trims.push(
      await prisma.trim.create({
        data: {
          model_id: model3.id,
          name: `Han Trim ${i + 1}`,
          base_price_cny: 250000 + i * 30000,
          base_price_rub: 3000000 + i * 400000,
          specifications: { power: 220 + i * 50, range: 600 + i * 50 },
        },
      })
    );
    trims.push(
      await prisma.trim.create({
        data: {
          model_id: model4.id,
          name: `Tang Trim ${i + 1}`,
          base_price_cny: 300000 + i * 30000,
          base_price_rub: 3500000 + i * 400000,
          specifications: { power: 250 + i * 50, range: 550 + i * 50 },
        },
      })
    );
    trims.push(
      await prisma.trim.create({
        data: {
          model_id: model5.id,
          name: `ET7 Trim ${i + 1}`,
          base_price_cny: 450000 + i * 40000,
          base_price_rub: 5000000 + i * 500000,
          specifications: { power: 644, range: 500 + i * 100 },
        },
      })
    );
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