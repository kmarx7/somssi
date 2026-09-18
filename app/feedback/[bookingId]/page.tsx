import { notFound } from "next/navigation";
import { Container, Card } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { getBooking } from "@/lib/mock-bookings";
import { getReview } from "@/lib/mock-reviews";
import { submitReview } from "@/app/actions/reviews";
import { getI18n } from "@/lib/i18n/server";
export const dynamic = "force-dynamic";
export default async function FeedbackPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params; const booking = getBooking(bookingId); if (!booking || booking.status !== "COMPLETED") notFound(); const { locale } = await getI18n(); const review = getReview(bookingId); if (review) return <Container className="feedback-page"><p className="eyebrow">SOMSSI / THANK YOU</p><h1>{locale === "ko" ? "소중한 경험을 기록했습니다." : "Your experience is recorded."}</h1><p>{locale === "ko" ? "다음 솜씨에서 다시 만나요." : "We hope to see you at your next SOMSSI."}</p></Container>;
  return <Container className="feedback-page"><header className="page-intro"><p className="eyebrow">SOMSSI / FEEDBACK</p><h1>{locale === "ko" ? "오늘의 솜씨는 어땠나요?" : "How was your SOMSSI?"}</h1><p>{locale === "ko" ? "짧은 답변이 다음 체험을 더 좋게 만듭니다." : "A few answers help us make the next experience better."}</p></header><Card><form action={submitReview} className="feedback-form"><input type="hidden" name="bookingId" value={bookingId} /><label htmlFor="rating">{locale === "ko" ? "전체 만족도" : "Overall rating"}</label><select id="rating" name="rating" defaultValue="5" className="input">{[5,4,3,2,1].map((value) => <option key={value} value={value}>{value} / 5</option>)}</select><label htmlFor="nps">{locale === "ko" ? "친구에게 추천할 가능성" : "How likely are you to recommend us?"}</label><select id="nps" name="nps" defaultValue="10" className="input">{Array.from({ length: 11 }, (_, value) => <option key={value} value={value}>{value} / 10</option>)}</select><label htmlFor="comment">{locale === "ko" ? "남기고 싶은 이야기" : "Tell us about it"}</label><textarea id="comment" name="comment" className="input" rows={5} placeholder={locale === "ko" ? "가장 기억에 남은 순간을 알려주세요." : "What moment stayed with you?"} /><Button type="submit">{locale === "ko" ? "후기 보내기" : "Send feedback"}</Button></form></Card></Container>;
}
