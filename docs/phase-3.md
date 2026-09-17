# PHASE 3 — Discover / Explore / Choose

## 범위

- 기존 PHASE 2 기반을 유지하고 새 기능 브랜치 `feat/phase-3-experience-discovery`에서 구현.
- Home: Hero, Learn·Do·Keep, 체험 3개, 옵션 소개, Creator, 이용 순서, 인증서 미리보기, 마지막 CTA.
- `/experiences`: 가야금·매듭·민화 3개만 표시.
- `/experiences/[slug]`: 체험 상세·정보·활동·Creator·포함사항·독립 옵션·장소·취소 안내.
- `/creators`, `/creators/[slug]`: 샘플 Creator 목록·상세, 관련 체험 연결.
- `/about`: 브랜드 소개. 기존 추천 플랫폼·AI·아리랑 한 곡 완주 중심 문구를 사용하지 않음.
- 공통 탐색 메뉴와 현재 메뉴 표시, 영문/한국어 콘텐츠·메타데이터.

## 구조와 이유

| 파일 | 역할 |
| --- | --- |
| `lib/catalog.ts` | 체험·Creator·옵션 데이터와 조회 함수. UI에 상품별 데이터 복제 방지 |
| `lib/i18n/discovery.ts` | PHASE 3 한·영 문구. 기존 공통 UI 사전 유지 |
| `components/discovery/experience-card.tsx` | Home·탐색·관련 체험에서 동일 카드 재사용 |
| `components/discovery/creator-card.tsx` | Home·Creator 목록·체험 상세에서 재사용 |
| `components/discovery/sections.tsx` | Learn/Do/Keep, 옵션 소개, 인증서 미리보기, 최종 CTA |
| `components/discovery/booking-preview.tsx` | 데스크톱 sticky·모바일 하단 고정 예약 준비 안내 |
| `components/layout/site-navigation.tsx` | 경로 기반 활성 메뉴. 작은 Client Component만 사용 |
| `app/globals.css` | 기존 토큰을 재사용한 모바일 우선 페이지 레이아웃 |

체험 가격: 가야금 99,000원, 매듭 79,000원, 민화 89,000원.
옵션은 별도 배열·체험 연결 테이블 형태로 분리했습니다. 1인당/예약당 가격 표시는 있지만
옵션 선택과 계산은 PHASE 4에서 구현합니다.

## 샘플과 실제 기능 구분

- Creator 이름·소개, 진행 시간·인원, 장소와 가격은 미리보기 데이터이며 화면에 명시했습니다.
- Creator 이미지로 실존 인물을 사칭하지 않고 이니셜을 사용했습니다. 샘플 프로필 상세는 noindex입니다.
- 예약 버튼은 오픈 준비 중으로 비활성화했습니다. 없는 Customize 경로로 이동시키지 않습니다.
- 장소·취소 규정은 확정 전임을 안내합니다. 실제 주소나 환불 조건을 지어내지 않습니다.
- 인증서는 SAMPLE/미발급 표시가 있는 시각적 미리보기이며 발급·검증·QR 기능은 포함하지 않습니다.
- Supabase·Auth·실제 예약 및 결제는 연결하지 않았습니다.

## 이미지

- `gayageum-experience.png`, `hanok-culture.png`: 기존 프로토타입 자산 재사용.
- `knot-experience.png`, `minhwa-experience.png`: built-in imagegen으로 생성한 분위기용 이미지.
- 상세페이지에서 실제 현장과 다를 수 있음을 안내합니다. 출시 전 실제 운영 사진과 대조·교체해야 합니다.
- `somssi-site/` 원본은 수정하지 않았습니다.

## 검증

- lint·TypeScript typecheck·Webpack production build 통과.
- 프로덕션 빌드에서 Home CTA의 키보드 이동 → 체험 탐색 확인.
- 체험 3개·Creator 3개·About의 정상 응답과 한국어 렌더링 확인.
- 한국어 전환 시 html lang·페이지 제목·본문 변경, 이동 후 설정 유지 확인.
- 320px·390px·768px 화면 가로 넘침 없음. 1440px 상세 sticky 카드와 모바일 CTA 숨김 확인.
- 모바일 상세의 fixed 예약 준비 영역 확인. 데스크톱·모바일 스크린샷 검토.
- 브라우저 오류 로그·오류 overlay 없음.
- 없는 slug는 notFound 안내와 noindex로 처리합니다. Next.js 스트리밍 응답에서는 HTTP 200으로 전달되는 경우가 있어, HTTP 404 보장을 완료했다고 주장하지 않습니다.
- 기존 디자인 시스템과 원본 정적 사이트는 보존.

## 다음 단계

PHASE 4: Customize, 체험별 옵션 선택, 인원당/예약당 계산, 가격 Preview.
PHASE 5부터 DB 기준 서버 재계산·Session·초과예약 방지를 연결합니다.
기존 pptxgenjs 의존성 보안 이슈는 PHASE 2 보고서에 기록한 상태로 유지됩니다.
