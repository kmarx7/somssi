"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import { CheckboxField, InputField, SelectField } from "@/components/ui/field";
import { QuantityInput } from "@/components/ui/quantity-input";

export function InteractiveExamples({ t }: { t: Dictionary }) {
  const [guests, setGuests] = useState(2);
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem("email");
    const valid = input instanceof HTMLInputElement && input.validity.valid;
    setInvalid(!valid);
    setSuccess(valid);
    if (!valid && input instanceof HTMLInputElement) input.focus();
  }
  return <div className="example-grid"><form className="form-stack" onSubmit={handleSubmit} noValidate>
    <InputField id="example-name" name="firstName" label={t.firstName} autoComplete="given-name" />
    <InputField id="example-email" name="email" label={t.email} type="email" required autoComplete="email" hint={t.emailHint} error={invalid ? t.emailError : undefined} onChange={() => { setInvalid(false); setSuccess(false); }} />
    <SelectField id="example-language" name="language" label={t.language}><option value="en">English</option><option value="ko">한국어</option></SelectField>
    <CheckboxField label={t.consent} name="terms" />
    <Button type="submit">{t.demoSubmit}</Button><p role="status">{success ? t.demoSuccess : ""}</p>
  </form><div className="form-stack">
    <div className="button-row"><Button>{t.primary}</Button><Button variant="secondary">{t.secondary}</Button><Button variant="quiet">{t.subtle}</Button></div>
    <div className="button-row"><Button disabled>{t.disabled}</Button><Button pending>{t.pending}</Button></div>
    <QuantityInput id="example-guests" value={guests} min={1} max={6} onChange={setGuests} label={t.guests} decreaseLabel={t.decrease} increaseLabel={t.increase} />
  </div></div>;
}
