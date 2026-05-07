import {
  TDecodePayload,
  TEncodePayload,
  TEncodeResponse,
  TDecodeResponse,
} from "@/types/steg";
import { TApiResponse } from "@/types";
import CallApi from "@/utils/call-api";
import { STEG_ENDPOINTS } from "@/enum";

class StegApi {
  static async encode(payload: TEncodePayload) {
    const res = await CallApi<TApiResponse<TEncodeResponse>>(
      STEG_ENDPOINTS.ENCODE,
      "POST",
      payload,
    );

    if (res.status === "error") {
      return { message: res.message };
    }

    return { data: res.data, message: res.message };
  }

  static async decode(payload: TDecodePayload) {
    const res = await CallApi<TApiResponse<TDecodeResponse>>(
      STEG_ENDPOINTS.ENCODE,
      "POST",
      payload,
    );

    if (res.status === "error") {
      return { message: res.message };
    }

    return { data: res.data, message: res.message };
  }
}

export default StegApi;
