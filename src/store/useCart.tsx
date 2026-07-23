import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, CartItem } from "@/types/index";

interface Cart {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  addQuanityToCard: (product: Product, quanity: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

export const useCart = create<Cart>()(
  persist(
    (set) => ({
      cartItems: [],
      addQuanityToCard: (product, quanity) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.id === product.id,
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quanity }
                  : item,
              ),
            };
          }
          return {
            cartItems: [...state.cartItems, { ...product, quantity: quanity }],
          };
        }),
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.id === product.id,
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return {
            cartItems: [...state.cartItems, { ...product, quantity: 1 }],
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        })),
    }),
    {
      name: "pirx-cart",
    },
  ),
);
