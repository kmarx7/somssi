import { randomUUID } from "node:crypto";
import { findExperience, getExperienceOptions } from "./catalog";
import { calculatePreviewPrice } from "./pricing";
import { canFitGuests, findSession } from "./sessions";
import { getPaymentProvider } from "./payment";
import type { Locale } from "./i18n/dictionaries";
import { issueCertificate } from "./mock-certificates";

export type BookingRecord = {
  id: string; bookingNumber: string; experienceSlug: string; sessionId: string; guestCount: number; optionCodes: string[];
  firstName: string; lastName: string; customerName: string; email: string; country: string; phone?: string; language: Locale;
  baseAmount: number; optionsAmount: number; totalAmount: number; paymentId: string; paymentStatus: "PAID"; status: "CONFIRMED" | "CHECKED_IN" | "COMPLETED"; createdAt: string; checkedInAt?: string; completedAt?: string; certificateId?: string;
};
export class BookingServiceError extends Error { constructor(public readonly code: "INVALID_BOOKING" | "SESSION_FULL" | "PAYMENT_FAILED" | "INVALID_STATUS", message: string) { super(message); } }
const bookings = new Map<string, BookingRecord>();
const reservations = new Map<string, number>();

export async function createConfirmedBooking(input: { experienceSlug: string; sessionId: string; guestCount: number; optionCodes: string[]; firstName: string; lastName: string; email: string; country: string; phone?: string; language: Locale }) {
  const experience = findExperience(input.experienceSlug); const session = findSession(input.sessionId);
  if (!experience || !session || session.experienceSlug !== input.experienceSlug || !Number.isInteger(input.guestCount) || input.guestCount < experience.minGuests || input.guestCount > experience.maxGuests) throw new BookingServiceError("INVALID_BOOKING", "This booking could not be validated.");
  const options = getExperienceOptions(input.experienceSlug).filter((option) => input.optionCodes.includes(option.code));
  if (options.length !== new Set(input.optionCodes).size) throw new BookingServiceError("INVALID_BOOKING", "One or more options are unavailable.");
  if (!canFitGuests({ ...session, bookedCount: session.bookedCount + (reservations.get(session.id) ?? 0) }, input.guestCount)) throw new BookingServiceError("SESSION_FULL", "This session no longer has enough places.");
  reservations.set(session.id, (reservations.get(session.id) ?? 0) + input.guestCount);
  try {
    const amount = calculatePreviewPrice(experience, options, input.guestCount, new Set(input.optionCodes));
    const provider = getPaymentProvider(); const intent = await provider.createPayment({ amount: amount.totalAmount, currency: "KRW", bookingReference: session.id });
    const paid = await provider.confirmPayment(intent.id);
    const id = randomUUID(); const record: BookingRecord = { id, bookingNumber: `SOMSSI-${new Date().getFullYear()}-${id.slice(0, 6).toUpperCase()}`, ...input, customerName: `${input.firstName} ${input.lastName}`, baseAmount: amount.baseAmount, optionsAmount: amount.optionsAmount, totalAmount: amount.totalAmount, paymentId: paid.id, paymentStatus: "PAID", status: "CONFIRMED", createdAt: new Date().toISOString() };
    bookings.set(id, record); return record;
  } catch { reservations.set(session.id, Math.max(0, (reservations.get(session.id) ?? 0) - input.guestCount)); throw new BookingServiceError("PAYMENT_FAILED", "Payment could not be completed. Please try again."); }
}
export function getBooking(id: string) { return bookings.get(id) ?? null; }
export function listBookings() { return [...bookings.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)); }
export function updateBookingStatus(id: string, next: "CHECKED_IN" | "COMPLETED") {
  const booking = bookings.get(id); if (!booking) throw new BookingServiceError("INVALID_STATUS", "Booking not found.");
  if (next === "CHECKED_IN" && booking.status !== "CONFIRMED") throw new BookingServiceError("INVALID_STATUS", "Only confirmed bookings can be checked in.");
  if (next === "COMPLETED" && booking.status !== "CHECKED_IN") throw new BookingServiceError("INVALID_STATUS", "Check in the guest before completing the experience.");
  const updated = { ...booking, status: next, ...(next === "CHECKED_IN" ? { checkedInAt: new Date().toISOString() } : { completedAt: new Date().toISOString() }) };
  if (next === "COMPLETED") updated.certificateId = issueCertificate(updated).id;
  bookings.set(id, updated); return updated;
}
export function getReservedCount(sessionId: string) { return reservations.get(sessionId) ?? 0; }
export function getMockBookingCount() { return bookings.size; }
