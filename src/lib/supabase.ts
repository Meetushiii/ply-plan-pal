
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// These environment variables are automatically injected by Lovable when connected to Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
