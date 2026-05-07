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
