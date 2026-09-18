import Image from "next/image";
import { Container } from "@/components/ui/layout";
import { getI18n } from "@/lib/i18n/server";
import { discoveryCopy } from "@/lib/i18n/discovery";
import { creators, experiences } from "@/lib/catalog";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/layout";
import { ExperienceCard } from "@/components/discovery/experience-card";
import { CreatorCard } from "@/components/discovery/creator-card";
import { CertificatePreview, FinalCta, LearnDoKeep, OptionsOverview } from "@/components/discovery/sections";

export default async function Home() {
  const { locale } = await getI18n();
  const t = discoveryCopy[locale];
  return <><Container><section className="discovery-hero"><div className="hero-editorial"><p className="eyebrow hero-kicker">SOMSSI · INCHEON, KOREA</p><p className="hero-brand" lang="en">Experience Korea<br /><em>by Hand.</em></p><p className="korean-tagline" lang="ko">한국의 솜씨를 배우는 여행</p><h1>{t.hero}<br />{t.heroEm}</h1><p className="intro-copy">{t.heroBody}</p><ButtonLink href="/experiences">{t.explore} <span aria-hidden="true">↗</span></ButtonLink><div className="hero-palette" aria-label="Dancheong palette"><i /><i /><i /><i /><i /></div></div><div className="hero-craft"><Image src="/images/hanok-hero.png" alt="Hanok courtyard at golden hour" fill priority sizes="(min-width: 1024px) 50vw, 100vw" /><span className="image-label">01 / THE COURTYARD</span></div></section>
    <section className="content-section"><h2 className="sr-only">{locale === "en" ? "What is SOMSSI?" : "SOMSSI란?"}</h2><LearnDoKeep locale={locale} /></section>
    <section className="content-section" aria-labelledby="choose"><SectionHeading id="choose" eyebrow="CHOOSE YOUR SOMSSI" title={t.choose} description={t.chooseBody} /><div className="experience-grid">{experiences.map((experience) => <ExperienceCard key={experience.slug} experience={experience} locale={locale} />)}</div><p className="preview-note">{t.previewNotice}</p></section>
  </Container><section className="options-band"><Container><SectionHeading eyebrow="CORE EXPERIENCE + OPTIONAL EXPERIENCE" title={t.yours} description={t.yoursBody} /><OptionsOverview locale={locale} /></Container></section><Container>
    <section className="content-section"><SectionHeading eyebrow="MEET THE CREATOR" title={t.creatorTitle} description={t.creatorBody} /><div className="creator-grid">{creators.map((creator) => <CreatorCard key={creator.slug} creator={creator} locale={locale} />)}</div></section>
    <section className="content-section"><SectionHeading eyebrow="HOW IT WORKS" title={t.how} /><ol className="journey">{t.steps.map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol></section>
    <section className="certificate-section"><div><SectionHeading eyebrow="SOMSSI CERTIFICATE" title={t.certificate} description={t.certificateBody} /><p className="eyebrow">LEARN · DO · KEEP</p></div><CertificatePreview locale={locale} /></section><FinalCta locale={locale} />
  </Container></>;
}
