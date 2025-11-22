'use client';

import { use, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/entities/post';
import { TagFilterContext } from '@/entities/post';

export function Posts({ posts }: { posts: Post[] }) {
  const context = use(TagFilterContext);

  if (!context) {
    throw new Error('Posts must be used within TagFilterProvider');
  }

  const { selectedTags } = context;

  const filteredPosts = useMemo(() => {
    if (selectedTags.size === 0) {
      return posts;
    }

    return posts.filter((post) =>
      Array.from(selectedTags).every((selectedTag) =>
        post.tags.includes(selectedTag)
      )
    );
  }, [posts, selectedTags]);

  return (
    <section className="space-y-6">
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.category}/${post.slug}`}
            className="hover:bg-muted/50 -mx-4 flex gap-6 rounded-2xl p-4 transition-all"
          >
            <div className="relative h-48 w-60 shrink-0 overflow-hidden rounded-2xl">
              <Image
                src={post.src}
                alt={post.title}
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center space-y-2">
              <span className="text-muted-foreground text-sm">
                {post.category}
              </span>
              <h3 className="line-clamp-2 text-xl font-bold">{post.title}</h3>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {post.description}
              </p>
              <time className="text-muted-foreground text-sm">
                {new Date(post.published_at)
                  .toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .replace(/\. /g, '.')
                  .replace(/\.$/, '')}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
