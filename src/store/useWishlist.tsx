import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/index";

interface WishlistStore {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          if (exists) return {};
          return { items: [...state.items, product] };
        }),

      removeFromWishlist: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },
    }),
    {
      name: "pirx-wishlist",
    },
  ),
);
