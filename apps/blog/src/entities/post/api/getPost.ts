import { supabaseServer } from '@/shared/lib/create-client';

export type Post = {
  id: number;
  category: string;
  slug: string;
  title: string;
  description: string | null;
  tags: string[] | null;
  src: string | null;
  content_md: string;
  status: string;
  published_at: string | null;
};

export async function getPosts(category?: string): Promise<Post[]> {
  let query = supabaseServer
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return (data ?? []) as Post[];
}
