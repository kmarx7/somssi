"use client";

import { useMemo, useState } from "react";
import type { Experience } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n/dictionaries";
import type { ExperienceOption } from "@/lib/pricing";
import { calculatePreviewPrice } from "@/lib/pricing";
import { discoveryCopy } from "@/lib/i18n/discovery";
import { ButtonLink } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { QuantityInput } from "@/components/ui/quantity-input";

export function CustomizeForm({ experience, options, locale }: { experience: Experience; options: readonly ExperienceOption[]; locale: Locale }) {
  const t = discoveryCopy[locale];
  const [guestCount, setGuestCount] = useState(2);
  const [selectedCodes, setSelectedCodes] = useState<ReadonlySet<string>>(new Set());
  const breakdown = useMemo(() => calculatePreviewPrice(experience, options, guestCount, selectedCodes), [experience, options, guestCount, selectedCodes]);
  const toggle = (code: string) => setSelectedCodes((current) => {
    const next = new Set(current); if (next.has(code)) next.delete(code); else next.add(code); return next;
  });
  return <div className="customize-layout"><div className="customize-form"><QuantityInput id="customize-guests" value={guestCount} min={1} max={experience.maxGuests} onChange={setGuestCount} label={t.guestCount} decreaseLabel={t.decrease} increaseLabel={t.increase} /><p className="field-hint">{t.guestHint}</p>
    <fieldset className="option-fieldset"><legend>{t.optional}</legend>{options.length === 0 ? <p>{t.noOptions}</p> : options.map((option) => { const checked = selectedCodes.has(option.code); const amount = option.pricingType === "PER_PERSON" ? option.price * guestCount : option.price; return <label className={`option-choice${checked ? " is-selected" : ""}`} key={option.code}><input type="checkbox" checked={checked} onChange={() => toggle(option.code)} /><span className="option-choice-copy"><strong>{option.title[locale]}</strong><small>{option.description[locale]}</small><Price amount={option.price} locale={locale} suffix={option.pricingType === "PER_PERSON" ? t.optionPerPerson : t.optionPerBooking} /></span><span className="option-choice-action">{checked ? t.removeOption : t.selectOption}</span><span className="sr-only">{checked ? ` · ${t.selected}` : ""}</span><span className="option-choice-amount"><Price amount={amount} locale={locale} /></span></label>; })}</fieldset>
  </div><aside className="price-summary" aria-live="polite"><p className="eyebrow">{t.pricePreview}</p><h2>{t.customizeTitle}</h2><dl><div><dt>{t.corePrice} · {guestCount} {t.guests.toLowerCase()}</dt><dd><Price amount={breakdown.baseAmount} locale={locale} /></dd></div>{breakdown.selected.map((item) => { const option = options.find((candidate) => candidate.code === item.code); return <div key={item.code}><dt>{option?.title[locale]}</dt><dd><Price amount={item.amount} locale={locale} /></dd></div>; })}<div className="summary-total"><dt>{t.pricePreview}</dt><dd><Price amount={breakdown.totalAmount} locale={locale} /></dd></div></dl><p>{t.priceNote}</p><ButtonLink href={`/booking?experience=${experience.slug}&guests=${guestCount}&options=${[...selectedCodes].join(",")}`}>{t.continueBooking} <span aria-hidden="true">↗</span></ButtonLink></aside></div>;
}
