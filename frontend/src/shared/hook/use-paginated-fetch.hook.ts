import { useEffect, useState } from 'react';

interface UsePaginatedFetchProps<T> {
  fetchFunction: (params: {
    page: number;
    limit: number;
  }) => Promise<{ items: T[]; total: number }>;
  limit?: number;
}

export function usePaginatedFetch<T, N extends { items: T[]; total: number }>({
  fetchFunction,
  limit = 5,
}: UsePaginatedFetchProps<T>) {
  const [data, setData] = useState<N | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetchFunction({ page, limit });
        setData(response as N);
      } catch (error) {
        console.error('Error fetching paginated data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, limit, fetchFunction]);

  return {
    data,
    isLoading,
    page,
    setPage,
    setData,
  };
}
