import { NextResponse } from "next/server";
import { getSupabaseHealth } from "@/lib/supabase/health";
export async function GET() { const health = await getSupabaseHealth(); return NextResponse.json(health, { status: health.schemaReady ? 200 : 503 }); }
