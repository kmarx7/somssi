import type { Metadata } from "next";
import { Container } from "@/components/ui/layout";
import { ExperienceCard } from "@/components/discovery/experience-card";
import { experiences } from "@/lib/catalog";
import { getI18n } from "@/lib/i18n/server";
import { discoveryCopy } from "@/lib/i18n/discovery";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getI18n();
  return { title: discoveryCopy[locale].experiences };
}
export default async function Experiences() {
  const { locale } = await getI18n(); const t = discoveryCopy[locale];
  return <Container className="discovery-page"><header className="page-intro"><p className="eyebrow">EXPLORE / SOMSSI</p><h1>{t.exploreTitle}</h1><p>{t.exploreBody}</p></header><div className="experience-grid">{experiences.map((e) => <ExperienceCard key={e.slug} experience={e} locale={locale} />)}</div><p className="preview-note">{t.previewNotice}</p></Container>;
}
