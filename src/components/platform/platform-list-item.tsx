import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Platform } from '@/db/repositories/platform.repository';
import { Skeleton } from '../ui/skeleton';
import { GamesBadges } from './games-badges';

interface PlatformCardProps {
  platform: Platform;
}

export function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg truncate">{platform.name}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {platform.company || '-'}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <GamesBadges platform={platform} />
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="flex-1">
          <Link href={`/platforms/${platform.id}`}>
            View platform
            <ExternalLink />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function PlatformCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
