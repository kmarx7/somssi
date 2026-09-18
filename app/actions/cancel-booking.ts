"use server";
import { redirect } from "next/navigation";
import { BookingServiceError, cancelBooking } from "@/lib/mock-bookings";
export async function submitCancellation(formData: FormData) {
  const id = String(formData.get("bookingId") ?? "");
  try { cancelBooking(id, String(formData.get("reason") ?? "").trim()); } catch (error) { if (error instanceof BookingServiceError) return; }
  redirect(`/booking/complete/${id}`);
}
