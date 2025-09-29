import { PlatformRepository } from '@/db/repositories/platform.repository';

export default async function Page() {
  const platforms = await PlatformRepository.list();
  console.log(platforms);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Platforms</h1>
        <p className="text-muted-foreground">
          Browse and manage your gaming platforms
        </p>
      </div>
    </div>
  );
}
