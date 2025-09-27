import { NextResponse } from 'next/server';
import { PlatformsService } from '@/db/services/platforms';
import { createErrorResponse, createNotFoundResponse } from '@/lib/api';

interface RouteParams {
  params: {
    slug: string;
  };
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const platform = await PlatformsService.getBySlug(params.slug);

    if (!platform) {
      return createNotFoundResponse('Platform not found');
    }

    return NextResponse.json(platform);
  } catch (error) {
    return createErrorResponse(error);
  }
}
