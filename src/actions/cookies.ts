"use server";
import { cookies } from "next/headers";

export async function createConsentCookies(value: boolean) {
  const cookieStore = await cookies();

  cookieStore.set("isShowCookie", "false");
  cookieStore.set("isConsentCookie", value.toString(), {
    path: "/",
    maxAge: 31536000, // 1 year in seconds
    sameSite: "strict",
  });
}

export async function getConsentCookies() {
  const cookieStore = await cookies();
  const isShowCookieValue = cookieStore.get("isShowCookie")?.value;
  const isShowCookie =
    isShowCookieValue === undefined ? true : isShowCookieValue === "true";
  const isConsentCookieValue = cookieStore.get("isConsentCookie")?.value;
  const isConsentCookie =
    isConsentCookieValue === undefined
      ? false
      : isConsentCookieValue === "true";

  return { isShowCookie, isConsentCookie };
}
