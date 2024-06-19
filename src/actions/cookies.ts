"use server";
import { cookies } from "next/headers";

export async function setCookie(ids: number[]) {
  const hasCookie = cookies().has("seen");
  if (!hasCookie) {
    cookies().set("seen", JSON.stringify(ids));
  } else {
    const cookieStore = cookies();
    const c = cookieStore.get("seen");
    const oldIds = JSON.parse(c?.value || "[]");

    const newIds = [...oldIds, ...ids];
    cookies().set("seen", JSON.stringify(newIds));
  }
  //   cookies().set("seen", JSON.stringify(ids));
}

export async function getCookie() {
  const cookieStore = cookies();
  const c = cookieStore.get("seen");
  if (!c) {
    return null;
  }
  return JSON.parse(c?.value);
}

export const removeCookie = async (removeId: number) => {
  const hasCookie = cookies().has("seen");
  if (!hasCookie) return;

  const cookieStore = cookies();
  const c = cookieStore.get("seen");
  const oldIds = JSON.parse(c?.value || "[]");
  const newIds = oldIds.filter((id: number) => id !== removeId);
  cookies().set("seen", JSON.stringify(newIds));
};
