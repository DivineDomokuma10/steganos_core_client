import { TApiResponse } from "@/types";
import CallApi from "@/utils/call-api";
import { AUTH_ENDPOINTS } from "@/enum";
import {
  ILoginFields,
  ILoginResponse,
  IRegisterFields,
  IRegisterResponse,
} from "@/interface";

class AuthApi {
  static async login(payload: ILoginFields) {
    const res = await CallApi<TApiResponse<ILoginResponse>>(
      AUTH_ENDPOINTS.LOGIN,
      "POST",
      payload,
    );

    if (res.status === "error") {
      return { error: res.message };
    }

    return { data: res.data, message: res.message };
  }

  static async register(payload: IRegisterFields) {
    const res = await CallApi<TApiResponse<IRegisterResponse>>(
      AUTH_ENDPOINTS.REGISTER,
      "POST",
      payload,
    );

    if (res.status === "error") {
      return { error: res.message };
    }

    return { data: res.data, message: res.message };
  }
}

export default AuthApi;
