import AuthStore from "@/store/auth";
import { InternalAxiosRequestConfig } from "axios";

export const requestInterceptorFunc = (config: InternalAxiosRequestConfig) => {
  const authData = AuthStore.getState().authData;

  if (authData?.accessToken) {
    config.headers.Authorization = `Bearer ${authData.accessToken}`;
  }

  return config;
};
