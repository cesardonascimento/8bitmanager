// 'use client';

// import { useState, useMemo } from 'react';
// import { PlatformCard } from './platform-card';
// import { PlatformSearch } from './platform-search';
// import { PlatformSort } from './platform-sort';
// import { Platform } from '@/db/entities/platform.entity';

// interface PlatformListProps {
//   platforms: Platform[];
// }

// type SortField = 'name' | 'company' | 'releasedCount' | 'ownedCount';
// type SortDirection = 'asc' | 'desc';

// export function PlatformList({ platforms }: PlatformListProps) {
//   const [filteredPlatforms, setFilteredPlatforms] =
//     useState<Platform[]>(platforms);
//   const [sortField, setSortField] = useState<SortField>('name');
//   const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

//   // Sort the filtered platforms
//   const sortedPlatforms = useMemo(() => {
//     return [...filteredPlatforms].sort((a, b) => {
//       let aValue: string | number;
//       let bValue: string | number;

//       switch (sortField) {
//         case 'name':
//           aValue = a.name.toLowerCase();
//           bValue = b.name.toLowerCase();
//           break;
//         case 'company':
//           aValue = (a.company || '').toLowerCase();
//           bValue = (b.company || '').toLowerCase();
//           break;
//         case 'releasedCount':
//           aValue = a.releasedGames.length;
//           bValue = b.releasedGames.length;
//           break;
//         case 'ownedCount':
//           aValue = a.ownedGames.length;
//           bValue = b.ownedGames.length;
//           break;
//         default:
//           aValue = a.name.toLowerCase();
//           bValue = b.name.toLowerCase();
//       }

//       if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
//       if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
//       return 0;
//     });
//   }, [filteredPlatforms, sortField, sortDirection]);

//   const handleSort = (field: SortField, direction: SortDirection) => {
//     setSortField(field);
//     setSortDirection(direction);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Search and Filter Controls */}
//       <div className="space-y-4">
//         <PlatformSearch
//           platforms={platforms}
//           onFilteredPlatforms={setFilteredPlatforms}
//         />
//         <PlatformSort onSort={handleSort} />
//       </div>

//       {/* Results Count */}
//       <div className="text-sm text-muted-foreground">
//         Showing {sortedPlatforms.length} of {platforms.length} platforms
//       </div>

//       {/* Platform Grid */}
//       {sortedPlatforms.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {sortedPlatforms.map(platform => (
//             <PlatformCard key={platform.id} platform={platform} />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12">
//           <p className="text-muted-foreground">
//             No platforms found matching your criteria.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
