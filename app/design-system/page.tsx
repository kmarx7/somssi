import type { Metadata } from "next";
import Image from "next/image";
import { InteractiveExamples } from "@/components/design-system/interactive-examples";
import { Badge, Card, Container, SectionHeading } from "@/components/ui/layout";
import { Price } from "@/components/ui/price";
import { Stepper } from "@/components/ui/stepper";
import { EmptyState, ErrorState, LoadingState, Skeleton } from "@/components/ui/states";
import { getI18n } from "@/lib/i18n/server";

export const metadata: Metadata = { title: "Design system", robots: { index: false, follow: false } };
const swatches = [
  ["Hanji", "#F7F4ED"], ["Surface", "#FFFDF8"], ["Ink", "#171714"], ["Celadon", "#7F9D8B"],
  ["Persimmon", "#B96C4A"], ["Brass", "#B89B62"], ["Gayageum", "#6E5542"], ["Knot", "#A95850"], ["Minhwa", "#617A8A"],
];

export default async function DesignSystem() {
  const { locale, t } = await getI18n();
  return <Container><header className="system-intro"><p className="eyebrow">SOMSSI / 02</p><h1>{t.system}</h1><p>{t.systemIntro}</p></header>
    <section className="system-section" aria-labelledby="palette"><SectionHeading id="palette" eyebrow={`01 / ${t.foundations}`} title={t.palette} />
      <div className="swatches">{swatches.map(([name, hex]) => <div key={name}><div className="swatch" style={{ backgroundColor: `var(--${name.toLowerCase()})` }} /><p>{name}<span>{hex}</span></p></div>)}</div>
    </section>
    <section className="system-section" aria-labelledby="type"><SectionHeading id="type" eyebrow={`02 / ${t.type}`} title={t.typeTitle} />
      <div className="type-example"><p className="display-serif" lang="en">Experience Korea<br /><em>by Hand.</em></p><div><p className="korean-tagline" lang="ko">한국의 솜씨를 배우는 여행</p><p>{t.typeBody}</p></div></div>
    </section>
    <section className="system-section" aria-labelledby="controls"><SectionHeading id="controls" eyebrow={`03 / ${t.controls}`} title={t.controlsTitle} /><InteractiveExamples key={locale} t={t} /></section>
    <section className="system-section" aria-labelledby="composition"><SectionHeading id="composition" eyebrow={`04 / ${t.composition}`} title={t.compositionTitle} />
      <Stepper steps={t.steps} current={1} label={t.progress} completedLabel={t.finished} />
      <div className="example-grid"><Card><div className="card-image"><Image src="/images/gayageum-experience.png" alt={t.imageAlt} fill sizes="(min-width: 768px) 45vw, 100vw" /></div>
        <div className="card-content"><p className="eyebrow">{t.sample}</p><h3>{locale === "en" ? t.gayageum : t.gayageumKo}</h3><p>{t.cardBody}</p><Price amount={99000} locale={locale} suffix={t.perPerson} /></div>
      </Card><div className="form-stack"><div className="button-row"><Badge>{t.sample}</Badge><Badge tone="success">✓ {t.available}</Badge><Badge tone="accent">✓ {t.selected}</Badge></div><EmptyState title={t.emptyTitle} description={t.emptyBody} /></div></div>
    </section>
    <section className="system-section" aria-labelledby="feedback"><SectionHeading id="feedback" eyebrow={`05 / ${t.feedback}`} title={t.feedbackTitle} /><div className="example-grid"><ErrorState title={t.errorTitle} description={t.errorBody} /><div><LoadingState label={t.loading} /><Skeleton /></div></div></section>
  </Container>;
}
