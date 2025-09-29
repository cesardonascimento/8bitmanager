// 'use client';

// import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Platform } from '@/db/entities/platform.entity';

// type SortField = 'name' | 'company' | 'releasedCount' | 'ownedCount';
// type SortDirection = 'asc' | 'desc';

// interface PlatformSortProps {
//   onSort: (field: SortField, direction: SortDirection) => void;
// }

// export function PlatformSort({ onSort }: PlatformSortProps) {
//   const [currentSort, setCurrentSort] = useState<{
//     field: SortField;
//     direction: SortDirection;
//   }>({ field: 'name', direction: 'asc' });

//   const handleSort = (field: SortField) => {
//     const newDirection =
//       currentSort.field === field && currentSort.direction === 'asc'
//         ? 'desc'
//         : 'asc';

//     setCurrentSort({ field, direction: newDirection });
//     onSort(field, newDirection);
//   };

//   const getSortIcon = (field: SortField) => {
//     if (currentSort.field !== field) {
//       return <ArrowUpDown className="h-4 w-4" />;
//     }
//     return currentSort.direction === 'asc' ? (
//       <ArrowUp className="h-4 w-4" />
//     ) : (
//       <ArrowDown className="h-4 w-4" />
//     );
//   };

//   return (
//     <div className="flex gap-2 flex-wrap">
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => handleSort('name')}
//         className="flex items-center gap-2"
//       >
//         Name {getSortIcon('name')}
//       </Button>
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => handleSort('company')}
//         className="flex items-center gap-2"
//       >
//         Company {getSortIcon('company')}
//       </Button>
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => handleSort('releasedCount')}
//         className="flex items-center gap-2"
//       >
//         Released {getSortIcon('releasedCount')}
//       </Button>
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => handleSort('ownedCount')}
//         className="flex items-center gap-2"
//       >
//         Owned {getSortIcon('ownedCount')}
//       </Button>
//     </div>
//   );
// }
