import { useQuery } from '@tanstack/react-query';

// This is a placeholder for the actual API call that will be implemented in Task 10
const fetchCurrencyRate = async () => {
  // In a real scenario, this would fetch from '/api/currency'
  // For now, return a static rate.
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return { rate: 13.5 }; 
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
