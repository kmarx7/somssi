import { ButtonLink } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import type { Experience } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n/dictionaries";
import { discoveryCopy } from "@/lib/i18n/discovery";

export function BookingPreview({ experience, locale }: { experience: Experience; locale: Locale }) {
  const t = discoveryCopy[locale];
  return <><aside className="booking-preview" aria-labelledby="booking-title"><p className="eyebrow">{t.corePrice}</p><h2 id="booking-title">{t.booking}</h2><Price amount={experience.price} locale={locale} suffix={t.perPerson} /><p>{t.optionalNote}</p><ButtonLink href={`/experiences/${experience.slug}/customize`} aria-describedby="booking-note">{t.customize}</ButtonLink><p id="booking-note">{t.bookingBody}</p><p className="booking-footnote">{t.previewNotice}</p></aside>
    <div className="mobile-booking"><Price amount={experience.price} locale={locale} /><ButtonLink href={`/experiences/${experience.slug}/customize`}>{t.customize}</ButtonLink></div></>;
}
