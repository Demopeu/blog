import { SsgoiTransition } from '@ssgoi/react';
import { Posts } from '@/widgets/main/ui/Posts';
import { getPosts } from '@/entities/post';

export default async function Page() {
  const posts = await getPosts('dev');
  return (
    <SsgoiTransition id="/dev">
      <Posts posts={posts} />
    </SsgoiTransition>
  );
}
