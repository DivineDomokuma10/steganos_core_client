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
      const res = await AuthApi.refresh();

      if (res.data) {
        AuthStore.getState().mutateAuthData(res.data);
      } else {
        AuthStore.getState().clearAuthData();
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
