import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';

export const db = drizzle(process.env.DB_FILE_NAME!);

// async function main() {
//   const megadrive: typeof platformsTable.$inferInsert = {
//     name: 'Mega Drive',
//     company: 'Sega',
//   };

//   await db.insert(platformsTable).values(megadrive);
// }

// main();
