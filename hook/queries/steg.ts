import { useMutation } from "@tanstack/react-query";

import StegApi from "@/api/steg";

export const useEncodeMutation = () => {
  return useMutation({
    mutationKey: ["encode"],
    mutationFn: async (payload: FormData) => await StegApi.encode(payload),
  });
};

export const useDecodeMutation = () => {
  return useMutation({
    mutationKey: ["decode"],
    mutationFn: async (payload: FormData) => await StegApi.decode(payload),
  });
};
