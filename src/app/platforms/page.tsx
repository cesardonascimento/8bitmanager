'use client';

import { Platform } from '@/db/services/platforms';
import Link from 'next/link';
import { useApi } from '@/hooks/useApi';

export default function Page() {
  const { data: platforms, loading, error } = useApi<Platform[]>('/platforms');

  if (loading) {
    return <div>Loading platforms...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {platforms?.map(platform => (
        <div className="flex flex-col gap-2" key={platform.id}>
          <Link href={`/platforms/${platform.slug}`}>{platform.name}</Link>
        </div>
      ))}
    </div>
  );
}
