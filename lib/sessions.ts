export type SessionStatus = "OPEN" | "FULL" | "CANCELLED";
export type SessionPreview = {
  id: string;
  experienceSlug: string;
  startsAt: string;
  endsAt: string;
  capacity: number;
  bookedCount: number;
  status: SessionStatus;
  venue: string;
};

// Preview data until Supabase is configured. Availability is never treated as payment authorization.
export const sessionPreviews: readonly SessionPreview[] = [
  { id: "gy-20261020-1030", experienceSlug: "gayageum", startsAt: "2026-10-20T10:30:00+09:00", endsAt: "2026-10-20T12:00:00+09:00", capacity: 6, bookedCount: 2, status: "OPEN", venue: "Incheon Partner Hanok" },
  { id: "gy-20261020-1500", experienceSlug: "gayageum", startsAt: "2026-10-20T15:00:00+09:00", endsAt: "2026-10-20T16:30:00+09:00", capacity: 6, bookedCount: 4, status: "OPEN", venue: "Incheon Partner Hanok" },
  { id: "gy-20261021-1030", experienceSlug: "gayageum", startsAt: "2026-10-21T10:30:00+09:00", endsAt: "2026-10-21T12:00:00+09:00", capacity: 6, bookedCount: 6, status: "FULL", venue: "Incheon Partner Hanok" },
  { id: "kn-20261022-1400", experienceSlug: "knot", startsAt: "2026-10-22T14:00:00+09:00", endsAt: "2026-10-22T15:30:00+09:00", capacity: 6, bookedCount: 1, status: "OPEN", venue: "Jung-gu Craft Studio" },
  { id: "mh-20261024-1100", experienceSlug: "minhwa", startsAt: "2026-10-24T11:00:00+09:00", endsAt: "2026-10-24T13:00:00+09:00", capacity: 6, bookedCount: 3, status: "OPEN", venue: "Songdo Art House" },
];
export const findSession = (id: string) => sessionPreviews.find((session) => session.id === id);
export const sessionsForExperience = (slug: string) => sessionPreviews.filter((session) => session.experienceSlug === slug);
export function remainingCapacity(session: Pick<SessionPreview, "capacity" | "bookedCount">) { return Math.max(0, session.capacity - session.bookedCount); }
export function canFitGuests(session: SessionPreview, guestCount: number) { return session.status === "OPEN" && remainingCapacity(session) >= guestCount; }
