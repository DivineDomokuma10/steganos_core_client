import { AxiosError, InternalAxiosRequestConfig } from "axios";

import AuthStore from "@/store/auth";
import { api } from "../call-api";
import { refreshAccessToken } from "../refresh-manager";
import { OPEN_ROUTE } from "../constant";
import { handleLogout } from "..";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const responseInterceptorErrFunc = async (error: AxiosError) => {
  const originalRequest = error.config as CustomAxiosRequestConfig;

  if (!originalRequest) {
    return Promise.reject(error);
  }

  const status = error.response?.status;

  if (status !== 401) {
    return Promise.reject(error);
  }

  if (originalRequest._retry) {
    return Promise.reject(error);
  }

  if (OPEN_ROUTE.some((route) => originalRequest.url?.includes(route))) {
    AuthStore.getState().clearAuthData?.();
    return Promise.reject(error);
  }

  originalRequest._retry = true;

  try {
    const newAccessToken = await refreshAccessToken();

    if (!newAccessToken) {
      throw new Error("NO_TOKEN");
    }

    originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);

    return api(originalRequest);
  } catch (err) {
    await handleLogout();
    return Promise.reject(err);
  }
};
