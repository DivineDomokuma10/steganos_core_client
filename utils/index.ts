import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import { CHARSET } from "./constant";
import AuthApi from "@/api/auth";
import AuthStore from "@/store/auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePassphrase(length = 16) {
  const randomValues = new Uint8Array(length);

  crypto.getRandomValues(randomValues);

  return Array.from(randomValues)
    .map((x) => CHARSET[x % CHARSET.length])
    .join("");
}

export function toSnakeCase(text: string) {
  return text.split(" ").join("_");
}

export function toDashCase(text: string, chars: number = 4) {
  return text.match(new RegExp(`.{1,${chars}}`, "g"))?.join("-") || "";
}

export function formatToMB(sizeInByte: number): string {
  return `${(sizeInByte / 1024 ** 2).toFixed(2)} MB`;
}

export const handleLogout = async () => {
  const res = await AuthApi.logout();

  if (res.data === null) {
    AuthStore.getState().clearAuthData?.();
    window.location.replace("/auth/login");
  }
};
