function cleanEnvValue(value: string | undefined) {
  return value?.trim().replace(/^['\"]|['\"]$/g, "");
}

export function getSupabaseConfig() {
  const url = cleanEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const publishableKey = cleanEnvValue(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const serviceRoleKey = cleanEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY);
  return { url, publishableKey, serviceRoleKey, configured: Boolean(url && publishableKey) };
}

export function requireSupabaseConfig() {
  const config = getSupabaseConfig();
  if (!config.url || !config.publishableKey) throw new Error("Supabase public environment variables are missing.");
  return config as { url: string; publishableKey: string; serviceRoleKey?: string; configured: true };
}
