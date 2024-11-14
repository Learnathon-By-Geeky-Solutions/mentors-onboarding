import { Loader2 } from 'lucide-react';

export default function AdminLoading() {
  return (
    <div className="flex-1 flex items-center justify-center bg-white rounded-lg p-8">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium text-gray-600">Loading...</p>
      </div>
    </div>
  );
}