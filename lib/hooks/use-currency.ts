import { useQuery } from '@tanstack/react-query';

const fetchCurrencyRate = async () => {
  const res = await fetch('/api/currency');
  if (!res.ok) {
    throw new Error('Failed to fetch currency rate');
  }
  const data = await res.json();
  return data as { rate: number };
};

export const useCurrency = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['currencyRate'],
    queryFn: fetchCurrencyRate,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });

  return {
    exchangeRate: data?.rate || 13.5,
    isLoading,
    error,
  };
};
