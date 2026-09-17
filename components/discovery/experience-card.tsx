import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n/dictionaries";
import { discoveryCopy } from "@/lib/i18n/discovery";
import { Price } from "@/components/ui/price";

export function ExperienceCard({ experience: e, locale }: { experience: Experience; locale: Locale }) {
  const t = discoveryCopy[locale];
  return <article className="experience-card" style={{ borderColor: `var(--${e.accent})` }}>
    <Link href={`/experiences/${e.slug}`} className="experience-card-link"><div className="experience-photo"><Image src={e.image} alt={e.alt[locale]} fill sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" /></div>
      <div className="experience-copy"><p className="eyebrow">{e.category[locale]}</p><h3>{e.title[locale]}</h3><p lang={locale === "en" ? "ko" : "en"} className="secondary-title">{e.title[locale === "en" ? "ko" : "en"]}</p>
        <p>{e.duration} {t.minutes} <span aria-hidden="true">·</span> {t.beginner}</p><div className="card-bottom"><Price amount={e.price} locale={locale} suffix={t.perPerson} /><span aria-hidden="true">↗</span></div>
      </div></Link>
  </article>;
}
