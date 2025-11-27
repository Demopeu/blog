import { notFound } from 'next/navigation';
import { getPost } from '@/entities/post';
import { MainWrapper } from '@/shared/ui/layout';
import { SsgoiTransition } from '@ssgoi/react';
import { PostSection } from '@/widgets/post';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function PostPage({ params }: PageProps) {
  const { category, slug } = await params;

  const post = await getPost(category, slug).catch(() => {
    notFound();
  });

  return (
    <SsgoiTransition id={`/post/${slug}`}>
      <MainWrapper className="mb-bmt bg-background">
        <PostSection post={post} />
      </MainWrapper>
    </SsgoiTransition>
  );
}
