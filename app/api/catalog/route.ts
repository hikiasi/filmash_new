import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { catalogFiltersSchema } from '@/lib/validations/filters';
import { CatalogItem, CatalogResponse } from '@/types/catalog';
import { Prisma } from '@/app/generated/prisma/client';
import { z } from 'zod';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const brands = searchParams.getAll('brands');
    const bodyTypes = searchParams.getAll('bodyTypes');
    const driveTypes = searchParams.getAll('driveTypes');
    const engineTypes = searchParams.getAll('engineTypes');
    const priceRange = searchParams.get('priceRange')?.split(',').map(Number);
    const powerRange = searchParams.get('powerRange')?.split(',').map(Number);
    const search = searchParams.get('search') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const sortBy = searchParams.get('sortBy') || 'year';
    const order = searchParams.get('order') || 'desc';

    // Validate
    const validatedParams = catalogFiltersSchema.safeParse({
        brands,
        bodyTypes,
        priceRange,
        powerRange,
        driveTypes,
        engineTypes,
        search,
    });
    
    if (!validatedParams.success) {
      return new NextResponse(JSON.stringify(validatedParams.error.flatten().fieldErrors), { status: 400 });
    }
    
    const data = validatedParams.data;
    const skip = (page - 1) * limit;

    // 2. Construct Prisma Query Conditions
    const where: Prisma.ModelWhereInput = {};
    const trimSomeFilter: Prisma.TrimWhereInput[] = [];

    if (data.search) {
      where.OR = [
        { name: { contains: data.search, mode: 'insensitive' } },
        { brand: { name: { contains: data.search, mode: 'insensitive' } } },
      ];
    }
    if (data.brands && data.brands.length > 0) {
      where.brand = { name: { in: data.brands } };
    }
    if (data.bodyTypes && data.bodyTypes.length > 0) {
      where.body_type = { in: data.bodyTypes };
    }
    if (data.priceRange) {
      trimSomeFilter.push({ base_price_rub: { gte: data.priceRange[0], lte: data.priceRange[1] } });
    }
    
    if (data.powerRange) {
        trimSomeFilter.push({
            specifications: {
                path: ['power'],
                gte: data.powerRange[0],
                lte: data.powerRange[1],
            }
        } as any);
    }

    if (data.driveTypes && data.driveTypes.length > 0) {
        trimSomeFilter.push({
          OR: data.driveTypes.map(dt => ({
            specifications: {
              path: ['drive'],
              string_contains: dt,
            }
          }))
        } as any);
    }
    if (data.engineTypes && data.engineTypes.length > 0) {
        trimSomeFilter.push({
          OR: data.engineTypes.map(et => ({
            specifications: {
              path: ['engine_type'],
              string_contains: et,
            }
          }))
        } as any);
    }

    if (trimSomeFilter.length > 0) {
        where.trims = {
            some: {
                AND: trimSomeFilter,
            }
        };
    }

    // 3. Sorting
    const orderBy: Prisma.ModelOrderByWithRelationInput = {};
    if (sortBy === 'name' || sortBy === 'year') {
        orderBy[sortBy as keyof Prisma.ModelOrderByWithRelationInput] = order as Prisma.SortOrder;
    } else if (sortBy === 'price') {
        orderBy['year'] = order as Prisma.SortOrder;
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
            include: {
                colors: {
                    take: 1,
                }
            }
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
      const getSpec = (key: string) => (minPriceTrim && typeof minPriceTrim.specifications === 'object' && minPriceTrim.specifications !== null && key in (minPriceTrim.specifications as any)) ? (minPriceTrim.specifications as any)[key] : undefined;

      return {
        id: model.id,
        name: model.name,
        brand: model.brand.name,
        model: model.name,
        year: model.year,
        bodyType: model.body_type,
        imageUrl: minPriceTrim?.colors?.[0]?.image_url || '',
        minPriceCny: minPriceTrim ? Number(minPriceTrim.base_price_cny) : 0,
        minPriceRub: minPriceTrim ? Number(minPriceTrim.base_price_rub) : 0,
        specifications: {
          power: getSpec('power'),
          range: getSpec('range'),
          driveType: getSpec('drive'),
          engineType: getSpec('engine_type'),
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
    return new NextResponse('Internal error', { status: 500 });
  }
}
