"use client";
import { useActionState } from "react";
import { submitBooking, type BookingActionState } from "@/app/actions/booking";
import { Button } from "@/components/ui/button";
import { CheckboxField, InputField, SelectField } from "@/components/ui/field";
import { Price } from "@/components/ui/price";
import type { Locale } from "@/lib/i18n/dictionaries";
import type { DiscoveryCopy } from "@/lib/i18n/discovery";
export function CheckoutForm({ copy, locale, experienceSlug, sessionId, guestCount, optionCodes, totalAmount }: { copy: DiscoveryCopy; locale: Locale; experienceSlug: string; sessionId: string; guestCount: number; optionCodes: string[]; totalAmount: number }) {
  const [state, action, pending] = useActionState<BookingActionState, FormData>(submitBooking, {});
  return <form action={action} className="checkout-form"><input type="hidden" name="experienceSlug" value={experienceSlug} /><input type="hidden" name="sessionId" value={sessionId} /><input type="hidden" name="guestCount" value={guestCount} /><input type="hidden" name="optionCodes" value={optionCodes.join(",")} /><input type="hidden" name="language" value={locale} />
    <div className="checkout-fields"><InputField id="firstName" name="firstName" label={copy.firstName} autoComplete="given-name" required /><InputField id="lastName" name="lastName" label={copy.lastName} autoComplete="family-name" required /><InputField id="email" name="email" type="email" label={copy.email} autoComplete="email" required /><InputField id="country" name="country" label={copy.country} autoComplete="country-name" required /><InputField id="phone" name="phone" type="tel" label={copy.phone} hint={copy.phoneOptional} autoComplete="tel" /><SelectField id="language" label={copy.language} defaultValue={locale} disabled><option value="en">English</option><option value="ko">한국어</option></SelectField></div>
    <CheckboxField name="terms" required label={copy.terms} />{state.error ? <p className="form-alert" role="alert">{state.error}</p> : null}<div className="checkout-submit"><span><span className="eyebrow">{copy.total}</span><Price amount={totalAmount} locale={locale} /></span><Button type="submit" pending={pending}>{pending ? copy.processing : copy.payNow}</Button></div>
  </form>;
}
