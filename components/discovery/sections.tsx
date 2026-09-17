import { options } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n/dictionaries";
import { discoveryCopy } from "@/lib/i18n/discovery";
import { ButtonLink } from "@/components/ui/button";
import { Price } from "@/components/ui/price";

export function LearnDoKeep({ locale }: { locale: Locale }) {
  const t = discoveryCopy[locale];
  return <div className="values-grid">{[["LEARN", t.learn, t.learnBody], ["DO", t.do, t.doBody], ["KEEP", t.keep, t.keepBody]].map(([en, title, body], index) => <article key={en}><span className="editorial-number">0{index + 1}</span><p className="eyebrow">{en}</p><h3>{title}</h3><p>{body}</p></article>)}</div>;
}
export function OptionsOverview({ locale }: { locale: Locale }) {
  const t = discoveryCopy[locale];
  return <div className="options-grid">{options.map((option, index) => <article key={option.code}><span className="editorial-number">+ 0{index + 1}</span><h3>{option.title[locale]}</h3><p>{option.description[locale]}</p><Price amount={option.price} locale={locale} suffix={option.pricingType === "PER_PERSON" ? t.perPerson : t.perBooking} /></article>)}</div>;
}
export function CertificatePreview({ locale }: { locale: Locale }) {
  const t = discoveryCopy[locale];
  return <figure className="certificate-preview" aria-label={t.certificatePreview}><p className="eyebrow">SOMSSI</p><h3 lang="en">Certificate<br /><em>of Experience</em></h3><p>{t.certifies}</p><strong>{t.guest}</strong><p>{t.completed}</p><p lang="ko">줄을 다루는 솜씨</p><p lang="en">Gayageum Experience</p><div className="certificate-rule" /><p>{t.incheon}</p><figcaption>{t.sampleId}</figcaption></figure>;
}
export function FinalCta({ locale }: { locale: Locale }) {
  const t = discoveryCopy[locale];
  return <section className="final-cta"><p className="eyebrow">YOUR NEXT SOMSSI</p><h2>{t.final}</h2><p>{t.finalBody}</p><ButtonLink href="/experiences">{t.explore} <span aria-hidden="true">↗</span></ButtonLink></section>;
}
