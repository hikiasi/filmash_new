'use client';

import { useConfiguratorStore } from '@/lib/store/configurator-store';
import { useCurrency } from '@/lib/hooks/use-currency';

export function PriceDisplay() {
  const { selectedTrim, selectedColor, selectedWheels, selectedInterior, selectedOptions } = useConfiguratorStore();
  const { exchangeRate, isLoading } = useCurrency();

  const totalPriceCNY = (Number(selectedTrim?.base_price_cny) || 0) +
    (Number(selectedColor?.additional_price_cny) || 0) +
    (Number(selectedWheels?.additional_price_cny) || 0) +
    (Number(selectedInterior?.additional_price_cny) || 0) +
    selectedOptions.reduce((acc, opt) => acc + (Number(opt.price_cny) || 0), 0);

  // Use dynamic exchange rate for RUB calculation
  const totalPriceRUB = totalPriceCNY * exchangeRate;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
      <div className="flex justify-between items-end">
        <span className="text-zinc-500 font-medium">Итоговая цена</span>
        <div className="text-right">
          <div className="text-3xl font-black text-white">
            {isLoading ? '...' : totalPriceRUB.toLocaleString(undefined, { maximumFractionDigits: 0 })} ₽
          </div>
          <div className="text-sm text-zinc-500 font-bold">
            {totalPriceCNY.toLocaleString()} ¥
          </div>
          {exchangeRate && (
             <div className="text-[10px] text-zinc-600 mt-1 uppercase tracking-tighter">
                Курс: 1¥ = {exchangeRate.toFixed(2)}₽
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
