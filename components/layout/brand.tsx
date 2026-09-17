import Link from "next/link";

export function Brand({ label }: { label: string }) {
  return <Link href="/" className="brand" aria-label={`SOMSSI · ${label}`}>
    <svg viewBox="0 0 82 30" aria-hidden="true"><path d="M2 25C14 25 18 5 31 6c10 1 9 16 20 17 8 0 15-8 29-20" /><path d="M14 24c7-3 9-14 17-16M20 25c6-4 7-12 12-16" /></svg>
    <span>SOMSSI<small lang="ko">솜씨</small></span>
  </Link>;
}
