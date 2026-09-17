"use server";

import { cookies } from "next/headers";
import { isLocale, localeCookie } from "@/lib/i18n/dictionaries";

export async function setLocale(data: FormData) {
  const locale = data.get("locale");
  if (!isLocale(locale)) return;
  (await cookies()).set(localeCookie, locale, {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production",
    path: "/", maxAge: 60 * 60 * 24 * 365,
  });
}
