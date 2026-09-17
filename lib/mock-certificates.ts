import { randomUUID } from "node:crypto";
import { findExperience, findCreator } from "./catalog";
import type { BookingRecord } from "./mock-bookings";
export type CertificateRecord = { id: string; certificateNumber: string; bookingId: string; customerName: string; experienceSlug: string; experienceTitle: { en: string; ko: string }; creatorName: { en: string; ko: string }; completedAt: string; venue: string; status: "VERIFIED"; };
const certificates = new Map<string, CertificateRecord>();
const codes: Record<string, string> = { gayageum: "GY", knot: "KN", minhwa: "MH" };
export function issueCertificate(booking: BookingRecord): CertificateRecord {
  const existing = [...certificates.values()].find((certificate) => certificate.bookingId === booking.id); if (existing) return existing;
  const experience = findExperience(booking.experienceSlug); if (!experience) throw new Error("Experience not found"); const creator = findCreator(experience.creatorSlug); if (!creator) throw new Error("Creator not found");
  const date = new Date(booking.completedAt ?? new Date().toISOString()); const stamp = date.toISOString().slice(0, 10).replaceAll("-", ""); const number = `${codes[booking.experienceSlug] ?? "EX"}-${stamp}-${booking.id.slice(0, 4).toUpperCase()}`;
  const certificate: CertificateRecord = { id: `cert_${randomUUID()}`, certificateNumber: `SOMSSI-${number}`, bookingId: booking.id, customerName: booking.customerName, experienceSlug: booking.experienceSlug, experienceTitle: experience.title, creatorName: creator.name, completedAt: date.toISOString(), venue: "Incheon, Korea", status: "VERIFIED" };
  certificates.set(certificate.id, certificate); return certificate;
}
export function getCertificate(id: string) { return certificates.get(id) ?? null; }
export function getCertificateForBooking(bookingId: string) { return [...certificates.values()].find((certificate) => certificate.bookingId === bookingId) ?? null; }
export function listCertificates() { return [...certificates.values()].sort((a, b) => b.completedAt.localeCompare(a.completedAt)); }
