import { NextResponse } from 'next/server';
import { PlatformsService } from '@/db/services/platforms';

interface RouteParams {
  params: {
    slug: string;
  };
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const platform = await PlatformsService.getBySlug(params.slug);

    if (!platform) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json(platform);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export { GET as platformRoute };
