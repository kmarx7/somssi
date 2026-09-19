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
    if (error) return { configured: true, schemaReady: false, message: "Supabase is reachable, but the SOMSSI schema is not ready." };
    return { configured: true, schemaReady: true, message: "Supabase is connected." };
  } catch { return { configured: true, schemaReady: false, message: "Supabase connection could not be verified." }; }
}
