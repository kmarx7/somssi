import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container, Card } from "@/components/ui/layout";
import { Price } from "@/components/ui/price";
import { getBooking } from "@/lib/mock-bookings";
import { findExperience } from "@/lib/catalog";
import { findSession } from "@/lib/sessions";
import { getI18n } from "@/lib/i18n/server";
import { discoveryCopy } from "@/lib/i18n/discovery";
export default async function BookingCompletePage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params; const booking = getBooking(bookingId); if (!booking) notFound(); const experience = findExperience(booking.experienceSlug); const session = findSession(booking.sessionId); if (!experience || !session) notFound(); const { locale } = await getI18n(); const copy = discoveryCopy[locale];
  return <Container className="complete-page"><div className="complete-mark" aria-hidden="true">✓</div><p className="eyebrow">SOMSSI / CONFIRMED</p><h1>{copy.bookingComplete}</h1><p className="complete-lede">{copy.confirmationBody}</p><Card className="confirmation-card"><p className="eyebrow">{copy.bookingNumber}</p><strong>{booking.bookingNumber}</strong><dl><div><dt>{copy.experienceLabel}</dt><dd>{experience.title[locale]}</dd></div><div><dt>{copy.session}</dt><dd>{new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Seoul" }).format(new Date(session.startsAt))}</dd></div><div><dt>{copy.guestCount}</dt><dd>{booking.guestCount}</dd></div><div><dt>{copy.email}</dt><dd>{booking.email}</dd></div><div><dt>{copy.total}</dt><dd><Price amount={booking.totalAmount} locale={locale} /></dd></div><div><dt>{copy.paymentTitle}</dt><dd>{copy.paid}</dd></div></dl></Card><p className="preview-note">{copy.emailSent}</p>{booking.certificateId ? <ButtonLink href={`/certificate/${booking.certificateId}`} variant="primary">View certificate</ButtonLink> : null} <ButtonLink href="/experiences" variant="secondary">{copy.backToExperiences}</ButtonLink></Container>;
}
