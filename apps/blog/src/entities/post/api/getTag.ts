import { supabaseServer } from '@/shared/lib/create-client';

export type Tags = {
  tags: string[];
};

export async function getTags(category?: string): Promise<string[]> {
  let query = supabaseServer
    .from('posts')
    .select('tags')
    .eq('status', 'published');

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as Tags[];

  const allTags = rows.flatMap((row) => row.tags ?? []);
  const unique = Array.from(new Set(allTags));

  unique.sort((a, b) => a.localeCompare(b, 'ko'));

  return unique;
}
