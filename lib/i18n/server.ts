import { cookies } from "next/headers";
import { dictionaries, isLocale, localeCookie } from "./dictionaries";

export async function getI18n() {
  const value = (await cookies()).get(localeCookie)?.value;
  const locale = isLocale(value) ? value : "en";
  return { locale, t: dictionaries[locale] };
}
