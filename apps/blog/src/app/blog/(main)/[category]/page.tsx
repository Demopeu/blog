import { notFound } from 'next/navigation';
import { SsgoiTransition } from '@ssgoi/react';
import { Posts } from '@/widgets/main/ui/Posts';
import { getPosts } from '@/entities/post';
import { VALID_CATEGORIES } from '@/widgets/main';

export default async function Page({
  params,
}: {
  params: Promise<{
    category: string;
  }>;
}) {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  const posts = await getPosts(category);

  return (
    <SsgoiTransition id={`/blog/${category}`}>
      <Posts posts={posts} />
    </SsgoiTransition>
  );
}
