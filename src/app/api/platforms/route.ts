import { NextResponse } from 'next/server';
import { PlatformsService } from '@/db/services/platforms';
import { createErrorResponse } from '@/lib/api';

export async function GET() {
  try {
    const platforms = await PlatformsService.getAll();
    return NextResponse.json(platforms);
  } catch (error) {
    return createErrorResponse(
      error,
      'Failed to fetch platforms',
      500,
      'fetching platforms'
    );
  }
}
