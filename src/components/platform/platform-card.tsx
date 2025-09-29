// 'use client';

// import { Heart, ExternalLink } from 'lucide-react';
// import Link from 'next/link';
// import { useState } from 'react';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Platform } from '@/db/repositories/platform.repository';

// interface PlatformCardProps {
//   platform: Platform;
// }

// export function PlatformCard({ platform }: PlatformCardProps) {
//   const [isFavorite, setIsFavorite] = useState(false);

//   const handleToggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//     // You could add API call here to save favorite state
//   };

//   return (
//     <Card className="hover:shadow-md transition-shadow">
//       <CardHeader>
//         <div className="flex justify-between items-start">
//           <div>
//             <CardTitle className="text-lg">{platform.name}</CardTitle>
//             {platform.company && (
//               <p className="text-sm text-muted-foreground">
//                 {platform.company}
//               </p>
//             )}
//           </div>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={handleToggleFavorite}
//             className={isFavorite ? 'text-red-500' : 'text-gray-400'}
//           >
//             <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="flex gap-2 mb-4">
//           <Badge variant="secondary">
//             {platform.releasedGames.length} Released
//           </Badge>
//           <Badge variant="outline">{platform.ownedGames.length} Owned</Badge>
//         </div>
//         <div className="flex gap-2">
//           <Button asChild className="flex-1">
//             <Link href={`/platforms/${platform.id}`}>
//               View Details
//               <ExternalLink className="ml-2 h-4 w-4" />
//             </Link>
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
