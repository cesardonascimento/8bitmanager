import { NextResponse } from 'next/server';
import { PlatformsService } from '@/db/services/platforms';

export async function GET() {
  try {
    const platforms = await PlatformsService.getAll();
    return NextResponse.json(platforms);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export { GET as platformsRoute };
