import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const configurationImages = await prisma.configurationImage.findMany({ select: { image_url: true } });
  const colors = await prisma.color.findMany({ select: { image_url: true } });
  const wheels = await prisma.wheel.findMany({ select: { image_url: true } });
  const interiors = await prisma.interior.findMany({ select: { image_url: true } });
  const brands = await prisma.brand.findMany({ select: { logo_url: true } });

  const allUrls = [
    ...configurationImages.map(i => i.image_url),
    ...colors.map(i => i.image_url),
    ...wheels.map(i => i.image_url),
    ...interiors.map(i => i.image_url),
    ...brands.map(i => i.logo_url),
  ].filter(url => url && url.startsWith('http'));

  console.log(JSON.stringify(Array.from(new Set(allUrls)), null, 2));
}

main();
