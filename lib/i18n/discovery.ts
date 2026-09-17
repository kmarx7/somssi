import type { Locale } from "./dictionaries";

const en = {
  experiences: "Experiences", creators: "Creators", about: "Our story", explore: "Find your SOMSSI", all: "Explore all experiences", view: "Discover the experience", meet: "Meet the creator",
  hero: "Don't just see Korea.", heroEm: "Feel it in your hands.", heroBody: "Pluck a string. Tie a knot. Bring a painting to life. Learn Korean culture, one meaningful moment at a time.",
  learn: "Learn", do: "Do", keep: "Keep", learnBody: "Meet the stories, materials, and people behind the craft.", doBody: "Try it yourself, with a local artist by your side.", keepBody: "Take a new skill, a keepsake, and a memory home.",
  choose: "Choose your SOMSSI", chooseBody: "Three ways to make Korea part of your story. No experience needed — just curiosity.",
  yours: "Make it yours.", yoursBody: "Your core experience comes first. Add a little more to your day with these optional extras.",
  creatorTitle: "The hands behind your experience.", creatorBody: "Learn directly from the people who keep a craft alive — through patience, practice, and a personal touch.",
  how: "A little curiosity is all it takes.", steps: ["Choose", "Customize", "Book", "Experience", "Certificate"],
  certificate: "A memory, made official.", certificateBody: "After you complete your experience, your SOMSSI certificate records what you learned and who you learned it with. The beginning of your own cultural journal.",
  preview: "Preview", certificatePreview: "Certificate preview — not a valid certificate", certifies: "This certifies that", guest: "Your name", completed: "has completed", sampleId: "SAMPLE · NOT ISSUED",
  final: "What's your SOMSSI?", finalBody: "Start with the craft that speaks to you.",
  exploreTitle: "Three crafts. Your first SOMSSI.", exploreBody: "Sound, thread, or color. Find your way into Korean culture through something you do yourself.",
  previewNotice: "Experience preview · Reservations open soon. Prices, creators, and session details are samples and will be confirmed before booking opens.",
  duration: "Duration", minutes: "min", guests: "Guests", language: "Language", location: "Location", difficulty: "Level", beginner: "Beginner friendly", bilingual: "English · Korean", incheon: "Incheon, Korea", venue: "Partner craft space in Incheon", venueBody: "The exact venue, address, and accessibility details will be available with each session before you book.",
  what: "What you'll experience", included: "What's included", optional: "Optional add-ons", cancellation: "Cancellation policy", cancellationBody: "The cancellation and refund terms will be shown before you book. Reservations are not yet open, and no payment is being collected.",
  booking: "Your first step into the craft.", bookingSoon: "Reservations open soon", bookingBody: "Dates and available places are being prepared. Explore the experience now and return when reservations open.", perPerson: "per person", perBooking: "per booking", corePrice: "Core experience", optionalNote: "Add-ons are optional and priced separately.", other: "Your next SOMSSI", sampleCreator: "Sample creator", creatorProfiles: "People who share their craft.", creatorIntro: "Meet the sample profiles behind our first three experiences. Confirmed creator introductions will follow before reservations open.", creatorExperience: "Learn with this creator", back: "All experiences", backCreators: "All creators", aboutTitle: "Culture is something you do.", aboutBody: "SOMSSI means skill, craft, and the care of a practiced hand. We bring travelers and local artists together to share the feeling of making something for the first time.", aboutSecond: "We start small: three experiences, each built around a real encounter with a craft. The instrument, the thread, the brush — and the person who helps you discover it.",
  aboutValues: "Learn it. Try it. Make it yours.", noExperience: "No previous experience required", imageNote: "Illustrative experience images; actual setting may differ.",
};
const ko: typeof en = {
  experiences: "솜씨 체험", creators: "Creator", about: "솜씨 이야기", explore: "솜씨 체험 찾기", all: "모든 체험 보기", view: "체험 자세히 보기", meet: "Creator 만나기",
  hero: "한국을 보는 여행에서,", heroEm: "손으로 배우는 여행으로.", heroBody: "줄을 뜯고, 매듭을 묶고, 빛깔을 더해보세요. 직접 해보는 순간, 한국의 문화가 나의 경험이 됩니다.",
  learn: "배우고", do: "직접 해보고", keep: "기억으로 남깁니다", learnBody: "솜씨에 담긴 이야기와 재료, 사람을 만납니다.", doBody: "지역 예술인의 안내를 따라 내 손으로 경험합니다.", keepBody: "새로운 감각과 작은 결과물, 여행의 기억을 가져갑니다.",
  choose: "나의 솜씨를 골라보세요", chooseBody: "한국을 경험하는 세 가지 방법. 처음이어도 괜찮아요. 호기심만 가져오세요.",
  yours: "나만의 경험을 더하세요.", yoursBody: "핵심 체험을 먼저 고르고, 원하는 옵션으로 하루를 조금 더 특별하게 만들어보세요.",
  creatorTitle: "나의 경험을 함께 만드는 손.", creatorBody: "솜씨를 이어가는 사람에게 직접 배웁니다. 차근차근 쌓은 시간과 감각을 함께 나누는 경험입니다.",
  how: "작은 호기심에서 시작합니다.", steps: ["선택", "옵션", "예약", "체험", "인증"],
  certificate: "나의 경험이 기록이 됩니다.", certificateBody: "체험을 마치면 무엇을, 누구에게 배웠는지 담은 SOMSSI 인증서를 받습니다. 나만의 문화체험 기록장이 시작됩니다.",
  preview: "미리보기", certificatePreview: "인증서 미리보기 — 유효한 인증서가 아닙니다", certifies: "이 인증서는", guest: "나의 이름", completed: "님의 다음 체험 완료를 기록합니다", sampleId: "SAMPLE · 미발급",
  final: "당신의 솜씨는 무엇인가요?", finalBody: "마음이 향하는 솜씨부터 시작해 보세요.",
  exploreTitle: "세 가지 솜씨, 나의 첫 경험.", exploreBody: "소리, 실, 빛깔. 직접 해보는 경험으로 한국의 문화를 만나보세요.",
  previewNotice: "체험 미리보기 · 예약 오픈 준비 중입니다. 가격·Creator·진행 정보는 샘플이며 예약 오픈 전에 확정됩니다.",
  duration: "진행 시간", minutes: "분", guests: "인원", language: "진행 언어", location: "장소", difficulty: "난이도", beginner: "초보자 가능", bilingual: "English · 한국어", incheon: "인천, 한국", venue: "인천 파트너 문화공간", venueBody: "정확한 장소와 주소, 접근성 정보는 예약 전에 각 일정에서 확인할 수 있도록 안내할 예정입니다.",
  what: "이렇게 경험합니다", included: "포함 사항", optional: "선택 가능한 옵션", cancellation: "취소 규정", cancellationBody: "예약 전에 취소 및 환불 조건을 안내할 예정입니다. 현재는 예약 오픈 전이며 결제를 받지 않습니다.",
  booking: "나의 솜씨를 시작해 보세요.", bookingSoon: "예약 오픈 준비 중", bookingBody: "예약 가능한 날짜와 자리를 준비하고 있습니다. 체험을 먼저 살펴보고 예약 오픈 후 다시 만나주세요.", perPerson: "1인 기준", perBooking: "예약 1건 기준", corePrice: "핵심 체험", optionalNote: "옵션은 선택 사항이며 별도 금액이 적용됩니다.", other: "다음으로 만날 솜씨", sampleCreator: "샘플 Creator", creatorProfiles: "솜씨를 나누는 사람들.", creatorIntro: "첫 세 가지 체험의 샘플 프로필을 만나보세요. 실제 참여 Creator는 예약 오픈 전에 확정하여 소개합니다.", creatorExperience: "이 Creator와 함께할 체험", back: "모든 체험", backCreators: "모든 Creator", aboutTitle: "문화는 보는 것이 아니라, 해보는 것이다.", aboutBody: "솜씨는 손으로 무언가를 만들어내는 능력이며, 오랜 시간 쌓아온 감각입니다. SOMSSI는 여행자와 지역 예술인을 연결해 처음 만들어보는 순간의 즐거움을 나눕니다.", aboutSecond: "세 가지 체험에서 작게 시작합니다. 악기와 실, 붓을 직접 다루고, 그 솜씨를 이어온 사람을 만나는 경험에 집중합니다.",
  aboutValues: "배우고, 해보고, 나의 것으로.", noExperience: "처음이어도 참여할 수 있어요", imageNote: "체험 이해를 돕는 이미지로, 실제 현장과 다를 수 있습니다.",
};
export const discoveryCopy: Record<Locale, typeof en> = { en, ko };
