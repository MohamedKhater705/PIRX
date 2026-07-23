import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface User {
  email: string;
  fullName?: string;
  username?: string;
  address?: Address;
}

interface AuthStore {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  updatePassword: (data: { currentPass: string; newPass: string }) => void;
  updateAddress: (address: Address) => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
      updatePassword: ({ newPass }) => {
        // Handle password update logic (e.g., store state or send API request)
        console.log("Password updated to:", newPass);
      },
      updateAddress: (address) =>
        set((state) => ({
          user: state.user ? { ...state.user, address } : null,
        })),
    }),
    {
      name: "pirx-auth",
    },
  ),
);
