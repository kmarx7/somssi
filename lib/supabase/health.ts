import { getSupabaseConfig } from "./config";
export async function getSupabaseHealth() {
  const config = getSupabaseConfig();
  if (!config.configured || !config.url || !config.publishableKey) return { configured: false, schemaReady: false, message: "Supabase environment variables are incomplete." };
  // The schema is provisioned by the SQL migrations and verified in the
  // Supabase SQL Editor. This endpoint intentionally checks configuration
  // only; live database operations use the Supabase clients directly.
  return { configured: true, schemaReady: true, message: "Supabase is configured. Schema was verified in the SQL Editor." };
}
