import { create } from "zustand";

export interface IAuthData {
  accessToken: string;
}

interface IAuthStore {
  authData: IAuthData | null;

  clearAuthData: () => void;
  mutateAuthData: (data: IAuthData) => void;
}

const AuthStore = create<IAuthStore>()((set) => ({
  authData: null,
  clearAuthData: () => set({ authData: null }),
  mutateAuthData: (data) => set({ authData: data }),
}));

export default AuthStore;
