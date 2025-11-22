import { RecentPosts } from './RecentPosts';
import { getRecentPosts } from '@/entities/post/api/getRecentPost';

export async function FetchRecentPosts() {
  const posts = await getRecentPosts();

  if (posts.length === 0) {
    return null;
  }

  return <RecentPosts posts={posts} />;
}
