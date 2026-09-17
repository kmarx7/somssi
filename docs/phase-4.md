# PHASE 4 — Customize / Option / Price Preview

## 구현 범위

- `app/experiences/[slug]/customize/page.tsx`: 체험별 Customize 화면. 지원하지 않는 slug는 notFound 처리.
- `components/customize/customize-form.tsx`: 인원 수와 옵션을 선택하는 Client Component.
- `lib/pricing.ts`: UI에 종속되지 않은 순수 가격 미리보기 함수.
- 상세페이지의 준비 중 CTA를 Customize로 연결하고, 모바일 하단 CTA도 같은 경로를 사용.
- Customize 화면은 index를 제외하고, 아직 예약 가능한 일정이나 결제를 제공하지 않음.

## 가격 규칙

`base_price × guest_count`에 선택한 옵션을 더합니다.

- `HANBOK` 20,000원 × 인원
- `TEA_SNACK` 10,000원 × 인원
- `PHOTO` 20,000원 × 예약 1건

예: 가야금 2명 + 한복 + 사진 = 99,000 × 2 + 20,000 × 2 + 20,000 = 258,000원.

모든 값은 현재 `lib/catalog.ts` 미리보기 데이터에서 읽습니다. `lib/pricing.ts`의 주석처럼 최종 결제 금액을 확정하는 서버 함수가 아닙니다. Phase 5에서 DB의 세션·체험·옵션 값을 다시 읽어 같은 계산을 서버에서 수행하고, 클라이언트가 보낸 금액은 신뢰하지 않습니다.

## UX와 접근성

- 인원은 체험 `maxGuests`를 상한으로 사용하고, 1명 이상만 선택할 수 있습니다.
- 각 옵션은 native checkbox와 명시적 label을 사용합니다. 선택 시 border와 좌측 선, 체크 상태 텍스트를 함께 표시합니다.
- 옵션별 현재 인원 적용 금액과 예약당 금액을 구분해서 보여줍니다.
- Summary는 `aria-live="polite"`로 선택 변경 후 보조기기에 금액을 알립니다.
- 데스크톱 Summary는 sticky, 모바일은 일반 흐름으로 표시합니다. 실제 예약 단계가 생기면 모바일 고정 CTA를 이어 사용합니다.
- 날짜를 선택하기 전이므로 Continue 링크는 Phase 5에서 구현할 `/booking` 경로와 query 값을 준비하지만, 아직 해당 경로는 만들지 않았습니다.

## 검증

- `npm run lint`, `npm run typecheck`, `npm run build` 통과.
- Production 페이지에서 가야금 Customize의 3개 옵션과 초기 2명 기본금액 198,000원 확인.
- DOM 이벤트로 한복·사진 선택 시 2명 기준 258,000원 계산과 `options=HANBOK,PHOTO` 링크 확인.
- 인원 3명으로 변경 시 금액이 297,000원(옵션 미선택)으로 갱신됨을 확인.
- 320px·768px·데스크톱에서 가로 넘침 없음, 데스크톱 sticky Summary 확인.
- 상세 CTA → Customize 경로, 한국어 제목·문구, noindex 메타 확인.
- 예약·결제·DB·초과예약 검증은 포함하지 않습니다.

## 이미지와 범위

Phase 3에서 추가한 체험 이미지와 기존 이미지 자산은 유지합니다. Customize는 사진·한복·차 옵션을 데이터에서 읽지만, 실제 재고·일정·옵션별 제공 여부는 Phase 5에서 Supabase 연결 후 검증합니다.
