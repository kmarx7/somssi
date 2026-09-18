import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Price } from "@/components/ui/price";
import { BookingPreview } from "@/components/discovery/booking-preview";
import { CreatorCard } from "@/components/discovery/creator-card";
import { ExperienceCard } from "@/components/discovery/experience-card";
import { experiences, findExperience, findCreator, getExperienceOptions, getExperiencePackages } from "@/lib/catalog";
import { getI18n } from "@/lib/i18n/server";
import { discoveryCopy } from "@/lib/i18n/discovery";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const e = findExperience(slug); if (!e) notFound();
  const { locale } = await getI18n(); return { title: e.title[locale], description: e.description[locale] };
}
export default async function ExperienceDetail({ params }: Props) {
  const { slug } = await params; const e = findExperience(slug); if (!e) notFound();
  const { locale } = await getI18n(); const t = discoveryCopy[locale]; const creator = findCreator(e.creatorSlug);
  const facts = [[t.duration, `${e.duration} ${t.minutes}`], [t.guests, `${e.minGuests}–${e.maxGuests}`], [t.language, t.bilingual], [t.location, t.incheon], [t.difficulty, t.beginner]];
  return <Container className="detail-page"><Link className="back-link" href="/experiences">← {t.back}</Link><header className="detail-heading"><p className="eyebrow">{e.category[locale]}</p><h1>{e.title[locale]}</h1><p lang={locale === "en" ? "ko" : "en"}>{e.title[locale === "en" ? "ko" : "en"]}</p></header>
    <div className="detail-layout"><div className="detail-content"><figure><div className="detail-image"><Image src={e.image} alt={e.alt[locale]} fill priority sizes="(min-width: 1024px) 60vw, 100vw" /></div><figcaption className="image-note">{t.imageNote}</figcaption></figure>
      <dl className="experience-facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className="detail-description">{e.description[locale]}</p>
      <section className="detail-section"><h2>{t.what}</h2><ol className="activity-list">{e.activities.map((item, i) => <li key={item.en}><span>0{i + 1}</span><p>{item[locale]}</p></li>)}</ol></section>
      {creator ? <section className="detail-section"><h2>{t.meet}</h2><CreatorCard creator={creator} locale={locale} /></section> : null}
      <section className="detail-section"><h2>{t.included}</h2><ul className="included-list">{e.included.map((item) => <li key={item.en}>{item[locale]}</li>)}</ul></section>
      {getExperiencePackages(e.slug).length ? <section className="detail-section package-section"><h2>{locale === "ko" ? "나에게 맞는 패키지" : "Choose your package"}</h2><p>{locale === "ko" ? "핵심 체험에서 시작해 여행의 깊이에 맞는 구성을 선택하세요." : "Start with the core craft, then choose the depth of your day."}</p><div className="package-grid">{getExperiencePackages(e.slug).map((pack) => <article className={`package-card${pack.code === "SIGNATURE" ? " is-featured" : ""}`} key={pack.code}><p className="eyebrow">{pack.code}</p><h3>{pack.name[locale]}</h3><p>{pack.description[locale]}</p><Price amount={pack.price} locale={locale} suffix={t.perPerson} /><Link className="button button--secondary" href={`/experiences/${e.slug}/customize?package=${pack.code}`}>{locale === "ko" ? "이 구성으로 시작" : "Start with this"}</Link></article>)}</div></section> : null}<section className="detail-section"><h2>{locale === "ko" ? "체험의 흐름" : "Your experience, step by step"}</h2><div className="program-timeline">{e.activities.map((item, i) => <div key={item.en}><span>0{i + 1}</span><p>{item[locale]}</p></div>)}<div><span>04</span><p>{locale === "ko" ? "인증서와 기억을 가져갑니다" : "Leave with a certificate and a memory"}</p></div></div></section><section className="detail-section"><h2>{t.optional}</h2><p>{t.optionalNote}</p><div className="detail-options">{getExperienceOptions(e.slug).map((option) => <article key={option.code}><div><h3>{option.title[locale]}</h3><p>{option.description[locale]}</p></div><Price amount={option.price} locale={locale} suffix={option.pricingType === "PER_PERSON" ? t.perPerson : t.perBooking} /></article>)}</div></section>
      <section className="detail-section"><h2>{t.location}</h2><h3>{t.venue}</h3><p>{t.venueBody}</p></section><section className="detail-section"><h2>{t.cancellation}</h2><p>{t.cancellationBody}</p></section>
    </div><BookingPreview experience={e} locale={locale} /></div><section className="content-section"><SectionHeading eyebrow="NEXT SOMSSI" title={t.other} /><div className="experience-grid">{experiences.filter((item) => item.slug !== e.slug).map((item) => <ExperienceCard key={item.slug} experience={item} locale={locale} />)}</div></section>
  </Container>;
}
