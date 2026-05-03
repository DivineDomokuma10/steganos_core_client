import axios, { AxiosInstance } from "axios";

import { THttpMethod } from "@/types";
import { assertEnv, getHeaderConfig } from "./call-api-helper";

const baseUrl = assertEnv(
  process.env.NEXT_PUBLIC_BACKEND_URL!,
  "ENV is MISSING. Please add NEXT_PUBLIC_BACKEND_URL to your .env file.",
);

const api: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
});

const CallApi = async <T, P = unknown>(
  url: string,
  method: THttpMethod,
  payload?: P,
): Promise<T> => {
  try {
    const resp = await api({
      url,
      method,
      ...(payload && { data: payload }),
      headers: {
        "x-referer": process.env.NEXT_PUBLIC_FRONTEND_URL,
        ...getHeaderConfig<typeof payload>(payload),
      },
    });

    return resp.data as T;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data ?? error.message;
    }

    throw error;
  }
};

export default CallApi;
