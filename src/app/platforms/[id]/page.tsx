import { notFound } from 'next/navigation';
import { PlatformRepository } from '@/db/repositories/platform.repository';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const platform = await PlatformRepository.fetch(id as string);

  if (!platform) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-muted-foreground">{platform.company}</p>
        <h1 className="text-3xl font-bold">{platform.name}</h1>
      </div>
    </div>
  );
}
