"use server";
import { redirect } from "next/navigation";
import { BookingServiceError } from "@/lib/mock-bookings";
import { createSupabaseConfirmedBooking } from "@/lib/supabase/bookings";
import type { Locale } from "@/lib/i18n/dictionaries";
export type BookingActionState = { error?: string };
export async function submitBooking(_prev: BookingActionState, formData: FormData): Promise<BookingActionState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();
  const firstName = get("firstName"), lastName = get("lastName"), email = get("email"), country = get("country");
  const language = get("language") as Locale; const experienceSlug = get("experienceSlug"); const sessionId = get("sessionId"); const guestCount = Number(get("guestCount"));
  const optionCodes = get("optionCodes").split(",").filter(Boolean);
  if (!firstName || !lastName || !email || !country || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !["en", "ko"].includes(language) || formData.get("terms") !== "on") return { error: language === "ko" ? "필수 정보를 모두 입력하고 약관에 동의해 주세요." : "Please complete the required fields and accept the terms." };
  let booking;
  try { booking = await createSupabaseConfirmedBooking({ experienceSlug, sessionId, guestCount, optionCodes, firstName, lastName, email, country, phone: get("phone") || undefined, language }); }
  catch (error) { if (error instanceof BookingServiceError) return { error: error.message }; return { error: language === "ko" ? "예약을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요." : "We couldn't complete your booking. Please try again." }; }
  redirect(`/booking/complete/${booking.id}`);
}
