"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { ErrorState } from "@/components/ui/states";

// This fallback intentionally works without dictionary or cookie access.
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <Container className="page-section"><ErrorState title="Please try again · 다시 시도해 주세요" description="We could not load this page. 페이지를 불러오지 못했습니다."
    action={<Button onClick={reset}>Try again · 다시 시도</Button>} /></Container>;
}
