'use client';

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Platform } from '@/db/repositories/platform.repository';
import { Skeleton } from '../ui/skeleton';

interface PlatformCardProps {
  platform: Platform;
}

export function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg truncate">{platform.name}</CardTitle>
        {platform.company && (
          <p className="text-sm text-muted-foreground">{platform.company}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Badge variant="secondary">{platform.games.length} Released</Badge>
            <Badge variant="secondary">{platform.games.length} Owned</Badge>
          </div>
          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link href={`/platforms/${platform.id}`}>
                View platform
                <ExternalLink />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
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
