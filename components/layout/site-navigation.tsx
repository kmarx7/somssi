"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/dictionaries";
import { discoveryCopy } from "@/lib/i18n/discovery";

export function SiteNavigation({ locale, label }: { locale: Locale; label: string }) {
  const path = usePathname();
  const t = discoveryCopy[locale];
  return <nav className="site-navigation" aria-label={label}>{[["/experiences", t.experiences], ["/creators", t.creators], ["/about", t.about]].map(([href, text]) =>
    <Link key={href} href={href} aria-current={path === href || path.startsWith(`${href}/`) ? "page" : undefined}>{text}</Link>)}</nav>;
}
