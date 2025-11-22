import { getPosts } from '@/entities/post';
import { TagCloud } from './TagCloud';

export async function FetchTagCloud() {
  try {
    const posts = await getPosts();

    if (posts.length === 0) {
      return null;
    }

    return <TagCloud posts={posts} />;
  } catch (error) {
    console.error('태그 클라우드를 불러올 수 없습니다:', error);
    return null;
  }
}
