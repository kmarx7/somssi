import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getI18n } from "@/lib/i18n/server";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "SOMSSI | Experience Korea by Hand", template: "%s | SOMSSI" },
  description: "한국의 솜씨를 배우는 여행. Experience Korea by Hand.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { locale, t } = await getI18n();
  return <html lang={locale}><body><a className="skip-link" href="#main-content">{t.skip}</a>
    <SiteHeader locale={locale} t={t} /><main id="main-content" tabIndex={-1}>{children}</main><SiteFooter t={t} />
  </body></html>;
}
