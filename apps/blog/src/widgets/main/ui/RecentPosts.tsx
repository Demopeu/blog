'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { RecentPost } from '@/entities/post/api/getRecentPost';

export function RecentPosts({ posts }: { posts: RecentPost[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [posts.length]);

  const currentItem = posts[selectedIndex]!;

  return (
    <section>
      <h1 className="mb-5 text-pretty text-2xl font-bold">최근 게시글</h1>
      <div className="h-100 flex gap-6 md:gap-12">
        <Link
          href={`/post/${currentItem.category}/${currentItem.slug}`}
          key={selectedIndex}
          className="animate-fade-in flex flex-col gap-4 md:w-3/5"
          prefetch={false}
        >
          <div className="border-1 border-primary/10 relative aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src={currentItem.src}
              alt={currentItem.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <aside className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <span className="bg-highlight text-primary rounded-full px-3 py-1 text-sm font-medium">
                {currentItem.category}
              </span>
              {currentItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-pretty text-2xl font-bold">
              {currentItem.title}
            </h2>
            <p className="text-muted-foreground line-clamp-3">
              {currentItem.description}
            </p>
          </aside>
        </Link>

        <article className="hidden w-2/5 sm:flex sm:flex-col">
          <div className="h-100 overflow-hidden">
            <div className="flex flex-col">
              {posts.map((item, index) => (
                <Link
                  href={`/post/${item.category}/${item.slug}`}
                  key={index}
                  prefetch={false}
                  className={cn(
                    'h-25 flex shrink-0 cursor-pointer gap-3 p-4 [transition:all_0.5s_ease-in-out,border_0s]',
                    index === selectedIndex
                      ? 'bg-primary/10 relative scale-105 border-b opacity-100'
                      : 'scale-100 border-t opacity-60 first:border-t-0 hover:opacity-100'
                  )}
                >
                  <div className="border-1 border-primary/10 relative size-16 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <h3 className="truncate text-sm font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 text-xs">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
