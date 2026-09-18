import { notFound } from "next/navigation";
import { Container, Card } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/button";
import { getCertificate } from "@/lib/mock-certificates";
import { getI18n } from "@/lib/i18n/server";
export default async function CertificatePage({ params }: { params: Promise<{ certificateId: string }> }) {
  const { certificateId } = await params; const certificate = getCertificate(certificateId); if (!certificate) notFound(); const { locale } = await getI18n();
  const date = new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", { dateStyle: "long", timeZone: "Asia/Seoul" }).format(new Date(certificate.completedAt));
  return <Container className="certificate-page"><p className="eyebrow">SOMSSI / PUBLIC VERIFICATION</p><div className="verified-mark">✓ <span>VERIFIED</span></div><h1>Certificate of Experience</h1><Card className="certificate-card"><p className="certificate-kicker">This certifies that</p><h2>{certificate.customerName}</h2><p>has completed</p><h3>{certificate.experienceTitle[locale]}</h3><p className="certificate-place">{certificate.venue}<br />{date}</p><p className="certificate-creator">Creator · {certificate.creatorName[locale]}</p><div className="qr-placeholder" role="img" aria-label={`QR code for ${certificate.certificateNumber}`}>{Array.from({ length: 25 }, (_, index) => <i key={index} data-dark={(index * 17 + certificate.id.length) % 3 !== 0} />)}</div><p className="certificate-id">{certificate.certificateNumber}</p></Card><p className="preview-note">Only the name, experience, date, creator, and certificate number are public. Contact and payment details remain private.</p><ButtonLink href={`/feedback/${certificate.bookingId}`}>Share your feedback</ButtonLink> <ButtonLink href="/experiences" variant="secondary">Explore another SOMSSI</ButtonLink></Container>;
}
