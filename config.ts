// NEXT_PUBLIC_* values are inlined at build time, so this is safe in both server and client code.
export const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const isDev = process.env.NODE_ENV === 'development';
