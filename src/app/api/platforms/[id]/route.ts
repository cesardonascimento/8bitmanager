import { NextResponse } from 'next/server';
import { PlatformRepository } from '@/db/repositories/platform.repository';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const platform = await PlatformRepository.fetch(id);

    if (!platform) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json(platform);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
