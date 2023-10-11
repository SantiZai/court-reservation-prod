import { create } from "zustand";

interface UserStore {
  id: number;
  email: string;
  name: string;
  photo: string;
  admin: boolean;
}

export const userStore = create((set) => ({
  user: {
    id: 0,
    email: "",
    name: "",
    photo: "",
    admin: false,
  } as UserStore,
  setUser: (user: UserStore) => set({ user: user }),
}));
