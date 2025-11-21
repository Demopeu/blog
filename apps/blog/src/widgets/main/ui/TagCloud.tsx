'use client';

import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';
import { Post } from '@/entities/post';

export function TagCloud({ posts }: { posts: Post[] }) {
  const pathname = usePathname();
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  // pathname에서 category 추출 (/blog/dev -> 'dev', /blog -> null)
  const currentCategory = useMemo(() => {
    const match = pathname.match(/^\/blog\/([^/]+)/);
    return match ? match[1] : null;
  }, [pathname]);

  // 현재 category의 posts만 필터링하여 태그 추출
  const tags = useMemo(() => {
    const filteredPosts = currentCategory
      ? posts.filter((post) => post.category === currentCategory)
      : posts;

    const allTags = filteredPosts.flatMap((post) => post.tags);
    return Array.from(new Set(allTags)).sort();
  }, [posts, currentCategory]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  };

  if (tags.length === 0) {
    return null;
  }

  return (
    <aside className="sticky top-4 space-y-4">
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
