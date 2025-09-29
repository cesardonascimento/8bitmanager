import { NextResponse } from 'next/server';
import { PlatformRepository } from '@/db/repositories/platform.repository';

export async function GET() {
  try {
    const platforms = await PlatformRepository.list();
    return NextResponse.json(platforms);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
