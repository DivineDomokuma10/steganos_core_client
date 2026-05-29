import AuthApi from "@/api/auth";
import AuthStore from "@/store/auth";
import SessionStore from "@/store/session";

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

    if (!data?.accessToken) {
      throw new Error("REFRESH_FAILED");
    }

    AuthStore.getState().mutateAuthData(data);
    SessionStore.getState().mutateSession({ userId: data.userId });
    SessionStore.getState().mutateSession({ userId: data.userId });
    SessionStore.getState().setLoading(false);

    processQueue(data.accessToken);

    return data.accessToken;
  } catch (err) {
    AuthStore.getState().clearAuthData?.();
    processQueue("");

    throw err;
  } finally {
    isRefreshing = false;
  }
};
