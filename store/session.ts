import { create } from "zustand";

import UserApi from "@/api/user";

type TSession = { userId: string };

interface ISessionStore {
  isLoading: boolean;
  session: TSession | null;

  initSession: () => Promise<void>;
  setLoading: (data: boolean) => void;
  mutateSession: (data: TSession) => void;
}

const SessionStore = create<ISessionStore>()((set) => ({
  isLoading: true,

  session: null,
  setLoading: (data) => set({ isLoading: data }),

  mutateSession: (data) => set({ session: data }),

  initSession: async () => {
    set({ isLoading: true });

    try {
      const res = await UserApi.getUserProfile();

      if (res.data) {
        set({ session: { userId: res.data._id } });
      } else {
        set({ session: null });
      }
    } catch (error) {
      set({ isLoading: false });
      set({ session: null });
    }
  },
}));

export default SessionStore;
