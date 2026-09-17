"use server";
import { redirect } from "next/navigation";
import { BookingServiceError, updateBookingStatus } from "@/lib/mock-bookings";
export async function checkInBooking(formData: FormData) {
  const id = String(formData.get("bookingId") ?? "");
  try { updateBookingStatus(id, "CHECKED_IN"); } catch (error) { if (error instanceof BookingServiceError) return; }
  redirect("/admin/bookings");
}
export async function completeBooking(formData: FormData) {
  const id = String(formData.get("bookingId") ?? "");
  try { updateBookingStatus(id, "COMPLETED"); } catch (error) { if (error instanceof BookingServiceError) return; }
  redirect("/admin/bookings");
}
