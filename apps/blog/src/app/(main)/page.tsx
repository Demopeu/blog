import { SsgoiTransition } from '@ssgoi/react';
import { Posts } from '@/widgets/main/ui/Posts';
import { getPosts } from '@/entities/post';

export default async function Page() {
  const posts = await getPosts();

  return (
    <SsgoiTransition id="/">
      <Posts posts={posts} />
    </SsgoiTransition>
  );
}
