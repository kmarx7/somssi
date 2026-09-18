import type { Locale } from "./i18n/dictionaries";

export type Localized = Record<Locale, string>;
const copy = (en: string, ko: string): Localized => ({ en, ko });
export type Experience = {
  slug: string; title: Localized; category: Localized; description: Localized;
  price: number; duration: number; minGuests: number; maxGuests: number;
  image: string; alt: Localized; creatorSlug: string; accent: string;
  activities: Localized[]; included: Localized[];
};
export type ExperiencePackage = { code: string; name: Localized; description: Localized; price: number; includedOptionCodes: readonly string[] };

// Preview catalogue, deliberately separate from UI. Replace via a service in later phases.
export const experiences: readonly Experience[] = [
  { slug: "gayageum", title: copy("Gayageum Experience", "줄을 다루는 솜씨"), category: copy("Traditional music", "전통음악"),
    description: copy("Meet the gayageum through its wood, strings, and gentle resonance. Learn how the instrument makes sound, try the basic plucking techniques, and explore a short melody at your own pace. No musical experience needed.", "나무와 줄, 그리고 울림으로 가야금을 만나보세요. 악기의 구조와 소리를 이해하고, 기본 연주법을 배우며 짧은 선율을 경험합니다. 한 곡 완주보다 직접 소리를 내보는 즐거움에 집중합니다."),
    price: 99000, duration: 90, minGuests: 1, maxGuests: 6, image: "/images/gayageum-experience.png", accent: "gayageum", creatorSlug: "kim-hana",
    alt: copy("A guest learning to pluck a gayageum with an instructor", "강사와 함께 가야금의 줄을 뜯어보는 참가자"),
    activities: [copy("Discover the instrument and its distinctive sound", "악기의 구조와 고유한 소리 이해하기"), copy("Pluck the strings and explore basic techniques", "직접 줄을 뜯고 기본 연주법 익히기"), copy("Try a short melody, one phrase at a time", "짧은 선율을 한 구절씩 경험하기")],
    included: [copy("Gayageum use during the session", "체험 중 가야금 사용"), copy("Guided instruction and practice", "기본 연주 안내와 실습"), copy("Certificate after completing the experience", "체험 완료 후 인증서")],
  },
  { slug: "knot", title: copy("Korean Knot Experience", "매듭을 다루는 솜씨"), category: copy("Traditional craft", "전통공예"),
    description: copy("Follow a thread into the world of Korean maedeup. Discover the meanings of traditional knots, choose your cords, and learn to shape them by hand. Take home a small keepsake made by you.", "실 한 가닥으로 한국 전통매듭을 만나보세요. 매듭의 의미와 형태를 이해하고, 마음에 드는 실을 골라 직접 엮어봅니다. 내 손으로 완성한 작은 결과물을 가져갑니다."),
    price: 79000, duration: 90, minGuests: 1, maxGuests: 6, image: "/images/knot-experience.png", accent: "knot", creatorSlug: "lee-sujin",
    alt: copy("Hands tying a red Korean knot on a table with silk cords", "색실이 놓인 작업대에서 붉은 전통매듭을 묶는 손"),
    activities: [copy("Learn the stories and shapes of Korean knots", "전통매듭의 의미와 형태 알아보기"), copy("Choose a cord and practice the basic knot", "실을 고르고 기본 매듭 익히기"), copy("Finish a small keepsake to take home", "가져갈 작은 매듭 소품 완성하기")],
    included: [copy("Cords and craft materials", "실과 매듭 재료"), copy("Guided making and a take-home piece", "제작 안내와 완성 소품"), copy("Certificate after completing the experience", "체험 완료 후 인증서")],
  },
  { slug: "minhwa", title: copy("Minhwa Experience", "빛깔을 다루는 솜씨"), category: copy("Folk painting", "민화"),
    description: copy("Discover the wishes and stories held in Korean folk painting. Explore its symbols, choose your colors, and bring a small painting to life with a brush. Your own interpretation is part of the experience.", "한국 민화에 담긴 소망과 이야기를 발견해 보세요. 그림의 상징과 색을 이해하고, 직접 빛깔을 골라 붓으로 채색합니다. 나만의 해석을 담은 작은 작품을 완성합니다."),
    price: 89000, duration: 120, minGuests: 1, maxGuests: 6, image: "/images/minhwa-experience.png", accent: "minhwa", creatorSlug: "park-yunseo",
    alt: copy("Hands painting a peony on hanji paper with a fine brush", "한지 위 모란을 가는 붓으로 채색하는 손"),
    activities: [copy("Explore the symbols and colors of minhwa", "민화의 상징과 색 알아보기"), copy("Choose a palette and practice your brushwork", "빛깔을 선택하고 붓의 감각 익히기"), copy("Paint a small artwork to take home", "나만의 작은 작품 채색하고 완성하기")],
    included: [copy("Paper, paints, and brush use", "종이·물감과 체험용 붓"), copy("Guided painting and your finished artwork", "채색 안내와 완성 작품"), copy("Certificate after completing the experience", "체험 완료 후 인증서")],
  },
];

export const creators = [
  { slug: "kim-hana", name: copy("Kim Hana", "김하나"), craft: copy("Gayageum", "가야금"), initials: "KH", quote: copy("Start with a single string. Listen to what your hands can do.", "줄 하나에서 시작해 보세요. 손끝에서 만들어지는 소리에 귀를 기울여요."), bio: copy("A sample creator profile for our gayageum experience. The session introduces the instrument through listening, touch, and gentle practice, with time to explore your first notes.", "가야금 체험을 소개하는 샘플 Creator 프로필입니다. 소리를 듣고 줄을 만져보며, 자신의 속도로 첫 음을 내보는 체험을 안내합니다.") },
  { slug: "lee-sujin", name: copy("Lee Sujin", "이수진"), craft: copy("Korean knot", "전통매듭"), initials: "LS", quote: copy("A small knot can hold a memory of a whole journey.", "작은 매듭 하나에 여행의 기억을 담아보세요."), bio: copy("A sample creator profile for our knot experience. Discover traditional forms through a simple making process, from choosing a cord to finishing a personal keepsake.", "전통매듭 체험을 소개하는 샘플 Creator 프로필입니다. 실을 고르는 순간부터 소품을 완성하는 과정까지, 손으로 전통의 형태를 익혀봅니다.") },
  { slug: "park-yunseo", name: copy("Park Yunseo", "박윤서"), craft: copy("Minhwa", "민화"), initials: "PY", quote: copy("There is a story in every color. Make one of them yours.", "빛깔마다 이야기가 있어요. 그 위에 나의 이야기를 더해보세요."), bio: copy("A sample creator profile for our minhwa experience. Explore symbols, color, and brushwork in an approachable introduction to Korean folk painting.", "민화 체험을 소개하는 샘플 Creator 프로필입니다. 한국 민화의 상징과 색, 붓의 감각을 차근차근 경험할 수 있도록 안내합니다.") },
] as const;
export type Creator = (typeof creators)[number];

// Add-ons remain independent from core experience prices and content.
export const options = [
  { code: "HANBOK", title: copy("Hanbok", "한복"), description: copy("Wear the colors and textures of Korean dress.", "한복의 색과 질감을 입어보세요."), price: 20000, pricingType: "PER_PERSON" },
  { code: "TEA_SNACK", title: copy("Tea & sweets", "전통차·다과"), description: copy("Make time for a warm cup and a little sweetness.", "따뜻한 차와 다과로 잠시 쉬어가세요."), price: 10000, pricingType: "PER_PERSON" },
  { code: "PHOTO", title: copy("Photo package", "사진 촬영"), description: copy("Keep the moments when your hands learned something new.", "손으로 배우던 순간을 사진으로 남겨보세요."), price: 20000, pricingType: "PER_BOOKING" },
] as const;
export const experiencePackages: Record<string, readonly ExperiencePackage[]> = {
  gayageum: [
    { code: "ESSENTIAL", name: copy("Essential", "에센셜"), description: copy("Gayageum discovery and guided practice.", "가야금의 구조를 이해하고 직접 연주해보는 기본 체험입니다."), price: 79000, includedOptionCodes: [] },
    { code: "SIGNATURE", name: copy("Signature", "시그니처"), description: copy("Hanbok, tea and sweets, and a keepsake certificate.", "한복, 전통차·다과, 체험 인증서를 함께 제공합니다."), price: 99000, includedOptionCodes: ["HANBOK", "TEA_SNACK"] },
    { code: "COMPLETE", name: copy("Complete", "컴플리트"), description: copy("The full day with styling, tea, photos, and a Culture Pack.", "한복, 차·다과, 사진 촬영과 Culture Pack까지 포함한 전체 경험입니다."), price: 129000, includedOptionCodes: ["HANBOK", "TEA_SNACK", "PHOTO"] },
  ],
};
const experienceOptions: Record<string, readonly string[]> = {
  gayageum: ["HANBOK", "TEA_SNACK", "PHOTO"], knot: ["HANBOK", "TEA_SNACK", "PHOTO"], minhwa: ["HANBOK", "TEA_SNACK", "PHOTO"],
};
export const findExperience = (slug: string) => experiences.find((item) => item.slug === slug);
export const findCreator = (slug: string) => creators.find((item) => item.slug === slug);
export const getExperienceOptions = (slug: string) => options.filter((item) => experienceOptions[slug]?.includes(item.code));
export const getExperiencePackages = (slug: string) => experiencePackages[slug] ?? [];
