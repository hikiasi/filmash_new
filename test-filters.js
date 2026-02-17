import prisma from './lib/db.js';

async function testFilters() {
  try {
    console.log('--- Testing Price Filter ---');
    const priceModels = await prisma.model.findMany({
      where: {
        trims: {
          some: {
            base_price_rub: { gte: 1000000, lte: 15000000 }
          }
        }
      },
      include: { trims: true }
    });
    console.log(`Found ${priceModels.length} models for price 1M-15M`);

    console.log('--- Testing Engine Filter (Электро) ---');
    const engineModels = await prisma.model.findMany({
      where: {
        trims: {
          some: {
            specifications: {
              path: ['engine_type'],
              string_contains: 'Электро'
            }
          }
        }
      }
    });
    console.log(`Found ${engineModels.length} models for engine 'Электро'`);

    console.log('--- Testing Power Filter ---');
    const powerModels = await prisma.model.findMany({
      where: {
        trims: {
          some: {
            specifications: {
              path: ['power'],
              gte: '500',
              lte: '9999'
            }
          }
        }
      }
    });
    console.log(`Found ${powerModels.length} models for power 500+ (string comparison)`);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

testFilters();
