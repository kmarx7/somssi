import Link from "next/link";
import type { Creator } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n/dictionaries";
import { discoveryCopy } from "@/lib/i18n/discovery";

export function CreatorCard({ creator, locale }: { creator: Creator; locale: Locale }) {
  const t = discoveryCopy[locale];
  return <article className="creator-card"><span className="creator-monogram" aria-hidden="true">{creator.initials}</span><p className="eyebrow">{creator.craft[locale]} · {t.sampleCreator}</p><h3><Link href={`/creators/${creator.slug}`}>{creator.name[locale]} <span aria-hidden="true">↗</span></Link></h3><p>{creator.quote[locale]}</p></article>;
}
