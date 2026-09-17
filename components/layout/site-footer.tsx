import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Brand } from "./brand";

export function SiteFooter({ t }: { t: Dictionary }) {
  return <footer className="site-footer"><div className="site-container footer-inner"><Brand label={t.home} /><p>{t.footer}</p><p>© SOMSSI</p></div></footer>;
}
