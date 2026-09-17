import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Card } from "@/components/ui/layout";
import { Stepper } from "@/components/ui/stepper";
import { Price } from "@/components/ui/price";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { findExperience } from "@/lib/catalog";
import { findSession } from "@/lib/sessions";
import { draftTotal, parseBookingDraft } from "@/lib/booking-draft";
import { getI18n } from "@/lib/i18n/server";
import { discoveryCopy } from "@/lib/i18n/discovery";
export const metadata: Metadata = { title: "Checkout", robots: { index: false } };
export default async function CheckoutPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams; const params = new URLSearchParams(); Object.entries(query).forEach(([key, value]) => { if (typeof value === "string") params.set(key, value); });
  const draft = parseBookingDraft(params); if (!draft) notFound(); const experience = findExperience(draft.experienceSlug); const session = findSession(draft.sessionId); const total = draftTotal(draft); if (!experience || !session || !total) notFound();
  const { locale, t: common } = await getI18n(); const copy = discoveryCopy[locale];
  return <Container className="checkout-page"><header className="page-intro"><p className="eyebrow">BOOK / PAY</p><h1>{copy.checkoutTitle}</h1><p>{copy.checkoutBody}</p></header><Stepper steps={common.steps} current={2} label={common.progress} completedLabel={common.finished} /><div className="checkout-layout"><Card><h2>{copy.customerDetails}</h2><CheckoutForm copy={copy} locale={locale} experienceSlug={draft.experienceSlug} sessionId={draft.sessionId} guestCount={draft.guestCount} optionCodes={draft.optionCodes} totalAmount={total.totalAmount} /></Card><aside className="checkout-summary"><p className="eyebrow">{copy.bookingSummary}</p><h2>{experience.title[locale]}</h2><p>{new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Seoul" }).format(new Date(session.startsAt))}</p><p>{draft.guestCount} {common.guests}</p><Price amount={total.totalAmount} locale={locale} /><p className="preview-note">{copy.mockPaymentNote}</p></aside></div></Container>;
}
