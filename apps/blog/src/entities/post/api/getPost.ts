import { supabaseServer } from '@/shared/lib/create-client';
import type { Post } from '../model/types';

export async function getPost(category: string, slug: string): Promise<Post> {
  const { data, error } = await supabaseServer
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error('POST_NOT_FOUND');
  }

  const post = {
    ...data,
    description: data.description ?? '',
    tags: data.tags ?? [],
    src: data.src ?? '',
    published_at: data.published_at ?? '',
  };

  return post as Post;
}
