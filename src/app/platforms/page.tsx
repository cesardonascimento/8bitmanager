import { PlatformCard } from '@/components/platform/platform-list-item';
import { PlatformRepository } from '@/db/repositories/platform.repository';

export default async function Page() {
  const platforms = await PlatformRepository.list();

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Platforms</h1>
        <p className="text-muted-foreground">
          Browse and manage your gaming platforms
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {platforms.map(platform => (
          <PlatformCard key={platform.id} platform={platform} />
        ))}
      </div>
    </div>
  );
}
