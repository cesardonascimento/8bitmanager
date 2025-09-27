import 'dotenv/config';
import { db } from './index';
import { platformsTable } from './schema';

async function main() {
  const _3do: typeof platformsTable.$inferInsert = {
    name: '3DO',
    slug: '3do',
  };

  const arcade: typeof platformsTable.$inferInsert = {
    name: 'Arcade',
    slug: 'arcade',
  };

  const atarijaguar: typeof platformsTable.$inferInsert = {
    company: 'Atari',
    name: 'Jaguar',
    slug: 'atarijaguar',
  };

  const atarilynx: typeof platformsTable.$inferInsert = {
    company: 'Atari',
    name: 'Lynx',
    slug: 'atarilynx',
  };

  const dreamcast: typeof platformsTable.$inferInsert = {
    company: 'Sega',
    name: 'Dreamcast',
    slug: 'dreamcast',
  };

  const gamegear: typeof platformsTable.$inferInsert = {
    company: 'Sega',
    name: 'Game Gear',
    slug: 'gamegear',
  };

  const gb: typeof platformsTable.$inferInsert = {
    company: 'Nintendo',
    name: 'Game Boy',
    slug: 'gb',
  };

  const gba: typeof platformsTable.$inferInsert = {
    company: 'Nintendo',
    name: 'Game Boy Advance',
    slug: 'gba',
  };

  const gbc: typeof platformsTable.$inferInsert = {
    company: 'Nintendo',
    name: 'Game Boy Color',
    slug: 'gbc',
  };

  const gc: typeof platformsTable.$inferInsert = {
    company: 'Nintendo',
    name: 'GameCube',
    slug: 'gc',
  };

  const mastersystem: typeof platformsTable.$inferInsert = {
    company: 'Sega',
    name: 'Master System',
    slug: 'mastersystem',
  };

  const megadrive: typeof platformsTable.$inferInsert = {
    company: 'Sega',
    name: 'Mega Drive',
    slug: 'megadrive',
  };

  const n64: typeof platformsTable.$inferInsert = {
    company: 'Nintendo',
    name: 'Nintendo 64',
    slug: 'n64',
  };

  const nds: typeof platformsTable.$inferInsert = {
    company: 'Nintendo',
    name: 'Nintendo DS',
    slug: 'nds',
  };

  const neogeo: typeof platformsTable.$inferInsert = {
    company: 'SNK',
    name: 'Neo Geo',
    slug: 'neogeo',
  };

  const nes: typeof platformsTable.$inferInsert = {
    company: 'Nintendo',
    name: 'Nintendo Entertainment System',
    slug: 'nes',
  };

  const ngpc: typeof platformsTable.$inferInsert = {
    company: 'SNK',
    name: 'Neo Geo Pocket Color',
    slug: 'ngpc',
  };

  const pcengine: typeof platformsTable.$inferInsert = {
    company: 'NEC',
    name: 'PC Engine',
    slug: 'pcengine',
  };

  const ps2: typeof platformsTable.$inferInsert = {
    company: 'Sony',
    name: 'PlayStation 2',
    slug: 'ps2',
  };

  const psp: typeof platformsTable.$inferInsert = {
    company: 'Sony',
    name: 'PlayStation Portable',
    slug: 'psp',
  };

  const psx: typeof platformsTable.$inferInsert = {
    company: 'Sony',
    name: 'PlayStation',
    slug: 'psx',
  };

  const saturn: typeof platformsTable.$inferInsert = {
    company: 'Sega',
    name: 'Saturn',
    slug: 'saturn',
  };

  const sega32x: typeof platformsTable.$inferInsert = {
    company: 'Sega',
    name: 'Sega 32X',
    slug: 'sega32x',
  };

  const segacd: typeof platformsTable.$inferInsert = {
    company: 'Sega',
    name: 'Sega CD',
    slug: 'segacd',
  };

  const snes: typeof platformsTable.$inferInsert = {
    company: 'Nintendo',
    name: 'Super Nintendo Entertainment System',
    slug: 'snes',
  };

  const wii: typeof platformsTable.$inferInsert = {
    company: 'Nintendo',
    name: 'Wii',
    slug: 'wii',
  };

  const wonderswan: typeof platformsTable.$inferInsert = {
    company: 'Bandai',
    name: 'WonderSwan',
    slug: 'wonderswan',
  };

  const wonderswancolor: typeof platformsTable.$inferInsert = {
    company: 'Bandai',
    name: 'WonderSwan Color',
    slug: 'wonderswancolor',
  };

  await db.insert(platformsTable).values(_3do);
  await db.insert(platformsTable).values(arcade);
  await db.insert(platformsTable).values(atarijaguar);
  await db.insert(platformsTable).values(atarilynx);
  await db.insert(platformsTable).values(dreamcast);
  await db.insert(platformsTable).values(gamegear);
  await db.insert(platformsTable).values(gb);
  await db.insert(platformsTable).values(gba);
  await db.insert(platformsTable).values(gbc);
  await db.insert(platformsTable).values(gc);
  await db.insert(platformsTable).values(mastersystem);
  await db.insert(platformsTable).values(megadrive);
  await db.insert(platformsTable).values(n64);
  await db.insert(platformsTable).values(nds);
  await db.insert(platformsTable).values(neogeo);
  await db.insert(platformsTable).values(nes);
  await db.insert(platformsTable).values(ngpc);
  await db.insert(platformsTable).values(pcengine);
  await db.insert(platformsTable).values(ps2);
  await db.insert(platformsTable).values(psp);
  await db.insert(platformsTable).values(psx);
  await db.insert(platformsTable).values(saturn);
  await db.insert(platformsTable).values(sega32x);
  await db.insert(platformsTable).values(segacd);
  await db.insert(platformsTable).values(snes);
  await db.insert(platformsTable).values(wii);
  await db.insert(platformsTable).values(wonderswan);
  await db.insert(platformsTable).values(wonderswancolor);
}

main();
