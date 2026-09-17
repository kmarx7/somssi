import type { Metadata } from "next";
import Image from "next/image";
import { Container, SectionHeading } from "@/components/ui/layout";
import { FinalCta, LearnDoKeep } from "@/components/discovery/sections";
import { getI18n } from "@/lib/i18n/server";
import { discoveryCopy } from "@/lib/i18n/discovery";

export async function generateMetadata(): Promise<Metadata> { const { locale } = await getI18n(); return { title: discoveryCopy[locale].about }; }
export default async function About() {
  const { locale } = await getI18n(); const t = discoveryCopy[locale];
  return <Container><header className="page-intro"><p className="eyebrow">OUR STORY / SOMSSI</p><h1>{t.aboutTitle}</h1><p>{t.aboutBody}</p></header><div className="about-image"><Image src="/images/hanok-culture.png" alt="" fill priority sizes="100vw" /></div><section className="content-section about-copy"><SectionHeading eyebrow="SMALL BEGINNINGS, MEANINGFUL MOMENTS" title={t.aboutValues} description={t.aboutSecond} /><LearnDoKeep locale={locale} /></section><FinalCta locale={locale} /></Container>;
}
