import { SsgoiTransition } from '@ssgoi/react';
import { Posts } from '@/widgets/main/ui/Posts';
import { getPosts } from '@/entities/post';

export const revalidate = 600;

export default async function Page() {
  const posts = await getPosts();

  return (
    <SsgoiTransition id="/blog">
      <Posts posts={posts} />
    </SsgoiTransition>
  );
}
