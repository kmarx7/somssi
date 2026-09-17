import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, SectionHeading } from "@/components/ui/layout";
import { ExperienceCard } from "@/components/discovery/experience-card";
import { experiences, findCreator } from "@/lib/catalog";
import { getI18n } from "@/lib/i18n/server";
import { discoveryCopy } from "@/lib/i18n/discovery";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const c = findCreator(slug); if (!c) notFound(); const { locale } = await getI18n(); return { title: c.name[locale], robots: { index: false } }; }
export default async function CreatorDetail({ params }: Props) {
  const { slug } = await params; const creator = findCreator(slug); if (!creator) notFound(); const { locale } = await getI18n(); const t = discoveryCopy[locale];
  return <Container className="discovery-page"><Link className="back-link" href="/creators">← {t.backCreators}</Link><header className="creator-profile"><span className="creator-monogram" aria-hidden="true">{creator.initials}</span><div><p className="eyebrow">{creator.craft[locale]} · {t.sampleCreator}</p><h1>{creator.name[locale]}</h1><blockquote>{creator.quote[locale]}</blockquote><p>{creator.bio[locale]}</p></div></header><section className="content-section"><SectionHeading eyebrow="EXPERIENCE" title={t.creatorExperience} /><div className="experience-grid">{experiences.filter((e) => e.creatorSlug === slug).map((e) => <ExperienceCard key={e.slug} experience={e} locale={locale} />)}</div></section></Container>;
}
