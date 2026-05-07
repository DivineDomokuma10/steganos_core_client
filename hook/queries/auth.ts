import { useMutation } from "@tanstack/react-query";

import AuthApi from "@/api/auth";
import { TLoginFormValues, TRegisterFormValues } from "@/types/schema-derived";

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (payload: TRegisterFormValues) =>
      await AuthApi.register(payload),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (payload: TLoginFormValues) =>
      await AuthApi.login(payload),
  });
};
