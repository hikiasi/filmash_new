'use client';

import { useCurrency } from '@/lib/hooks/use-currency'; // Assuming this hook will be created later

interface PriceFormatterProps {
  priceCny: number;
  className?: string;
}

export const PriceFormatter: React.FC<PriceFormatterProps> = ({ priceCny, className }) => {
  // The hook `use-currency` will provide the exchange rate.
  // For now, we'll use a fallback placeholder rate.
  const { exchangeRate, isLoading } = useCurrency();
  const fallbackRate = 13.5;
  const rate = isLoading ? fallbackRate : exchangeRate;

  const priceRub = priceCny * rate;

  return (
    <div className={className}>
      <div className="text-2xl font-bold text-white">{priceRub.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })}</div>
      <div className="text-sm text-zinc-400 font-medium text-right">от {priceCny.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })}</div>
    </div>
  );
};

export default PriceFormatter;