import { getSupabaseConfig } from "./config";
import { createClient } from "@supabase/supabase-js";
export async function getSupabaseHealth() {
  const config = getSupabaseConfig();
  if (!config.configured || !config.url || !config.publishableKey) return { configured: false, schemaReady: false, message: "Supabase environment variables are incomplete." };
  try {
    // Health checks only need to verify the public schema. Keep the service
    // role key out of this path; it is reserved for trusted server actions.
    const supabase = createClient(config.url, config.publishableKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { error } = await supabase.from("experiences").select("id").limit(1);
    if (error) {
      console.error("Supabase health query failed", { code: error.code, message: error.message });
      return { configured: true, schemaReady: false, message: `Supabase schema check failed (${error.code || "QUERY_FAILED"}).` };
    }
    return { configured: true, schemaReady: true, message: "Supabase is connected." };
  } catch { return { configured: true, schemaReady: false, message: "Supabase connection could not be verified." }; }
}
