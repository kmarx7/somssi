import { Container, Card } from "@/components/ui/layout";
import { Badge } from "@/components/ui/layout";
import { findExperience } from "@/lib/catalog";
import { findSession } from "@/lib/sessions";
import { listBookings } from "@/lib/mock-bookings";
import { getI18n } from "@/lib/i18n/server";
import { checkInBooking, completeBooking } from "@/app/actions/admin-bookings";
import { Button } from "@/components/ui/button";
export const dynamic = "force-dynamic";
export default async function AdminBookingsPage() {
  const bookings = listBookings(); const { locale } = await getI18n();
  return <Container className="admin-page"><header className="page-intro"><p className="eyebrow">ADMIN / BOOKINGS</p><h1>Booking operations</h1><p>Check guests in, then mark each completed experience.</p></header><div className="admin-stats"><Card><span className="eyebrow">Bookings</span><strong>{bookings.length}</strong></Card><Card><span className="eyebrow">Confirmed</span><strong>{bookings.filter((b) => b.status === "CONFIRMED").length}</strong></Card><Card><span className="eyebrow">Completed</span><strong>{bookings.filter((b) => b.status === "COMPLETED").length}</strong></Card></div>{bookings.length === 0 ? <Card className="state-copy"><h2>No bookings yet</h2><p>Completed checkout bookings will appear here in this development environment.</p></Card> : <div className="admin-bookings">{bookings.map((booking) => { const experience = findExperience(booking.experienceSlug); const session = findSession(booking.sessionId); return <Card key={booking.id} className="admin-booking"><div><p className="eyebrow">{booking.bookingNumber}</p><h2>{booking.customerName}</h2><p>{experience?.title[locale]} · {booking.guestCount} guests</p><p className="admin-meta">{session ? new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Seoul" }).format(new Date(session.startsAt)) : booking.sessionId}</p></div><div className="admin-booking-side"><Badge tone={booking.status === "COMPLETED" ? "success" : "accent"}>{booking.status}</Badge>{booking.status === "CONFIRMED" ? <form action={checkInBooking}><input type="hidden" name="bookingId" value={booking.id} /><Button type="submit">CHECK IN</Button></form> : null}{booking.status === "CHECKED_IN" ? <form action={completeBooking}><input type="hidden" name="bookingId" value={booking.id} /><Button type="submit">COMPLETE</Button></form> : null}</div></Card>; })}</div>}</Container>;
}
