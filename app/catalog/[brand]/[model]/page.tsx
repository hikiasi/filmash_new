import { Suspense } from 'react';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import ConfiguratorClient from './ConfiguratorClient';
import { Metadata } from 'next';

interface ConfiguratorPageProps {
  params: Promise<{
    brand: string;
    model: string;
  }>;
}

export async function generateMetadata({ params }: ConfiguratorPageProps): Promise<Metadata> {
  const { brand, model } = await params;
  const modelName = model.replace(/-/g, ' ');
  const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);

  return {
    title: `Конфигуратор ${brandName} ${modelName.toUpperCase()} | Филмаш - Соберите свой авто`,
    description: `Индивидуальная настройка ${brandName} ${modelName}. Выбор цвета, дисков, интерьера и дополнительных опций. Актуальные цены в рублях по курсу ЦБ.`,
    openGraph: {
      title: `${brandName} ${modelName} - Конфигуратор Filmash`,
      description: `Создайте свою уникальную конфигурацию ${brandName} ${modelName}.`,
    }
  };
}

export default async function ConfiguratorPage({ params }: ConfiguratorPageProps) {
  const { brand, model: modelParam } = await params;
  const modelName = modelParam.replace(/-/g, ' ');

  const model = await prisma.model.findFirst({
    where: {
      name: { equals: modelName, mode: 'insensitive' },
      brand: { name: { equals: brand, mode: 'insensitive' } }
    },
    include: {
      brand: true,
      trims: {
        orderBy: {
          base_price_rub: 'asc',
        },
        include: {
          colors: true,
          wheels: true,
          interiors: true,
          additional_options: true,
        }
      },
    },
  });

  if (!model) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${model.brand.name} ${model.name}`,
    brand: {
      '@type': 'Brand',
      name: model.brand.name
    },
    manufacturer: model.brand.name,
    modelDate: model.year.toString(),
    bodyType: model.body_type,
    description: model.description,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RUB',
      price: Number(model.trims[0]?.base_price_rub) || 0,
      availability: 'https://schema.org/InStoreOnly',
      itemCondition: 'https://schema.org/NewCondition'
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Suspense fallback={<div className="h-screen flex items-center justify-center text-primary font-bold animate-pulse">ЗАГРУЗКА КОНФИГУРАТОРА...</div>}>
        <ConfiguratorClient model={model} />
      </Suspense>
    </div>
  );
}
