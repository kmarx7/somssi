import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { EmptyState } from "@/components/ui/states";
import { getI18n } from "@/lib/i18n/server";

export default async function NotFound() {
  const { t } = await getI18n();
  return <Container className="page-section"><EmptyState title={t.notFound} description={t.notFoundBody} action={<ButtonLink href="/">{t.home}</ButtonLink>} /></Container>;
}
