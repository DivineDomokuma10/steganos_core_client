import { TApiResponse } from "@/types";
import CallApi from "@/utils/call-api";
import { AUTH_ENDPOINTS } from "@/enum";

import { ILoginResponse, IRegisterResponse } from "@/interface";
import { TLoginFormValues, TRegisterFormValues } from "@/types/schema-derived";

class AuthApi {
  static async login(payload: TLoginFormValues) {
    const res = await CallApi<TApiResponse<ILoginResponse>>(
      AUTH_ENDPOINTS.LOGIN,
      "POST",
      "json",
      payload,
    );

    if (res.status === "error") {
      return { message: res.message };
    }

    return { data: res.data, message: res.message };
  }

  static async register(payload: TRegisterFormValues) {
    const res = await CallApi<TApiResponse<null>>(
      AUTH_ENDPOINTS.REGISTER,
      "POST",
      "json",
      payload,
    );

    if (res.status === "error") {
      return { message: res.message };
    }

    return { data: res.data, message: res.message };
  }

  static async refresh() {
    const res = await CallApi<TApiResponse<ILoginResponse>>(
      AUTH_ENDPOINTS.REFRESH,
      "GET",
    );

    if (res.status === "error") {
      return { message: res.message };
    }

    return { data: res.data, message: res.message };
  }

  static async logout() {
    const res = await CallApi<TApiResponse<null>>(AUTH_ENDPOINTS.LOGOUT, "GET");

    if (res.status === "error") {
      return { message: res.message };
    }

    return { data: res.data, message: res.message };
  }
}

export default AuthApi;
