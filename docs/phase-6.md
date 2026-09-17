# PHASE 6 — Checkout & Mock Payment

## 변경 범위

- Guest Checkout 폼: 이름, 이메일, 국가, 선택 전화번호, 체험 언어, 약관 동의
- 서버 액션에서 필수 입력·이메일·약관 검증
- `calculatePreviewPrice`를 예약 생성 직전에 다시 호출해 금액 재계산
- `PaymentProvider` 인터페이스와 개발 전용 `MockPaymentProvider`
- 예약 생성 후 `/booking/complete/[bookingId]` 확인 화면
- 동일 프로세스 내 Mock 정원 예약 잠금으로 동시 제출 초과예약 방지 시나리오 검증

## 현재 경계

`lib/mock-bookings.ts`는 Supabase가 연결되기 전 개발용 메모리 저장소다. 서버 재시작 또는 여러 인스턴스 간에는 유지되지 않는다. `MockPaymentProvider`도 실제 결제·환불을 처리하지 않는다. 운영 전에는 Supabase 트랜잭션 예약 함수와 실제 PG provider, webhook 검증으로 교체해야 한다.

## 주요 파일

- `app/actions/booking.ts`
- `app/checkout/page.tsx`
- `components/checkout/checkout-form.tsx`
- `app/booking/complete/[bookingId]/page.tsx`
- `lib/payment.ts`
- `lib/mock-bookings.ts`
