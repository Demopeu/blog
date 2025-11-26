import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPost } from '@/entities/post';
import { renderMarkdown } from '@/shared/lib/render-markdown';
import { MainWrapper } from '@/shared/ui/layout';
import { SsgoiTransition } from '@ssgoi/react';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function PostPage({ params }: PageProps) {
  const { category, slug } = await params;

  let post;
  try {
    post = await getPost(category, slug);
  } catch (error) {
    if (error instanceof Error && error.message === 'POST_NOT_FOUND') {
      notFound();
    }
    throw error;
  }

  const contentHtml = await renderMarkdown(post.content_md);

  return (
    <SsgoiTransition id={`/blog/post/${category}/${slug}`}>
      <MainWrapper className="mb-bmt">
        <article className="mx-auto max-w-4xl space-y-8 py-8">
          {/* 배너 이미지 */}
          <div className="relative aspect-[5/2] w-full overflow-hidden rounded-2xl">
            <Image
              src={post.src}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* 타이틀 */}
          <h1 className="text-5xl font-bold">{post.title}</h1>

          {/* 카테고리 & 태그 */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-highlight text-highlight-foreground rounded-full px-3 py-1 text-sm font-medium">
              {post.category}
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 마크다운 콘텐츠 */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
      </MainWrapper>
    </SsgoiTransition>
  );
}
