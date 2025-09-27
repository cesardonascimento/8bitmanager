'use client';

import { Platform } from '@/db/services/platforms';
import { useParams } from 'next/navigation';
import { useApi } from '@/hooks/useApi';

export default function Page() {
  const { slug } = useParams();
  const {
    data: platform,
    loading,
    error,
  } = useApi<Platform>(slug ? `/platforms/${slug}` : null);

  if (loading) {
    return <div>Loading platform...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!platform) {
    return <div>Platform not found</div>;
  }

  return (
    <div>
      <h1>{platform.name}</h1>
      <p>{platform.company}</p>
    </div>
  );
}
