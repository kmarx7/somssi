# SOMSSI | 솜씨

한국의 솜씨를 배우는 여행 — Experience Korea by Hand.

## 현재 범위: PHASE 4

Next.js App Router, React, TypeScript strict, Tailwind CSS 기반의 공통 디자인 시스템과
Home·체험 탐색/상세·Creator 목록/상세·About, 체험별 Customize·가격 미리보기를 구현했습니다.
날짜·Session·예약 생성·결제·Supabase 연결은 다음 Phase에서 구현합니다.

```sh
npm ci
npm run dev
```

- `/`: 브랜드 소개, 체험 3개, 옵션 소개, Creator, 이용 순서, 인증서 미리보기.
- `/experiences`, `/experiences/gayageum`, `/experiences/knot`, `/experiences/minhwa`: 체험 탐색·상세.
- `/creators`, `/creators/[slug]`, `/about`: Creator 소개·브랜드 이야기.
- `/experiences/[slug]/customize`: 인원과 옵션을 선택하는 가격 미리보기.
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
public/images/           기존 이미지와 생성한 체험 이미지
docs/                    디자인 규칙과 구현 기록
somssi-site/             수정하지 않은 원본 HTML 프로토타입
```

기존 문서·발표자료는 로컬에 보존합니다. 웹앱과 관련된 파일만 선별하여 Git에 추가합니다.
기존 `pptxgenjs` 의존성은 기존 스크립트 호환성을 위해 유지하며 웹앱에서 import하지 않습니다.

## 작업 방식

새 기능은 `feat/<feature-name>` 브랜치에서 개발하고 검증 후 push합니다.
현재 변경은 `feat/phase-4-customize-pricing` 브랜치입니다. PHASE 3 브랜치를 기반으로 했으며,
사용자 요청 없이 main에 병합하지 않습니다.

디자인 사용법: [docs/phase-2.md](docs/phase-2.md).
이번 변경과 검증 범위: [docs/phase-3.md](docs/phase-3.md).
가격 미리보기와 검증 범위: [docs/phase-4.md](docs/phase-4.md).
