import { create } from "zustand";

interface IAuthData {
  userId: string;
  accessToken: string;
}

interface IAuthStore {
  authData: IAuthData | null;

  mutateAuthData: (data: IAuthData) => void;
}

const AuthStore = create<IAuthStore>()((set) => ({
  authData: null,
  mutateAuthData: (data) => set({ authData: data }),
}));

export default AuthStore;
