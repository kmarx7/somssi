import { Container } from "@/components/ui/layout";
import { LoadingState, Skeleton } from "@/components/ui/states";
import { getI18n } from "@/lib/i18n/server";

export default async function Loading() {
  const { t } = await getI18n();
  return <Container className="page-section"><LoadingState label={t.loading} /><Skeleton /></Container>;
}
