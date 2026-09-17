# PHASE 5 — Session / Calendar / Guest / Booking foundation

## 구현

- `/booking?experience=<slug>&guests=<n>&options=<codes>` 예약 첫 단계 화면.
- 체험별 Session 날짜·시간·장소·잔여석 표시.
- 1–6명 인원 선택. 세션 잔여석보다 큰 인원은 disabled 처리하고 `Full` 상태를 표시.
- 선택한 세션을 `/checkout` query draft로 이어갈 링크를 준비. Checkout과 예약 저장은 PHASE 6에서 구현.
- `/api/booking/availability?experience=<slug>` 공개 가능한 Session 필드만 반환하는 API preview.
- `lib/sessions.ts`와 `lib/booking-draft.ts`로 UI와 Session·draft 파싱 로직을 분리.

## Supabase migration

`supabase/migrations/0001_somssi_booking_foundation.sql`에 profiles, creators, experiences, options,
experience_options, venues, sessions, bookings, booking_options, payments, certificates, reviews,
media_assets 테이블을 추가했습니다. 모든 public 테이블에 RLS를 켜고 공개 체험·Creator·옵션·Session과
고객 소유 Booking·Certificate 정책을 분리했습니다. 공개 Certificate는 `public_visible = true`만 읽습니다.

`public.reserve_session(uuid, integer)`는 `SELECT ... FOR UPDATE`로 Session 행을 잠근 뒤 잔여석을 확인하고
booked_count를 한 번에 증가시킵니다. 두 요청이 동시에 들어와도 같은 Session의 capacity를 초과하지 않도록
DB 트랜잭션 경계에서 처리합니다. 함수는 public·anon·authenticated 실행 권한을 회수했으며, 이후 예약 서버
서비스에서 필요한 최소 권한으로 호출할 예정입니다.

Supabase CLI가 이 환경에 없어 migration 생성 명령이나 원격 SQL 실행은 하지 않았습니다. SQL Editor 또는
CLI 설치 후 migration → seed 순서로 적용해야 합니다. `supabase/seed.sql`은 샘플 Venue 2개, Creator 3개,
Experience 3개, Options 3개, Gayageum·Knot Session을 제공합니다. 중복 실행 시 일부 unique 키는 안전하게 무시합니다.

## preview와 production 경계

앱의 `lib/sessions.ts` 데이터는 로컬 미리보기입니다. API는 이 데이터를 반환하며 데이터베이스를 자동으로
감지하지 않습니다. Supabase URL·publishable key·server client는 아직 연결하지 않았고, service role key도
사용하지 않았습니다. 최종 예약 생성에서는 client가 보낸 가격·잔여석·옵션을 신뢰하지 않고 DB 재조회와
`reserve_session` 호출을 통해 다시 검증해야 합니다.

`/checkout` 경로는 PHASE 6에서 고객정보·결제와 함께 추가합니다. 현재 선택 세션 링크가 해당 경로를
준비하지만, 결제·예약을 시도하지 않습니다.

## 검증

- `npm run lint`, `npm run typecheck`, `npm run build` 통과.
- 예약 query 없이 잘못된 체험 slug는 notFound.
- 가야금 Session 3개가 표시되고 6명 정원·2/4 booked 기준 잔여석이 각각 4/2로 계산.
- 2명에서 3명으로 바꾸면 4자리 Session은 선택 가능, 2자리 Session은 disabled.
- 세션을 선택하면 `/checkout?experience=...&session=...&guests=...&options=...` 링크가 생성.
- API preview는 customer 개인정보나 결제정보를 반환하지 않음.
- 320px 모바일·데스크톱 가로 넘침 확인, 예약 첫 단계에서 단계 표시와 명확한 선택 안내 제공.

## 다음 단계

PHASE 6: 고객정보 Guest Checkout, 서버 가격 재계산, Mock Payment Provider, Booking 생성·완료.
PHASE 5의 SQL은 실제 Supabase project에 적용한 뒤 `supabase db advisors`와 테스트 쿼리로 정책·함수 결과를 확인해야 합니다.
