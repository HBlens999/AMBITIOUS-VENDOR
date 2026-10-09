import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.trim() !== '' &&
  supabaseAnonKey.trim() !== '' &&
  !supabaseUrl.includes('YOUR-PROJECT')
);

export let supabase: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
  }
}

export interface SupabaseConnectionStatus {
  isConfigured: boolean;
  url: string | null;
  mode: 'supabase_connected' | 'local_managed_store';
  message: string;
}

export function getSupabaseStatus(): SupabaseConnectionStatus {
  if (isSupabaseConfigured && supabase) {
    return {
      isConfigured: true,
      url: supabaseUrl,
      mode: 'supabase_connected',
      message: 'Connected to Supabase PostgreSQL & Auth',
    };
  }
  return {
    isConfigured: false,
    url: null,
    mode: 'local_managed_store',
    message: 'Operating in Local Managed Store mode (Add VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY in .env to connect live Supabase)',
  };
}
