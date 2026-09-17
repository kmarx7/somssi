export const locales = ["en", "ko"] as const;
export type Locale = (typeof locales)[number];
export const localeCookie = "somssi-locale";
export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "ko";
}

const en = {
  skip: "Skip to content", home: "Home", menu: "Menu", navigation: "Main navigation",
  tagline: "Experience Korea by Hand.", philosophy: "Culture is something you do.",
  intro: "Play, make, and paint. Discover Korean culture through the hands of local artists.",
  preparing: "A new way to experience Korea is taking shape.",
  footer: "Learn something. Make something. Keep a little Korea.",
  system: "Design system", systemIntro: "The shared foundations of SOMSSI. A working reference for our experience, booking, and journal pages.",
  foundations: "Foundations", palette: "Inspired by materials, grounded in craft.",
  type: "Typography", typeTitle: "Quiet words. Lasting impressions.",
  typeBody: "Learn from local artists, discover the materials, and make a memory with your own hands.",
  controls: "Actions & forms", controlsTitle: "Clear at every step.",
  primary: "Continue", secondary: "Go back", subtle: "See details", disabled: "Unavailable", pending: "Please wait…",
  firstName: "First name", email: "Email", emailHint: "Your booking updates will arrive here.",
  emailError: "Enter a valid email address, such as name@example.com.",
  language: "Experience language", consent: "I agree to the booking terms.",
  demoSubmit: "Check example form", demoSuccess: "Example form checked. No information was sent or saved.",
  composition: "Cards & progress", compositionTitle: "One thoughtful experience at a time.",
  sample: "Component example", gayageum: "Gayageum Experience", gayageumKo: "줄을 다루는 솜씨",
  cardBody: "Discover the instrument, pluck the strings, and explore a short melody.",
  imageAlt: "Gayageum experience in a Korean interior", perPerson: "per person", guests: "Guests",
  decrease: "Remove one guest", increase: "Add one guest", selected: "Selected", available: "Available",
  steps: ["Date & time", "Guests & options", "Details & payment"], progress: "Booking progress", finished: "Completed",
  feedback: "Feedback & states", feedbackTitle: "Always know where you are.",
  emptyTitle: "Your story starts here.", emptyBody: "Your completed experiences will appear here.",
  errorTitle: "Something needs another try.", errorBody: "We could not load this page. Please try again.",
  retry: "Try again", loading: "Loading…", notFound: "We could not find that page.",
  notFoundBody: "Use the home link to continue exploring SOMSSI.",
};

export type Dictionary = typeof en;
const ko: Dictionary = {
  skip: "본문으로 건너뛰기", home: "홈", menu: "메뉴", navigation: "주요 메뉴",
  tagline: "한국의 솜씨를 배우는 여행", philosophy: "문화는 보는 것이 아니라, 해보는 것이다.",
  intro: "직접 연주하고, 만들고, 그려보세요. 지역 예술인의 손끝에서 한국의 문화를 배웁니다.",
  preparing: "한국을 경험하는 새로운 여행을 준비하고 있습니다.",
  footer: "배우고, 직접 해보고, 기억으로 남깁니다.",
  system: "디자인 시스템", systemIntro: "솜씨의 공통 디자인 기준입니다. 체험, 예약, 기록장에 사용할 컴포넌트를 확인합니다.",
  foundations: "기본 요소", palette: "재료에서 시작하는 한국의 빛깔.",
  type: "타이포그래피", typeTitle: "담백한 말, 오래 남는 경험.",
  typeBody: "지역 예술인에게 배우고, 재료를 이해하고, 나의 손으로 여행의 기억을 만듭니다.",
  controls: "버튼과 입력", controlsTitle: "매 순간, 명확한 선택.",
  primary: "계속하기", secondary: "뒤로", subtle: "자세히 보기", disabled: "이용 불가", pending: "처리 중…",
  firstName: "이름", email: "이메일", emailHint: "예약 안내를 받을 이메일을 입력해 주세요.",
  emailError: "name@example.com과 같은 올바른 이메일을 입력해 주세요.",
  language: "체험 진행 언어", consent: "예약 약관에 동의합니다.",
  demoSubmit: "예시 입력 확인", demoSuccess: "예시 입력을 확인했습니다. 정보는 전송하거나 저장하지 않았습니다.",
  composition: "카드와 단계", compositionTitle: "하나씩, 나만의 솜씨.",
  sample: "컴포넌트 예시", gayageum: "Gayageum Experience", gayageumKo: "줄을 다루는 솜씨",
  cardBody: "악기의 구조와 소리를 이해하고, 직접 줄을 뜯으며 짧은 선율을 경험합니다.",
  imageAlt: "한국적인 실내 공간의 가야금 체험 이미지", perPerson: "1인 기준", guests: "인원",
  decrease: "인원 1명 줄이기", increase: "인원 1명 늘리기", selected: "선택됨", available: "예약 가능",
  steps: ["날짜·시간", "인원·옵션", "고객정보·결제"], progress: "예약 진행 단계", finished: "완료",
  feedback: "안내와 상태", feedbackTitle: "지금의 상태를 분명하게.",
  emptyTitle: "나의 솜씨가 시작되는 곳.", emptyBody: "완료한 체험이 이곳에 쌓입니다.",
  errorTitle: "다시 시도해 주세요.", errorBody: "페이지를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
  retry: "다시 시도", loading: "불러오는 중…", notFound: "페이지를 찾을 수 없습니다.",
  notFoundBody: "홈으로 돌아가 솜씨를 만나보세요.",
};

export const dictionaries: Record<Locale, Dictionary> = { en, ko };
