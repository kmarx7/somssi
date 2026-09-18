import { notFound } from "next/navigation";
import { Container, Card } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { getBooking } from "@/lib/mock-bookings";
import { submitCancellation } from "@/app/actions/cancel-booking";
export const dynamic = "force-dynamic";
export default async function ManageBookingPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params; const booking = getBooking(bookingId); if (!booking) notFound();
  return <Container className="manage-page"><p className="eyebrow">SOMSSI / MANAGE BOOKING</p><h1>Manage your booking</h1><p>Booking number: <strong>{booking.bookingNumber}</strong></p><Card className="manage-card"><h2>Cancel this booking?</h2><p>Cancellation requests are recorded for the operations team. Refund handling is connected when a live payment provider is configured.</p><form action={submitCancellation} className="form-stack"><input type="hidden" name="bookingId" value={booking.id} /><label className="field"><span>Reason (optional)</span><textarea name="reason" className="input" rows={3} /></label><Button type="submit" variant="secondary" disabled={booking.status !== "CONFIRMED"}>{booking.status === "CANCELLED" ? "Already cancelled" : "Request cancellation"}</Button></form></Card></Container>;
}
