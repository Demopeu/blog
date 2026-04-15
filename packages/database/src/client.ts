import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

export function createPublicClient(url: string, anonKey: string) {
  return createSupabaseClient<Database>(url, anonKey);
}
