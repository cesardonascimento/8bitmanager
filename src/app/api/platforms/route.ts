import { PlatformRepository } from '@/db/repositories/platform.repository';
import { respondError, respondSuccess } from '@/lib/api/server';

export async function GET() {
  try {
    const platforms = await PlatformRepository.list();
    return respondSuccess(platforms);
  } catch (error) {
    return respondError(error);
  }
}
