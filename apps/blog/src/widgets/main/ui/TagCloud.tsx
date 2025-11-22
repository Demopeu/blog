'use client';

import { useMemo, use } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';
import { Post } from '@/entities/post';
import { TagFilterContext } from '@/entities/post';

export function TagCloud({ posts }: { posts: Post[] }) {
  const pathname = usePathname();
  const context = use(TagFilterContext);

  if (!context) {
    throw new Error('TagCloud must be used within TagFilterProvider');
  }

  const { selectedTags, toggleTag } = context;

  const currentCategory = useMemo(() => {
    const match = pathname.match(/^\/blog\/([^/]+)/);
    return match ? match[1] : null;
  }, [pathname]);

  const tags = useMemo(() => {
    const filteredPosts = currentCategory
      ? posts.filter((post) => post.category === currentCategory)
      : posts;

    const allTags = filteredPosts.flatMap((post) => post.tags);
    return Array.from(new Set(allTags)).sort();
  }, [posts, currentCategory]);

  if (tags.length === 0) {
    return null;
  }

  return (
    <aside className="sticky top-4 mt-4 space-y-4">
      <h2 className="text-xl font-bold">태그</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.has(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-all',
                'border border-transparent',
                isSelected
                  ? 'bg-highlight text-highlight-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              )}
            >
              <span className="text-pretty">{tag}</span>
              {isSelected && <X className="size-3" />}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
