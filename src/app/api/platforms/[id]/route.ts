import { PlatformRepository } from '@/db/repositories/platform.repository';
import {
  respondError,
  respondNotFound,
  respondSuccess,
} from '@/lib/api/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const platform = await PlatformRepository.fetch(id);

    if (!platform) {
      return respondNotFound();
    }

    return respondSuccess(platform);
  } catch (error) {
    return respondError(error);
  }
}
