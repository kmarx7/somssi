import type { Metadata } from "next";
import { Container } from "@/components/ui/layout";
import { CreatorCard } from "@/components/discovery/creator-card";
import { creators } from "@/lib/catalog";
import { getI18n } from "@/lib/i18n/server";
import { discoveryCopy } from "@/lib/i18n/discovery";

export async function generateMetadata(): Promise<Metadata> { const { locale } = await getI18n(); return { title: discoveryCopy[locale].creators }; }
export default async function Creators() {
  const { locale } = await getI18n(); const t = discoveryCopy[locale];
  return <Container className="discovery-page"><header className="page-intro"><p className="eyebrow">MEET THE CREATORS</p><h1>{t.creatorProfiles}</h1><p>{t.creatorIntro}</p></header><div className="creator-grid">{creators.map((creator) => <CreatorCard key={creator.slug} creator={creator} locale={locale} />)}</div></Container>;
}
