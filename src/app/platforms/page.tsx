import { Button } from '@/components/ui/button';
import { db } from '@/db';
import { platformsTable } from '@/db/schema';

export default function PlatformsPage() {
  return (
    <div>
      <form
        action={async () => {
          'use server';

          const mastersystem: typeof platformsTable.$inferInsert = {
            name: 'Master System',
            company: 'Sega',
          };

          await db.insert(platformsTable).values(mastersystem);

          const platforms = await db.select().from(platformsTable);
          console.log(platforms);
        }}
      >
        <Button type="submit">Add Platform</Button>
      </form>
    </div>
  );
}
