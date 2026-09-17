import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/layout";
import { CustomizeForm } from "@/components/customize/customize-form";
import { findExperience, getExperienceOptions } from "@/lib/catalog";
import { getI18n } from "@/lib/i18n/server";
import { discoveryCopy } from "@/lib/i18n/discovery";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const experience = findExperience(slug); if (!experience) notFound(); const { locale } = await getI18n(); return { title: `${discoveryCopy[locale].customize} · ${experience.title[locale]}`, robots: { index: false } }; }
export default async function CustomizePage({ params }: Props) {
  const { slug } = await params; const experience = findExperience(slug); if (!experience) notFound(); const { locale } = await getI18n(); const t = discoveryCopy[locale]; const options = getExperienceOptions(slug);
  return <Container className="customize-page"><Link className="back-link" href={`/experiences/${slug}`}>← {experience.title[locale]}</Link><header className="page-intro"><p className="eyebrow">CUSTOMIZE / {experience.title[locale]}</p><h1>{t.customizeTitle}</h1><p>{t.customizeBody}</p></header><CustomizeForm experience={experience} options={options} locale={locale} /><p className="preview-note">{t.previewNotice}</p></Container>;
}
