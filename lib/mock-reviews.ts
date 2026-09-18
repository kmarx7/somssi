import { randomUUID } from "node:crypto";
export type ReviewRecord = { id: string; bookingId: string; rating: number; nps: number; comment: string; createdAt: string };
const reviews = new Map<string, ReviewRecord>();
export function createReview(input: Omit<ReviewRecord, "id" | "createdAt">) { const review = { ...input, id: randomUUID(), createdAt: new Date().toISOString() }; reviews.set(input.bookingId, review); return review; }
export function getReview(bookingId: string) { return reviews.get(bookingId) ?? null; }
