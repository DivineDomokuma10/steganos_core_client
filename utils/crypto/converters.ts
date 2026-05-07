export const encoder = new TextEncoder();

export const decoder = new TextDecoder();

export const toBase64 = (buffer: ArrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buffer)));

export const fromBase64 = (b64: string) =>
  Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

export const toSafeBuffer = (data: Uint8Array) => Uint8Array.from(data);
