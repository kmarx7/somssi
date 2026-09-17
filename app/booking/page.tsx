import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/layout";
import { Stepper } from "@/components/ui/stepper";
import { SessionPicker } from "@/components/booking/session-picker";
import { findExperience, getExperienceOptions } from "@/lib/catalog";
import { sessionsForExperience } from "@/lib/sessions";
import { getI18n } from "@/lib/i18n/server";
import { discoveryCopy } from "@/lib/i18n/discovery";

export const metadata: Metadata = { title: "Choose a date", robots: { index: false } };
export default async function BookingPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams; const slug = typeof query.experience === "string" ? query.experience : ""; const experience = findExperience(slug); if (!experience) notFound();
  const { locale, t: common } = await getI18n(); const t = discoveryCopy[locale]; const options = typeof query.options === "string" ? query.options.split(",").filter((code) => getExperienceOptions(slug).some((option) => option.code === code)) : []; const guestInitial = typeof query.guests === "string" ? Number(query.guests) : 2;
  return <Container className="booking-page"><Link className="back-link" href={`/experiences/${slug}/customize`}>← {t.customize}</Link><header className="page-intro"><p className="eyebrow">BOOK / {experience.title[locale]}</p><h1>{t.bookingTitle}</h1><p>{t.bookingBody}</p></header><Stepper steps={common.steps} current={0} label={common.progress} completedLabel={common.finished} /><SessionPicker sessions={sessionsForExperience(slug)} experienceSlug={slug} guestInitial={guestInitial} optionCodes={options} locale={locale} /><p className="preview-note">{t.previewNotice}</p></Container>;
}
