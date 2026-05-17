import { deriveCryptoKey } from "./deriveKey";
import { TEncryptedPayload } from "@/types/steg";
import { decoder, encoder, fromBase64, toBase64 } from "./converters";

export const encryptMessage = async (message: string, passphrase: string) => {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const salt = window.crypto.getRandomValues(new Uint8Array(16));

  const key = await deriveCryptoKey(passphrase, salt);

  const cipherTextBuffer = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(message),
  );

  return {
    iv: toBase64(iv.buffer),
    salt: toBase64(salt.buffer),
    ciphertext: toBase64(cipherTextBuffer),
  };
};

export const decryptMessage = async (
  meta: TEncryptedPayload,
  passphrase: string,
) => {
  const iv = fromBase64(meta.iv);
  const salt = fromBase64(meta.salt);
  const ciphertext = fromBase64(meta.ciphertext);

  const key = await deriveCryptoKey(passphrase, salt);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    ciphertext,
  );

  return decoder.decode(decryptedBuffer);
};
