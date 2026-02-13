import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { catalogFiltersSchema } from '@/lib/validations/filters';
import { CatalogItem, CatalogResponse } from '@/types/catalog';
import { Prisma } from '@/app/generated/prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // 1. Validate query params
    const validatedParams = catalogFiltersSchema.safeParse(Object.fromEntries(searchParams));
    
    if (!validatedParams.success) {
      return new NextResponse(JSON.stringify(validatedParams.error.flatten().fieldErrors), { status: 400 });
    }
    
    const { brands, bodyTypes, priceRange, powerRange, driveTypes, engineTypes, search } = validatedParams.data;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const sortBy = searchParams.get('sortBy') || 'base_price_rub';
    const order = searchParams.get('order') || 'asc';

    const skip = (page - 1) * limit;

    // 2. Construct Prisma Query Conditions
    const where: Prisma.ModelWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }
    if (brands && brands.length > 0) {
      where.brand = { name: { in: brands } };
    }
    if (bodyTypes && bodyTypes.length > 0) {
      where.body_type = { in: bodyTypes };
    }
    if (priceRange) {
        where.trims = {
            some: {
                base_price_rub: {
                    gte: priceRange[0],
                    lte: priceRange[1],
                }
            }
        }
    }
    // Note: Filtering on JSON fields can be complex. This is a simplified approach.
    // For production, you might need raw queries or more structured JSON.
    if (powerRange) {
        where.trims = {
            ...where.trims,
            some: {
                ...((where.trims as any)?.some || {}),
                specifications: {
                    path: ['power'],
                    gte: powerRange[0],
                    lte: powerRange[1],
                }
            }
        }
    }
     if (driveTypes && driveTypes.length > 0) {
        where.trims = {
            ...where.trims,
            some: {
                ...((where.trims as any)?.some || {}),
                specifications: {
                    path: ['driveType'],
                    in: driveTypes
                }
            }
        }
    }
    if (engineTypes && engineTypes.length > 0) {
         where.trims = {
            ...where.trims,
            some: {
                ...((where.trims as any)?.some || {}),
                specifications: {
                    path: ['engineType'],
                    in: engineTypes
                }
            }
        }
    }


    // 3. Sorting
    const orderBy: Prisma.ModelOrderByWithRelationInput = {};
    if (sortBy === 'name' || sortBy === 'year') {
        orderBy[sortBy] = order;
    } else { // Default to sorting by price on the related Trim model
        orderBy.trims = {
            _min: {
                [sortBy]: order,
            }
        }
    }

    // 4. Execute Queries
    const [models, totalCount] = await prisma.$transaction([
      prisma.model.findMany({
        where,
        include: {
          brand: true,
          trims: {
            orderBy: {
              base_price_rub: 'asc',
            },
          },
        },
        skip,
        take: limit,
        orderBy,
      }),
      prisma.model.count({ where }),
    ]);

    // 5. Format Response
    const catalogItems: CatalogItem[] = models.map((model) => {
      const minPriceTrim = model.trims[0];
      const getSpec = (key: string) => (minPriceTrim && typeof minPriceTrim.specifications === 'object' && minPriceTrim.specifications !== null && key in minPriceTrim.specifications) ? (minPriceTrim.specifications as any)[key] : undefined;

      return {
        id: model.id,
        name: model.name,
        brand: model.brand.name,
        model: model.name,
        year: model.year,
        bodyType: model.body_type,
        imageUrl: '', // Placeholder
        minPriceCny: minPriceTrim ? Number(minPriceTrim.base_price_cny) : 0,
        minPriceRub: minPriceTrim ? Number(minPriceTrim.base_price_rub) : 0,
        specifications: {
          power: getSpec('power'),
          range: getSpec('range'),
          driveType: getSpec('driveType'),
          engineType: getSpec('engineType'),
        },
      };
    });
    
    const response: CatalogResponse = {
        items: catalogItems,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
    }

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('[CATALOG_GET]', error);
    if (error instanceof z.ZodError) {
        return new NextResponse(JSON.stringify(error.issues), { status: 400 });
    }
    return new NextResponse('Internal error', { status: 500 });
  }
}
