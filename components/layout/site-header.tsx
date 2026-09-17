import { setLocale } from "@/app/actions/locale";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";
import { Brand } from "./brand";

export function SiteHeader({ locale, t }: { locale: Locale; t: Dictionary }) {
  return <header className="site-header"><div className="site-container header-inner"><Brand label={t.home} />
    <form action={setLocale} className="locale-switch" aria-label="Language / 언어">
      <button type="submit" name="locale" value="en" lang="en" aria-pressed={locale === "en"}>EN<span className="sr-only"> — English</span></button>
      <span aria-hidden="true">/</span>
      <button type="submit" name="locale" value="ko" lang="ko" aria-pressed={locale === "ko"}>한국어</button>
    </form>
  </div></header>;
}
