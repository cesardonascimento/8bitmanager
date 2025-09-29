import { Loader2 } from 'lucide-react';

export default function PageLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
  );
}
