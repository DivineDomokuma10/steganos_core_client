import AuthApi from "@/api/auth";
import AuthStore from "@/store/auth";

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

const processQueue = (token: string) => {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
};

export const refreshAccessToken = async (): Promise<string> => {
  if (isRefreshing) {
    return new Promise((resolve, _reject) => {
      refreshQueue.push((token: string) => resolve(token));
    });
  }

  isRefreshing = true;

  try {
    const { data } = await AuthApi.refresh();
    console.log("reponse incterceptor calls refresh");

    if (!data?.accessToken) {
      throw new Error("REFRESH_FAILED");
    }

    AuthStore.getState().mutateAuthData(data);

    processQueue(data.accessToken);

    console.log("response interceptor called refresh");

    return data.accessToken;
  } catch (err) {
    AuthStore.getState().clearAuthData?.();
    processQueue("");

    throw err;
  } finally {
    isRefreshing = false;
  }
};
