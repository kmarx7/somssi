"use client";

import { useMemo, useState } from "react";
import type { SessionPreview } from "@/lib/sessions";
import { canFitGuests, remainingCapacity } from "@/lib/sessions";
import { ButtonLink } from "@/components/ui/button";
import { QuantityInput } from "@/components/ui/quantity-input";
import type { Locale } from "@/lib/i18n/dictionaries";
import { discoveryCopy } from "@/lib/i18n/discovery";

function formatSession(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value));
}
export function SessionPicker({ sessions, experienceSlug, guestInitial, optionCodes, locale }: { sessions: readonly SessionPreview[]; experienceSlug: string; guestInitial: number; optionCodes: readonly string[]; locale: Locale }) {
  const t = discoveryCopy[locale]; const [guestCount, setGuestCount] = useState(Math.min(6, Math.max(1, guestInitial))); const [selected, setSelected] = useState<string | null>(null);
  const selectedSession = useMemo(() => sessions.find((session) => session.id === selected), [sessions, selected]);
  const bookingHref = selectedSession ? `/checkout?experience=${experienceSlug}&session=${selectedSession.id}&guests=${guestCount}&options=${optionCodes.join(",")}` : "#session-list";
  return <div className="session-picker"><div className="session-controls"><QuantityInput id="booking-guests" value={guestCount} min={1} max={6} onChange={setGuestCount} label={t.guestCount} decreaseLabel={t.decrease} increaseLabel={t.increase} /><p className="field-hint">{t.guestHint}</p></div><div id="session-list" className="session-list"><h2>{t.selectSession}</h2>{sessions.length === 0 ? <p className="state-copy">{t.noSessions}</p> : sessions.map((session) => { const available = canFitGuests(session, guestCount); const selectedClass = selected === session.id ? " is-selected" : ""; return <button type="button" key={session.id} className={`session-choice${selectedClass}`} disabled={!available} onClick={() => setSelected(session.id)} aria-pressed={selected === session.id}><span><strong>{formatSession(session.startsAt, locale)}</strong><small>{session.venue}</small></span><span>{available ? `${remainingCapacity(session)} ${t.placesLeft}` : t.full}</span></button>; })}</div><div className="session-next"><p aria-live="polite">{selectedSession ? `${formatSession(selectedSession.startsAt, locale)} · ${guestCount} ${t.guests.toLowerCase()}` : t.chooseSession}</p><ButtonLink href={bookingHref} aria-disabled={!selectedSession} onClick={(event) => { if (!selectedSession) event.preventDefault(); }}>{t.continueBooking}</ButtonLink></div></div>;
}
