// 'use client';

// import { Search, X } from 'lucide-react';
// import { useState, useMemo } from 'react';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Platform } from '@/db/entities/platform.entity';

// interface PlatformSearchProps {
//   platforms: Platform[];
//   onFilteredPlatforms: (filtered: Platform[]) => void;
// }

// export function PlatformSearch({
//   platforms,
//   onFilteredPlatforms,
// }: PlatformSearchProps) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

//   // Get unique companies for filter
//   const companies = useMemo(() => {
//     const uniqueCompanies = [
//       ...new Set(platforms.map(p => p.company).filter(Boolean)),
//     ];
//     return uniqueCompanies.sort();
//   }, [platforms]);

//   // Filter platforms based on search term and company
//   const filteredPlatforms = useMemo(() => {
//     return platforms.filter(platform => {
//       const matchesSearch =
//         platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         platform.company?.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCompany =
//         !selectedCompany || platform.company === selectedCompany;
//       return matchesSearch && matchesCompany;
//     });
//   }, [platforms, searchTerm, selectedCompany]);

//   // Update parent component when filters change
//   useMemo(() => {
//     onFilteredPlatforms(filteredPlatforms);
//   }, [filteredPlatforms, onFilteredPlatforms]);

//   const clearFilters = () => {
//     setSearchTerm('');
//     setSelectedCompany(null);
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex gap-2">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//           <Input
//             placeholder="Search platforms..."
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//         </div>
//         <Button variant="outline" onClick={clearFilters}>
//           <X className="h-4 w-4" />
//         </Button>
//       </div>

//       {companies.length > 0 && (
//         <div className="flex flex-wrap gap-2">
//           <Badge
//             variant={selectedCompany === null ? 'default' : 'outline'}
//             className="cursor-pointer"
//             onClick={() => setSelectedCompany(null)}
//           >
//             All
//           </Badge>
//           {companies.map(company => (
//             <Badge
//               key={company}
//               variant={selectedCompany === company ? 'default' : 'outline'}
//               className="cursor-pointer"
//               onClick={() => setSelectedCompany(company)}
//             >
//               {company}
//             </Badge>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
