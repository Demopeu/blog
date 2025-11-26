'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function BackNav() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="text-sm font-medium">Back to Posts</span>
    </button>
  );
}
