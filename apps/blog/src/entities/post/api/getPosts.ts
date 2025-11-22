import { supabaseServer } from '@/shared/lib/create-client';
import type { Post } from '../model/types';

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
