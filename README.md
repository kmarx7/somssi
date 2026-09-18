# SOMSSI | 솜씨

한국의 솜씨를 배우는 여행 — Experience Korea by Hand.

## 현재 범위: PHASE 10

Next.js App Router, React, TypeScript strict, Tailwind CSS 기반의 공통 디자인 시스템과
Home·체험 탐색/상세·Creator 목록/상세·About, 체험별 Customize·가격 미리보기,
Session·날짜·시간·인원 선택, Guest Checkout, Mock 결제, 예약 완료 화면을 구현했습니다.
실제 PG와 Supabase 영속 예약은 후속 Phase에서 연결합니다. 관리자 예약 확인·Check-in·체험 완료 흐름도 포함합니다.

```sh
npm ci
npm run dev
```

- `/`: 브랜드 소개, 체험 3개, 옵션 소개, Creator, 이용 순서, 인증서 미리보기.
- `/experiences`, `/experiences/gayageum`, `/experiences/knot`, `/experiences/minhwa`: 체험 탐색·상세.
- `/creators`, `/creators/[slug]`, `/about`: Creator 소개·브랜드 이야기.
- `/experiences/[slug]/customize`: 인원과 옵션을 선택하는 가격 미리보기.
- `/booking`: 선택한 체험의 날짜·시간·인원과 잔여석 확인.
- `/checkout`: 예약자 정보 입력, 서버 재계산 합계, Mock 결제.
- `/booking/complete/[bookingId]`: 예약번호·결제 상태·체험 정보를 보여주는 완료 화면.
- `/admin`, `/admin/bookings`: 개발용 예약 운영, CHECK IN, COMPLETE 상태 전환.
- `/certificate/[certificateId]`: 완료 체험 인증서와 공개 검증 화면.
- 가야금 Essential·Signature·Complete 패키지와 체험 타임라인.
- `/feedback/[bookingId]`: 완료 체험 만족도·NPS·후기 입력.
- `/booking/manage/[bookingId]`: 개발용 예약 취소 요청.
- Supabase 운영 마이그레이션: 패키지, NPS, 취소, 관리자 RLS.
- `/design-system`: 색상, 타이포그래피, 버튼, 폼, 카드, 단계, 상태 예시. 검색 인덱싱 제외.
- `npm run lint`, `npm run typecheck`, `npm run build`: 검증 명령.
- `npm run start`: 빌드 결과 실행.
- Node.js 20.9 이상 필요. 현재 실행에 환경변수는 필요하지 않습니다.

## 구조

```text
app/                     App Router, 공통 레이아웃, 디자인 시스템 확인 화면
components/layout/       기존 로고를 재사용한 Header·Footer
components/ui/           공통 UI 컴포넌트
components/design-system/ 입력·인원 선택 검증 예시
lib/i18n/                영어·한국어 사전과 서버 로케일 조회
lib/catalog.ts           UI와 분리한 체험·Creator·옵션 미리보기 데이터
lib/pricing.ts           인원당·예약당 옵션을 구분하는 순수 가격 미리보기 함수
lib/sessions.ts          Session 미리보기와 잔여석 계산
lib/booking-draft.ts     예약 query draft 검증과 합계 계산
supabase/                초기 스키마, RLS, 동시성 안전 예약 함수, seed
public/images/           기존 이미지와 생성한 체험 이미지
docs/                    디자인 규칙과 구현 기록
somssi-site/             수정하지 않은 원본 HTML 프로토타입
```

기존 문서·발표자료는 로컬에 보존합니다. 웹앱과 관련된 파일만 선별하여 Git에 추가합니다.
기존 `pptxgenjs` 의존성은 기존 스크립트 호환성을 위해 유지하며 웹앱에서 import하지 않습니다.

## 작업 방식

새 기능은 `feat/<feature-name>` 브랜치에서 개발하고 검증 후 push합니다.
현재 변경은 `feat/phase-10-production-operations` 브랜치입니다. PHASE 9 브랜치를 기반으로 했으며,
사용자 요청 없이 main에 병합하지 않습니다.

디자인 사용법: [docs/phase-2.md](docs/phase-2.md).
이번 변경과 검증 범위: [docs/phase-3.md](docs/phase-3.md).
가격 미리보기와 검증 범위: [docs/phase-4.md](docs/phase-4.md).
Session·정원 검증과 설정: [docs/phase-5.md](docs/phase-5.md).
Checkout·Mock 결제 범위: [docs/phase-6.md](docs/phase-6.md).
관리자 Check-in·완료 범위: [docs/phase-7.md](docs/phase-7.md).
인증서·공개 검증 범위: [docs/phase-8.md](docs/phase-8.md).
Signature 패키지·후기 범위: [docs/phase-9.md](docs/phase-9.md).
Production 운영 기반: [docs/phase-10.md](docs/phase-10.md).
