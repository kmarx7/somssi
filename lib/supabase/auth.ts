import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./server";

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  if (user.app_metadata?.role !== "admin") redirect("/admin/login?error=forbidden");
  return user;
}
