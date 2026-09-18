"use server";
import { redirect } from "next/navigation";
import { getBooking } from "@/lib/mock-bookings";
import { createReview } from "@/lib/mock-reviews";
export async function submitReview(formData: FormData) {
  const bookingId = String(formData.get("bookingId") ?? ""); const booking = getBooking(bookingId); const rating = Number(formData.get("rating")); const nps = Number(formData.get("nps")); const comment = String(formData.get("comment") ?? "").trim();
  if (!booking || booking.status !== "COMPLETED" || rating < 1 || rating > 5 || nps < 0 || nps > 10) return;
  createReview({ bookingId, rating, nps, comment }); redirect(`/booking/complete/${bookingId}`);
}
