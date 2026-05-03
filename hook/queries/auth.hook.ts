import { useMutation } from "@tanstack/react-query";

import {
  ILoginFields as LoginPayload,
  IRegisterFields as SignupPayload,
} from "@/interface";
import AuthApi from "@/api/auth";

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (payload: SignupPayload) =>
      await AuthApi.register(payload),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (payload: LoginPayload) => await AuthApi.login(payload),
  });
};
