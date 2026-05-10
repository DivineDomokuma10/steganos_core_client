import { create } from "zustand";

import AuthStore from "./auth";
import AuthApi from "@/api/auth";

interface ISessionStore {
  isLoading: boolean;
  initSession: () => Promise<void>;
}

const SessionStore = create<ISessionStore>()((set) => ({
  isLoading: true,

  initSession: async () => {
    try {
      set({ isLoading: true });

      const res = await AuthApi.refresh();

      if (res.data) {
        AuthStore.getState().mutateAuthData(res.data);
        console.log("session store calls refresh");

        set({ isLoading: false });
      } else {
        AuthStore.getState().clearAuthData();
        set({ isLoading: false });
      }

      console.log("initSession called refresh");
    } catch {
      AuthStore.getState().clearAuthData();
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default SessionStore;
