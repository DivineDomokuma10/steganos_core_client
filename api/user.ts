import { USER_ENDPOINTS } from "@/enum";
import { IUserProfileResponse } from "@/interface";
import { TApiResponse } from "@/types";
import CallApi from "@/utils/call-api";

class UserApi {
  static async getUserProfile() {
    const res = await CallApi<TApiResponse<IUserProfileResponse>>(
      USER_ENDPOINTS.PROFILE,
      "GET",
    );

    if (res.status === "error") {
      return { message: res.message };
    }

    return { data: res.data, message: res.message };
  }
}

export default UserApi;
