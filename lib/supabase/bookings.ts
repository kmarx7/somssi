import { createSupabaseAdminClient } from "./server";
import { getPaymentProvider } from "../payment";
import { BookingServiceError, type BookingRecord } from "../mock-bookings";
import type { Locale } from "../i18n/dictionaries";

type DbOption = { id: string; code: string; price: number; pricing_type: "PER_PERSON" | "PER_BOOKING" };

function sessionStartFromPreviewId(id: string) {
  const match = /^(?:gy|kn|mh)-(\d{8})-(\d{4})$/.exec(id);
  if (!match) return null;
  const [, date, time] = match;
  return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}T${time.slice(0, 2)}:${time.slice(2)}:00+09:00`;
}

export async function createSupabaseConfirmedBooking(input: {
  experienceSlug: string; sessionId: string; guestCount: number; optionCodes: string[];
  firstName: string; lastName: string; email: string; country: string; phone?: string; language: Locale;
}) {
  const supabase = createSupabaseAdminClient();
  const { data: experience, error: experienceError } = await supabase.from("experiences").select("id,slug,base_price,min_guests,max_guests").eq("slug", input.experienceSlug).single();
  if (experienceError || !experience) throw new BookingServiceError("INVALID_BOOKING", "This experience is no longer available.");
  if (!Number.isInteger(input.guestCount) || input.guestCount < experience.min_guests || input.guestCount > experience.max_guests) throw new BookingServiceError("INVALID_BOOKING", "Please choose a valid guest count.");

  let sessionQuery = supabase.from("sessions").select("id,experience_id,start_at,capacity,booked_count,status,venues(name)").eq("experience_id", experience.id);
  const previewStart = sessionStartFromPreviewId(input.sessionId);
  if (previewStart) sessionQuery = sessionQuery.eq("start_at", previewStart);
  else sessionQuery = sessionQuery.eq("id", input.sessionId);
  const { data: session, error: sessionError } = await sessionQuery.maybeSingle();
  if (sessionError || !session) throw new BookingServiceError("INVALID_BOOKING", "This session is no longer available.");

  const uniqueCodes = [...new Set(input.optionCodes)];
  const { data: options, error: optionsError } = uniqueCodes.length ? await supabase.from("options").select("id,code,price,pricing_type").in("code", uniqueCodes).eq("active", true) : { data: [], error: null };
  if (optionsError || (options?.length ?? 0) !== uniqueCodes.length) throw new BookingServiceError("INVALID_BOOKING", "One or more options are unavailable.");
  const selectedOptions = (options ?? []) as DbOption[];
  const baseAmount = experience.base_price * input.guestCount;
  const optionsAmount = selectedOptions.reduce((total, option) => total + option.price * (option.pricing_type === "PER_PERSON" ? input.guestCount : 1), 0);
  const totalAmount = baseAmount + optionsAmount;
  const provider = getPaymentProvider();
  const paymentIntent = await provider.createPayment({ amount: totalAmount, currency: "KRW", bookingReference: session.id });
  const paid = await provider.confirmPayment(paymentIntent.id);

  const { data: booking, error: bookingError } = await supabase.from("bookings").insert({ session_id: session.id, guest_count: input.guestCount, language: input.language, base_amount: baseAmount, options_amount: optionsAmount, total_amount: totalAmount, status: "PENDING", payment_status: "PENDING", customer_name: `${input.firstName} ${input.lastName}`, customer_email: input.email, customer_country: input.country, customer_phone: input.phone ?? null }).select("*").single();
  if (bookingError || !booking) throw new BookingServiceError("PAYMENT_FAILED", "Payment could not be completed. Please try again.");
  const { data: reserved, error: reserveError } = await supabase.rpc("reserve_session", { p_session_id: session.id, p_guest_count: input.guestCount });
  if (reserveError || reserved !== true) { await supabase.from("bookings").delete().eq("id", booking.id); throw new BookingServiceError("SESSION_FULL", "This session no longer has enough places."); }
  await supabase.from("booking_options").insert(selectedOptions.map((option) => ({ booking_id: booking.id, option_id: option.id, quantity: option.pricing_type === "PER_PERSON" ? input.guestCount : 1, unit_price: option.price })));
  await supabase.from("payments").insert({ booking_id: booking.id, provider: paid.provider, provider_payment_id: paid.id, amount: paid.amount, status: "PAID" });
  const { data: confirmed, error: confirmError } = await supabase.from("bookings").update({ status: "CONFIRMED", payment_status: "PAID" }).eq("id", booking.id).select("*").single();
  if (confirmError || !confirmed) throw new BookingServiceError("PAYMENT_FAILED", "Payment could not be completed. Please try again.");
  return { ...input, id: confirmed.id, bookingNumber: confirmed.booking_number, customerName: confirmed.customer_name, baseAmount, optionsAmount, totalAmount, paymentId: paid.id, paymentStatus: "PAID" as const, status: "CONFIRMED" as const, createdAt: confirmed.created_at, optionCodes: uniqueCodes } satisfies BookingRecord;
}
