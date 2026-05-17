import { Prettify } from ".";

export type TEncryptedPayload = {
  iv: string;
  salt: string;
  ciphertext: string;
};

export type TStegImageMeta = {
  size: number;
  format: string;
  fileName: string;
};

export type TEncodeResponse = Blob;

export type TDecodeResponse = TEncryptedPayload;

export type TDecodePayload = { image: File };

export type TEncodePayload = Prettify<TEncryptedPayload & TDecodePayload>;
