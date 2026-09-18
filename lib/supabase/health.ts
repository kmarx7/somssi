import { getSupabaseConfig } from "./config";
import { createSupabaseAdminClient } from "./server";
export async function getSupabaseHealth() {
  const config = getSupabaseConfig();
  if (!config.configured || !config.serviceRoleKey) return { configured: false, schemaReady: false, message: "Supabase environment variables are incomplete." };
  try {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("experiences").select("id").limit(1);
    if (error) return { configured: true, schemaReady: false, message: "Supabase is reachable, but the SOMSSI schema is not ready." };
    return { configured: true, schemaReady: true, message: "Supabase is connected." };
  } catch { return { configured: true, schemaReady: false, message: "Supabase connection could not be verified." }; }
}
