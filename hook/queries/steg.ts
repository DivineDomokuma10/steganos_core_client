import { useMutation } from "@tanstack/react-query";

import StegApi from "@/api/steg";
import { TDecodePayload, TEncodePayload } from "@/types/steg";

export const useEncodeMutation = () => {
  return useMutation({
    mutationKey: ["encode"],
    mutationFn: async (payload: FormData) => await StegApi.encode(payload),
  });
};

export const useDecodeMutation = () => {
  return useMutation({
    mutationKey: ["decode"],
    mutationFn: async (payload: TDecodePayload) =>
      await StegApi.decode(payload),
  });
};
