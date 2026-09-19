import { createSupabaseAdminClient } from "./server";
import { BookingServiceError } from "../mock-bookings";

export type AdminBooking = {
  id: string; bookingNumber: string; customerName: string; customerEmail: string;
  guestCount: number; status: string; totalAmount: number; experienceSlug: string;
  experienceTitle: { en: string; ko: string }; startsAt: string; venue: string;
};

export async function listSupabaseBookings(): Promise<AdminBooking[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.from("bookings").select("id,booking_number,customer_name,customer_email,guest_count,status,total_amount,sessions(start_at,venues(name),experiences(slug,title_ko,title_en))").order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []).map((row) => {
    const session = Array.isArray(row.sessions) ? row.sessions[0] : row.sessions;
    const venue = session?.venues && (Array.isArray(session.venues) ? session.venues[0] : session.venues);
    const experience = session?.experiences && (Array.isArray(session.experiences) ? session.experiences[0] : session.experiences);
    return { id: row.id, bookingNumber: row.booking_number, customerName: row.customer_name, customerEmail: row.customer_email, guestCount: row.guest_count, status: row.status, totalAmount: row.total_amount, experienceSlug: experience?.slug ?? "", experienceTitle: { en: experience?.title_en ?? "", ko: experience?.title_ko ?? "" }, startsAt: session?.start_at ?? "", venue: venue?.name ?? "" };
  });
}

export async function checkInSupabaseBooking(id: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.from("bookings").update({ status: "CHECKED_IN" }).eq("id", id).eq("status", "CONFIRMED").select("id").maybeSingle();
  if (error || !data) throw new BookingServiceError("INVALID_STATUS", "Only confirmed bookings can be checked in.");
}

export async function completeSupabaseBooking(id: string) {
  const supabase = createSupabaseAdminClient();
  const { data: booking, error } = await supabase.from("bookings").update({ status: "COMPLETED" }).eq("id", id).eq("status", "CHECKED_IN").select("id,booking_number,customer_name,session_id").maybeSingle();
  if (error || !booking) throw new BookingServiceError("INVALID_STATUS", "Check in the guest before completing the experience.");
  const { data: existing } = await supabase.from("certificates").select("id").eq("booking_id", id).maybeSingle();
  if (!existing) {
    const code = booking.booking_number.match(/SOMSSI-[^-]+/)?.[0] ?? "SOMSSI-EX";
    await supabase.from("certificates").insert({ booking_id: id, certificate_number: `${code}-${id.slice(0, 8).toUpperCase()}`, issued_at: new Date().toISOString(), public_visible: true });
  }
}
