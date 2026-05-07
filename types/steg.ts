import { Prettify } from ".";

export type TEncryptedPayload = {
  iv: string;
  salt: string;
  ciphertext: string;
};

export type TEncodeResponse = Blob;

export type TDecodePayload = { image: File };

export type TDecodeResponse = TEncryptedPayload;

export type TEncodePayload = Prettify<TEncryptedPayload & TDecodePayload>;
