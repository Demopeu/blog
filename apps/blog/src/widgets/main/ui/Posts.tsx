import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/entities/post';

export function Posts({ posts }: { posts: Post[] }) {
  return (
    <section className="space-y-6">
      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/post/${post.slug}`}
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
