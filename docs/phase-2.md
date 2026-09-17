# PHASE 2 — 디자인 시스템과 공통 컴포넌트

## 보존과 변경

- `somssi-site/`의 HTML·CSS·JS·이미지 원본은 수정하지 않았습니다.
- 기존 SVG 로고를 `Brand` 컴포넌트로 옮기고, 기존 가야금·한옥 이미지를 `public/images/`에 재사용했습니다.
- 루트 package.json의 발표자료 도구를 유지하면서 웹앱 실행·검증 명령을 추가했습니다.
- 사업계획서, 발표자료와 개인 도구 설정은 웹앱 push 대상에서 제외합니다.
- Next.js가 생성한 AGENTS.md·CLAUDE.md를 유지하며, 브랜치 작업 규칙을 AGENTS.md에 기록합니다.

## 색상과 글꼴

`app/globals.css`의 CSS 변수가 색상 원본이며 Tailwind `@theme inline`으로 연결됩니다.

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| hanji | #F7F4ED | 페이지 배경 |
| surface | #FFFDF8 | 카드·입력 배경 |
| ink | #171714 | 본문·제목 |
| celadon | #7F9D8B | 주요 버튼, 완료 단계 |
| persimmon | #B96C4A | 보조 장식 |
| brass | #B89B62 | 인증서 등 프리미엄 장식 |
| gayageum | #6E5542 | 가야금 강조 |
| knot | #A95850 | 매듭 강조 |
| minhwa | #617A8A | 민화 강조 |

청자색 버튼에는 먹색 글자를 사용합니다. 브랜드 강조색을 작은 글씨에 무조건 적용하지 않고,
본문·오류·성공 문구에는 별도의 대비가 높은 semantic token을 사용합니다.

- UI: Inter → Pretendard → 시스템 sans-serif. Editorial: Cormorant Garamond → 시스템 serif.
- 외부 웹폰트 요청은 없습니다. 명명된 폰트가 설치되지 않으면 시스템 폰트로 표시됩니다.
- 본문·입력·버튼 16px 이상. 보조 eyebrow·색상 코드·로고 부제만 작은 크기를 사용합니다.
- 제목은 `clamp`로 반응형 크기를 사용합니다.
- 간격은 주로 4px 배수, 표면 모서리는 4px로 제한합니다.
- 모바일 기본, 태블릿 768px, 데스크톱 1024px. Tailwind md/lg와 동일합니다.

## 공통 컴포넌트

| 파일 | 구성과 목적 |
| --- | --- |
| `components/layout/brand.tsx` | 원본 로고, 홈 링크 |
| `site-header.tsx`, `site-footer.tsx` | 공통 브랜드 레이아웃과 언어 전환 |
| `ui/button.tsx` | Button / ButtonLink, primary·secondary·quiet, disabled·pending |
| `ui/field.tsx` | InputField / SelectField / CheckboxField, label·hint·error 연결 |
| `ui/layout.tsx` | Container / SectionHeading / Card / Badge |
| `ui/price.tsx` | KRW 금액 표시. 가격 계산·결제 확정 기능은 없음 |
| `ui/stepper.tsx` | 현재·완료 단계, aria-current와 완료 안내 |
| `ui/quantity-input.tsx` | 최소·최대 인원, 접근 가능한 증감 버튼 |
| `ui/states.tsx` | Empty / Error / Loading / Skeleton |

컴포넌트는 메시지를 props로 받습니다. 서버 페이지는 `getI18n()`으로 사전을 가져옵니다.
영어를 기본으로 하며 `somssi-locale` 쿠키에 사용자의 선택을 저장합니다.
서버 액션에서 en/ko만 허용하고 html lang도 함께 갱신합니다. 쿠키 조회로 페이지는 동적 렌더링됩니다.
오류 boundary는 사전 조회 실패에도 표시할 수 있도록 두 언어의 안전한 일반 안내를 제공합니다.

Server Component를 기본으로 사용하며, 인원 선택·예시 폼·오류 재시도만 Client Component입니다.
가짜 상품 경로와 예약 버튼은 공통 Header에 추가하지 않았습니다. PHASE 3 이후 실제 경로에 연결합니다.

## 접근성

- 버튼·링크 컨트롤 최소 44px, 기본 버튼·입력 48px.
- native input/select/checkbox와 명시적 label 사용.
- 오류는 aria-invalid·aria-describedby·role=alert로 연결하고 예시 폼은 오류 필드에 포커스 이동.
- 본문 건너뛰기, focus-visible, 현재 단계·완료 텍스트, 로딩 status 제공.
- 정보 이미지에 alt, 장식 이미지는 빈 alt. 모션 감소 설정 존중.
- 확인 페이지의 버튼 변형은 스타일 예시이며 실제 예약 액션이 아닙니다.
- 예시 폼은 이메일 형식만 검증하며 저장·전송하지 않습니다. 약관·고객정보 검증은 Checkout 구현 범위입니다.

## 검증과 제한

- `npm run lint`: 경고 없이 통과.
- `npm run typecheck`: 통과.
- 프로덕션 Webpack 빌드 통과. Turbopack의 내부 포트 생성 오류가 이 실행환경에서 반복되어 build 스크립트를 `next build --webpack`으로 고정했습니다. dev는 Next.js 기본 번들러를 사용합니다.
- 브라우저에서 영어·한국어 전환, html lang과 페이지 이동 후 언어 유지 확인.
- 잘못된 이메일의 aria-invalid·오류 메시지·포커스 이동, 정상 이메일의 성공 안내 확인.
- 키보드 Enter를 통한 인원 증감 확인. DB 정원 검증은 이후 Phase 범위입니다.
- 320px·390px 모바일과 768px 태블릿에서 가로 넘침 없음. 데스크톱 스크린샷 검토.
- 원본 프로토타입 23개 파일의 SHA-256 비교: 변경 없음.
- 자동 클릭에서 일부 이벤트가 재현되지 않아 키보드 및 DOM 이벤트로도 확인했습니다. 전체 접근성 감사와 시나리오 A~E 검증은 PHASE 10 범위입니다.

PHASE 2는 Supabase·결제·예약 관련 비즈니스 로직을 포함하지 않습니다.
디자인 시스템은 noindex지만 접근 제한 페이지는 아닙니다. 개인정보나 비밀 값을 담지 않습니다.
이미지는 원본 프로토타입 자산이며 실제 운영 전 사용 권한과 체험 내용 일치 여부를 확인해야 합니다.

`npm audit`에서 기존 pptxgenjs → image-size 경로에 high 항목 2개가 보고됩니다.
해당 도구는 웹앱에서 사용하지 않으며, 기존 문서 생성 환경을 변경하는 강제 다운그레이드는 적용하지 않았습니다.
문서 생성 도구 분리와 호환 가능한 의존성 보안 업데이트는 후속 작업입니다.
