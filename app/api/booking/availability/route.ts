import { sessionsForExperience } from "@/lib/sessions";

export async function GET(request: Request) {
  const experience = new URL(request.url).searchParams.get("experience");
  if (!experience) return Response.json({ error: "Experience is required." }, { status: 400 });
  return Response.json({ sessions: sessionsForExperience(experience).map(({ id, experienceSlug, startsAt, endsAt, capacity, bookedCount, status, venue }) => ({ id, experienceSlug, startsAt, endsAt, capacity, bookedCount, status, venue })) });
}
