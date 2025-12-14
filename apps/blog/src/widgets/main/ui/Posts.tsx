'use client';

import { use, useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@vercel/microfrontends/next/client';
import { Post } from '@/entities/post';
import { TagFilterContext } from '@/entities/post';

export function Posts({ posts }: { posts: Post[] }) {
  const context = use(TagFilterContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    <section className="mt-10 space-y-6">
      {filteredPosts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/post/${post.category}/${post.slug}`}
          className="hover:bg-muted/50 -mx-4 flex flex-col gap-6 rounded-2xl p-4 transition-all sm:flex-row"
        >
          <div className="border-1 border-primary/10 relative aspect-video w-full overflow-hidden rounded-2xl sm:flex-1">
            <Image
              src={post.src}
              alt={post.title}
              fill
              className="object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="sm:flex-1/12 flex min-w-0 flex-1 flex-col justify-center space-y-2">
            <span className="text-muted-foreground text-sm">
              {post.category}
            </span>
            <h3 className="line-clamp-2 text-xl font-bold">{post.title}</h3>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {post.description}
            </p>
            <time className="text-muted-foreground text-sm">
              {isClient
                ? new Date(post.published_at)
                    .toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
                    .replace(/\. /g, '.')
                    .replace(/\.$/, '')
                : new Date(post.published_at).toISOString().split('T')[0]}
            </time>
          </div>
        </Link>
      ))}
    </section>
  );
}
