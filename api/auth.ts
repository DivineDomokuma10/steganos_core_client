import { TApiResponse } from "@/types";
import CallApi from "@/utils/call-api";
import { AUTH_ENDPOINTS } from "@/enum";
import { ILoginFields, ILoginResponse } from "@/interface";

class AuthApi {
  static async login(payload: ILoginFields) {
    const res = await CallApi<TApiResponse<ILoginResponse>>(
      AUTH_ENDPOINTS.LOGIN,
      "POST",
      payload,
    );

    return res;
  }
}

export default AuthApi;
