'use client';

import { useCurrency } from '@/lib/hooks/use-currency';

interface PriceFormatterProps {
  priceCny: number;
  className?: string;
}

export const PriceFormatter: React.FC<PriceFormatterProps> = ({ priceCny, className }) => {
  const { exchangeRate, isLoading } = useCurrency();

  const priceRub = priceCny * exchangeRate;

  return (
    <div className={className}>
      <div className="text-2xl font-bold text-white text-right">
        {isLoading ? '...' : priceRub.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
      </div>
      <div className="text-sm text-zinc-400 font-medium text-right">
        от {priceCny.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY', minimumFractionDigits: 0 })}
      </div>
    </div>
  );
};

export default PriceFormatter;
