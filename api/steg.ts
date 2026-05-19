import CallApi from "@/utils/call-api";
import { STEG_ENDPOINTS } from "@/enum";

import { TApiResponse } from "@/types";
import { TDecodeResponse } from "@/types/steg";

class StegApi {
  static async encode(payload: FormData) {
    const res = await CallApi<Blob, FormData>(
      STEG_ENDPOINTS.ENCODE,
      "POST",
      "blob",
      payload,
    );

    if (!(res instanceof Blob)) {
      throw new Error("API did not return a Blob");
    }

    return res;
  }

  static async decode(payload: FormData) {
    const res = await CallApi<TApiResponse<TDecodeResponse>, FormData>(
      STEG_ENDPOINTS.DECODE,
      "POST",
      "json",
      payload,
    );

    if (res.status === "error") {
      return { message: res.message };
    }

    return { data: res.data, message: res.message };
  }
}

export default StegApi;
