import type { ExperienceOption } from "./pricing";
import { findExperience, getExperienceOptions } from "./catalog";
import { findSession } from "./sessions";
import { calculatePreviewPrice } from "./pricing";

export type BookingDraft = { experienceSlug: string; sessionId: string; guestCount: number; optionCodes: string[] };
export function parseBookingDraft(params: URLSearchParams): BookingDraft | null {
  const experienceSlug = params.get("experience"); const sessionId = params.get("session");
  const guestCount = Number(params.get("guests")); const optionCodes = (params.get("options") ?? "").split(",").filter(Boolean);
  if (!experienceSlug || !sessionId || !Number.isInteger(guestCount) || guestCount < 1) return null;
  const experience = findExperience(experienceSlug); const session = findSession(sessionId);
  if (!experience || !session || session.experienceSlug !== experienceSlug) return null;
  const options = getExperienceOptions(experienceSlug).filter((option) => optionCodes.includes(option.code));
  return { experienceSlug, sessionId, guestCount, optionCodes: options.map((option) => option.code) };
}
export function draftTotal(draft: BookingDraft) {
  const experience = findExperience(draft.experienceSlug); if (!experience) return null;
  const options = getExperienceOptions(draft.experienceSlug).filter((option) => draft.optionCodes.includes(option.code));
  return calculatePreviewPrice(experience, options as readonly ExperienceOption[], draft.guestCount, new Set(draft.optionCodes));
}
