"use server";
import { redirect } from "next/navigation";
import { BookingServiceError, updateBookingStatus } from "@/lib/mock-bookings";
import { checkInSupabaseBooking, completeSupabaseBooking } from "@/lib/supabase/admin";
const isUuid = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
export async function checkInBooking(formData: FormData) {
  const id = String(formData.get("bookingId") ?? "");
  try { if (isUuid(id)) await checkInSupabaseBooking(id); else updateBookingStatus(id, "CHECKED_IN"); } catch (error) { if (error instanceof BookingServiceError) return; }
  redirect("/admin/bookings");
}
export async function completeBooking(formData: FormData) {
  const id = String(formData.get("bookingId") ?? "");
  try { if (isUuid(id)) await completeSupabaseBooking(id); else updateBookingStatus(id, "COMPLETED"); } catch (error) { if (error instanceof BookingServiceError) return; }
  redirect("/admin/bookings");
}
