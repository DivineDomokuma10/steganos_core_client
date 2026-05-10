import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import { CHARSET } from "./constant";

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
