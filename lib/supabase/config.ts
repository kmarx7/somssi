export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return { url, publishableKey, serviceRoleKey, configured: Boolean(url && publishableKey) };
}

export function requireSupabaseConfig() {
  const config = getSupabaseConfig();
  if (!config.url || !config.publishableKey) throw new Error("Supabase public environment variables are missing.");
  return config as { url: string; publishableKey: string; serviceRoleKey?: string; configured: true };
}
