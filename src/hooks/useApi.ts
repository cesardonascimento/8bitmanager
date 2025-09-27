import { useState, useEffect, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
}

export function useApi<T>(
  url: string | null,
  options: UseApiOptions = {}
): UseApiState<T> & {
  refetch: () => Promise<void>;
  setData: (data: T | null) => void;
  setError: (error: string | null) => void;
} {
  const { immediate = true } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    try {
      setLoading(true);
      setError(null);

      const apiUrl = url.startsWith('/api') ? url : `/api${url}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (immediate && url) {
      setLoading(true);
      fetchData();
    }
  }, [fetchData, immediate, url]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    setData,
    setError,
  };
}
