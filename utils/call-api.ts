import axios, { AxiosInstance } from "axios";

import { THttpMethod } from "@/types";
import { assertEnv, getHeaderConfig } from "./call-api-helper";
import AuthStore from "@/store/auth";
import AuthApi from "@/api/auth";

const baseUrl = assertEnv(
  process.env.NEXT_PUBLIC_BACKEND_URL!,
  "ENV is MISSING. Please add NEXT_PUBLIC_BACKEND_URL to your .env file.",
);

const api: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
});

api.interceptors.request.use(
  (config) => {
    const authData = AuthStore.getState().authData;

    config.headers.Authorization = `Bearer ${authData?.accessToken}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { data } = await AuthApi.refresh();

      if (data) {
        AuthStore.getState().mutateAuthData(data);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      }

      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

const CallApi = async <T, P = unknown>(
  url: string,
  method: THttpMethod,
  payload?: P,
): Promise<T> => {
  try {
    const resp = await api({
      url,
      method,
      data: payload ?? undefined,
      headers: {
        ...getHeaderConfig(payload),
      },
    });

    return resp.data satisfies T;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message ?? error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
    }

    throw error;
  }
};

export default CallApi;
