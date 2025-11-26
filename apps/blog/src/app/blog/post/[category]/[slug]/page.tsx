import { notFound } from 'next/navigation';
import { getPost } from '@/entities/post';
import { renderMarkdown } from '@/shared/lib/render-markdown';
import { MainWrapper } from '@/shared/ui/layout';
import { SsgoiTransition } from '@ssgoi/react';
import { BackNav, PostHeader, PostMeta, PostContent } from '@/widgets/post';

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
    <SsgoiTransition id={`/post/${slug}`}>
      <MainWrapper className="mb-bmt bg-background">
        <div className="mx-auto max-w-4xl py-8">
          <BackNav />
          <article className="space-y-8">
            <PostHeader src={post.src} title={post.title} />
            <PostMeta category={post.category} tags={post.tags} />
            <PostContent contentHtml={contentHtml} />
          </article>
        </div>
      </MainWrapper>
    </SsgoiTransition>
  );
}
