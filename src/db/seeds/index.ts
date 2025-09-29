import 'dotenv/config';
import { PlatformInsert } from '@/db/repositories/platform.repository';
import { normalizeTitle } from '@/lib/games/utils';
import { db } from '../index';
import { gamesTable, platformsTable } from '../schema';
import megaDriveGames from './games/mega-drive.json';

async function seed() {
  const mapGames = (
    platformId: string,
    games: string[][]
  ): (typeof gamesTable.$inferInsert)[] => {
    return games.map(game => ({
      platformId: platformId,
      title: game[0],
      titleVariants: game.length > 1 ? game.slice(1).join(', ') : undefined,
      titleNormalized: normalizeTitle(game[0]),
    }));
  };

  await db.transaction(async tx => {
    const _3do: PlatformInsert = {
      id: '3do',
      name: '3DO',
    };

    const arcade: PlatformInsert = {
      id: 'arcade',
      name: 'Arcade',
    };

    const atarijaguar: PlatformInsert = {
      id: 'jaguar',
      company: 'Atari',
      name: 'Jaguar',
    };

    const atarilynx: PlatformInsert = {
      id: 'lynx',
      company: 'Atari',
      name: 'Lynx',
    };

    const dreamcast: PlatformInsert = {
      id: 'dreamcast',
      company: 'Sega',
      name: 'Dreamcast',
    };

    const gamegear: PlatformInsert = {
      id: 'game-gear',
      company: 'Sega',
      name: 'Game Gear',
    };

    const gb: PlatformInsert = {
      id: 'game-boy',
      company: 'Nintendo',
      name: 'Game Boy',
    };

    const gba: PlatformInsert = {
      id: 'game-boy-advance',
      company: 'Nintendo',
      name: 'Game Boy Advance',
    };

    const gbc: PlatformInsert = {
      id: 'game-boy-color',
      company: 'Nintendo',
      name: 'Game Boy Color',
    };

    const gc: PlatformInsert = {
      id: 'gamecube',
      company: 'Nintendo',
      name: 'GameCube',
    };

    const mastersystem: PlatformInsert = {
      id: 'master-system',
      company: 'Sega',
      name: 'Master System',
    };

    const megadrive: PlatformInsert = {
      id: 'mega-drive',
      company: 'Sega',
      name: 'Mega Drive',
    };

    const n64: typeof platformsTable.$inferInsert = {
      id: 'nintendo-64',
      company: 'Nintendo',
      name: 'Nintendo 64',
    };

    const nds: typeof platformsTable.$inferInsert = {
      id: 'nintendo-ds',
      company: 'Nintendo',
      name: 'Nintendo DS',
    };

    const neogeo: typeof platformsTable.$inferInsert = {
      id: 'neo-geo',
      company: 'SNK',
      name: 'Neo Geo',
    };

    const nes: typeof platformsTable.$inferInsert = {
      id: 'nes',
      company: 'Nintendo',
      name: 'Nintendo Entertainment System',
    };

    const ngpc: typeof platformsTable.$inferInsert = {
      id: 'neo-geo-pocket-color',
      company: 'SNK',
      name: 'Neo Geo Pocket Color',
    };

    const pcengine: typeof platformsTable.$inferInsert = {
      id: 'pc-engine',
      company: 'NEC',
      name: 'PC Engine',
    };

    const ps2: typeof platformsTable.$inferInsert = {
      id: 'playstation-2',
      company: 'Sony',
      name: 'PlayStation 2',
    };

    const psp: typeof platformsTable.$inferInsert = {
      id: 'playstation-portable',
      company: 'Sony',
      name: 'PlayStation Portable',
    };

    const psx: typeof platformsTable.$inferInsert = {
      id: 'playstation',
      company: 'Sony',
      name: 'PlayStation',
    };

    const saturn: typeof platformsTable.$inferInsert = {
      id: 'saturn',
      company: 'Sega',
      name: 'Saturn',
    };

    const sega32x: typeof platformsTable.$inferInsert = {
      id: '32x',
      company: 'Sega',
      name: 'Sega 32X',
    };

    const segacd: typeof platformsTable.$inferInsert = {
      id: 'sega-cd',
      company: 'Sega',
      name: 'Sega CD',
    };

    const snes: typeof platformsTable.$inferInsert = {
      id: 'snes',
      company: 'Nintendo',
      name: 'Super Nintendo Entertainment System',
    };

    const wii: typeof platformsTable.$inferInsert = {
      id: 'wii',
      company: 'Nintendo',
      name: 'Wii',
    };

    const wonderswan: typeof platformsTable.$inferInsert = {
      id: 'wonderswan',
      company: 'Bandai',
      name: 'WonderSwan',
    };

    const wonderswancolor: typeof platformsTable.$inferInsert = {
      id: 'wonderswan-color',
      company: 'Bandai',
      name: 'WonderSwan Color',
    };

    const megadriveGames = mapGames(megadrive.id, megaDriveGames);

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
    await tx.insert(gamesTable).values(megadriveGames);
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
