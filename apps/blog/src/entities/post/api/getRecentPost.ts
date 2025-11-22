import { supabaseServer } from '@/shared/lib/create-client';

export type RecentPost = {
  slug: string;
  category: string;
  title: string;
  description: string | null;
  tags: string[];
  src: string;
};

export async function getRecentPosts(): Promise<RecentPost[]> {
  const query = supabaseServer
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(4);

  const { data, error } = await query;

  if (error) {
    console.error('최근 게시글을 불러올 수 없습니다:', error);
    return [];
  }

  return (data ?? []) as RecentPost[];
}
