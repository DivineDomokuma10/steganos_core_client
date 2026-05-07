import { encoder, toSafeBuffer } from "./converters";

export const deriveCryptoKey = async (passphrase: string, salt: Uint8Array) => {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(passphrase),
    { name: "PBKDF2" },
    false,
    ["deriveKey"],
  );

  const derived = crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      iterations: 70000,
      salt: toSafeBuffer(salt),
    },
    keyMaterial,
    {
      length: 256,
      name: "AES-GCM",
    },
    false,
    ["encrypt", "decrypt"],
  );

  return derived;
};
