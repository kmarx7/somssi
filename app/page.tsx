import Image from "next/image";
import { Container } from "@/components/ui/layout";
import { getI18n } from "@/lib/i18n/server";

// Phase 2 brand shell. Full discovery content belongs to Phase 3.
export default async function Home() {
  const { t } = await getI18n();
  return <Container><section className="brand-intro"><div><p className="eyebrow">K-CULTURE EXPERIENCE · INCHEON</p>
    <h1>Experience Korea<br /><em>by Hand.</em></h1><p lang="ko" className="korean-tagline">한국의 솜씨를 배우는 여행</p>
    <p className="intro-copy">{t.intro}</p><p className="preparing">{t.preparing}</p>
    </div><div className="brand-image"><Image src="/images/hanok-hero.png" alt="" fill priority sizes="(min-width: 1024px) 45vw, 100vw" /></div>
  </section></Container>;
}
