import { PlatformInsert } from '@/db/repositories/platform.repository';
import { normalizeTitle } from '@/lib/games/utils';
import { db } from '../index';
import { gamesTable, platformsTable } from '../schema';
import _32xGames from '../seeds/games/32x.json';
import _3doGames from '../seeds/games/3do.json';
import dreamcastGames from '../seeds/games/dreamcast.json';
import gbaGames from '../seeds/games/game-boy-advance.json';
import gbcGames from '../seeds/games/game-boy-color.json';
import gbGames from '../seeds/games/game-boy.json';
import ggGames from '../seeds/games/game-gear.json';
import gcGames from '../seeds/games/gamecube.json';
import jaguarGames from '../seeds/games/jaguar.json';
import lynxGames from '../seeds/games/lynx.json';
import masterSystemGames from '../seeds/games/master-system.json';
import megaDriveGames from '../seeds/games/mega-drive.json';
import ngpcGames from '../seeds/games/neo-geo-pocket-color.json';
import ngGames from '../seeds/games/neo-geo.json';
import nesGames from '../seeds/games/nes.json';
import n64Games from '../seeds/games/nintendo-64.json';
import ndsGames from '../seeds/games/nintendo-ds.json';
import pcEngineGames from '../seeds/games/pc-engine.json';
import pspGames from '../seeds/games/playstation-portable.json';
import psxGames from '../seeds/games/psx.json';
import saturnGames from '../seeds/games/saturn.json';
import segaCdGames from '../seeds/games/sega-cd.json';
import snesGames from '../seeds/games/snes.json';
import wiiGames from '../seeds/games/wii.json';
import wscGames from '../seeds/games/wonderswan-color.json';
import wsGames from '../seeds/games/wonderswan.json';

export async function seedDatabase() {
  const mapGames = (
    platformId: string,
    games: string[][]
  ): (typeof gamesTable.$inferInsert)[] => {
    return games.map(game => ({
      platformId: platformId,
      title: game[0],
      titleVariants: game.slice(1),
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

    await tx.insert(gamesTable).values(mapGames(_3do.id, _3doGames));
    // await tx.insert(gamesTable).values(mapGames(arcade.id, arcadeGames));
    await tx.insert(gamesTable).values(mapGames(atarijaguar.id, jaguarGames));
    await tx.insert(gamesTable).values(mapGames(atarilynx.id, lynxGames));
    await tx.insert(gamesTable).values(mapGames(dreamcast.id, dreamcastGames));
    await tx.insert(gamesTable).values(mapGames(gamegear.id, ggGames));
    await tx.insert(gamesTable).values(mapGames(gb.id, gbGames));
    await tx.insert(gamesTable).values(mapGames(gba.id, gbaGames));
    await tx.insert(gamesTable).values(mapGames(gbc.id, gbcGames));
    await tx.insert(gamesTable).values(mapGames(gc.id, gcGames));
    await tx
      .insert(gamesTable)
      .values(mapGames(mastersystem.id, masterSystemGames));
    await tx.insert(gamesTable).values(mapGames(megadrive.id, megaDriveGames));
    await tx.insert(gamesTable).values(mapGames(n64.id, n64Games));
    await tx.insert(gamesTable).values(mapGames(nds.id, ndsGames));
    await tx.insert(gamesTable).values(mapGames(neogeo.id, ngGames));
    await tx.insert(gamesTable).values(mapGames(nes.id, nesGames));
    await tx.insert(gamesTable).values(mapGames(ngpc.id, ngpcGames));
    await tx.insert(gamesTable).values(mapGames(pcengine.id, pcEngineGames));
    // await tx.insert(gamesTable).values(mapGames(ps2.id, ps2Games));
    await tx.insert(gamesTable).values(mapGames(psp.id, pspGames));
    await tx.insert(gamesTable).values(mapGames(psx.id, psxGames));
    await tx.insert(gamesTable).values(mapGames(saturn.id, saturnGames));
    await tx.insert(gamesTable).values(mapGames(sega32x.id, _32xGames));
    await tx.insert(gamesTable).values(mapGames(segacd.id, segaCdGames));
    await tx.insert(gamesTable).values(mapGames(snes.id, snesGames));
    await tx.insert(gamesTable).values(mapGames(wii.id, wiiGames));
    await tx.insert(gamesTable).values(mapGames(wonderswan.id, wsGames));
    await tx.insert(gamesTable).values(mapGames(wonderswancolor.id, wscGames));

    await tx.insert(gamesTable).values(mapGames(_3do.id, _3doGames));
  });
}

if (require.main === module) {
  seedDatabase();
}
