import { notFound } from 'next/navigation';
import { getPost } from '@/entities/post';
import { MainWrapper } from '@/shared/ui/layout';
import { SsgoiTransition } from '@ssgoi/react';
import { PostSection } from '@/widgets/post';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, slug } = await params;

  try {
    const post = await getPost(category, slug);

    return {
      title: post.title,
      description: post.description,
      keywords: post.tags,
      authors: [{ name: 'Demopeu(김동현)', url: 'https://github.com/Demopeu' }],
      openGraph: {
        type: 'article',
        url: `https://demopeu.vercel.app/blog/post/${category}/${slug}`,
        title: post.title,
        description: post.description,
        siteName: '井 블로그',
        locale: 'ko_KR',
        images: [
          {
            url: post.src,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        publishedTime: post.published_at,
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: [post.src],
      },
      alternates: {
        canonical: `https://demopeu.vercel.app/blog/post/${category}/${slug}`,
      },
    };
  } catch {
    return {
      title: '포스트를 찾을 수 없습니다',
      description: '요청하신 포스트가 존재하지 않습니다.',
    };
  }
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
