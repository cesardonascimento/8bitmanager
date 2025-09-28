import 'dotenv/config';
import { db } from '../index';
import { platformsTable } from '../schema';
import megaDriveGames from './games/mega-drive.json';

async function seed() {
  await db.transaction(async tx => {
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
      slug: 'jaguar',
    };

    const atarilynx: typeof platformsTable.$inferInsert = {
      company: 'Atari',
      name: 'Lynx',
      slug: 'lynx',
    };

    const dreamcast: typeof platformsTable.$inferInsert = {
      company: 'Sega',
      name: 'Dreamcast',
      slug: 'dreamcast',
    };

    const gamegear: typeof platformsTable.$inferInsert = {
      company: 'Sega',
      name: 'Game Gear',
      slug: 'game-gear',
    };

    const gb: typeof platformsTable.$inferInsert = {
      company: 'Nintendo',
      name: 'Game Boy',
      slug: 'game-boy',
    };

    const gba: typeof platformsTable.$inferInsert = {
      company: 'Nintendo',
      name: 'Game Boy Advance',
      slug: 'game-boy-advance',
    };

    const gbc: typeof platformsTable.$inferInsert = {
      company: 'Nintendo',
      name: 'Game Boy Color',
      slug: 'game-boy-color',
    };

    const gc: typeof platformsTable.$inferInsert = {
      company: 'Nintendo',
      name: 'GameCube',
      slug: 'gamecube',
    };

    const mastersystem: typeof platformsTable.$inferInsert = {
      company: 'Sega',
      name: 'Master System',
      slug: 'master-system',
    };

    const megadrive: typeof platformsTable.$inferInsert = {
      company: 'Sega',
      name: 'Mega Drive',
      releasedGames: JSON.stringify(megaDriveGames) as unknown as string[][],
      slug: 'mega-drive',
    };

    const n64: typeof platformsTable.$inferInsert = {
      company: 'Nintendo',
      name: 'Nintendo 64',
      slug: 'nintendo-64',
    };

    const nds: typeof platformsTable.$inferInsert = {
      company: 'Nintendo',
      name: 'Nintendo DS',
      slug: 'nintendo-ds',
    };

    const neogeo: typeof platformsTable.$inferInsert = {
      company: 'SNK',
      name: 'Neo Geo',
      slug: 'neo-geo',
    };

    const nes: typeof platformsTable.$inferInsert = {
      company: 'Nintendo',
      name: 'Nintendo Entertainment System',
      slug: 'nes',
    };

    const ngpc: typeof platformsTable.$inferInsert = {
      company: 'SNK',
      name: 'Neo Geo Pocket Color',
      slug: 'neo-geo-pocket-color',
    };

    const pcengine: typeof platformsTable.$inferInsert = {
      company: 'NEC',
      name: 'PC Engine',
      slug: 'pc-engine',
    };

    const ps2: typeof platformsTable.$inferInsert = {
      company: 'Sony',
      name: 'PlayStation 2',
      slug: 'playstation-2',
    };

    const psp: typeof platformsTable.$inferInsert = {
      company: 'Sony',
      name: 'PlayStation Portable',
      slug: 'playstation-portable',
    };

    const psx: typeof platformsTable.$inferInsert = {
      company: 'Sony',
      name: 'PlayStation',
      slug: 'playstation',
    };

    const saturn: typeof platformsTable.$inferInsert = {
      company: 'Sega',
      name: 'Saturn',
      slug: 'saturn',
    };

    const sega32x: typeof platformsTable.$inferInsert = {
      company: 'Sega',
      name: 'Sega 32X',
      slug: '32x',
    };

    const segacd: typeof platformsTable.$inferInsert = {
      company: 'Sega',
      name: 'Sega CD',
      slug: 'sega-cd',
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
      slug: 'wonderswan-color',
    };

    await tx.insert(platformsTable).values(_3do);
    await tx.insert(platformsTable).values(arcade);
    await tx.insert(platformsTable).values(atarijaguar);
    await tx.insert(platformsTable).values(atarilynx);
    await tx.insert(platformsTable).values(dreamcast);
    await tx.insert(platformsTable).values(gamegear);
    await tx.insert(platformsTable).values(gb);
    await tx.insert(platformsTable).values(gba);
    await tx.insert(platformsTable).values(gbc);
    await tx.insert(platformsTable).values(gc);
    await tx.insert(platformsTable).values(mastersystem);
    await tx.insert(platformsTable).values(megadrive);
    await tx.insert(platformsTable).values(n64);
    await tx.insert(platformsTable).values(nds);
    await tx.insert(platformsTable).values(neogeo);
    await tx.insert(platformsTable).values(nes);
    await tx.insert(platformsTable).values(ngpc);
    await tx.insert(platformsTable).values(pcengine);
    await tx.insert(platformsTable).values(ps2);
    await tx.insert(platformsTable).values(psp);
    await tx.insert(platformsTable).values(psx);
    await tx.insert(platformsTable).values(saturn);
    await tx.insert(platformsTable).values(sega32x);
    await tx.insert(platformsTable).values(segacd);
    await tx.insert(platformsTable).values(snes);
    await tx.insert(platformsTable).values(wii);
    await tx.insert(platformsTable).values(wonderswan);
    await tx.insert(platformsTable).values(wonderswancolor);
  });
}

seed();
