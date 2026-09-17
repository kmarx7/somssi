import type { Locale } from "@/lib/i18n/dictionaries";

/** Display only. Final booking totals must come from the server pricing service. */
export function Price({ amount, locale, suffix }: { amount: number; locale: Locale; suffix?: string }) {
  return <span className="price"><strong>{new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
    style: "currency", currency: "KRW", maximumFractionDigits: 0,
  }).format(amount)}</strong>{suffix ? <span> / {suffix}</span> : null}</span>;
}
