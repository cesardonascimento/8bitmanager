import 'dotenv/config';
import { db } from './index';
import { platformsTable } from './schema';

async function main() {
  const megadrive: typeof platformsTable.$inferInsert = {
    name: 'Mega Drive',
    company: 'Sega',
  };

  await db.insert(platformsTable).values(megadrive);
}

main();
