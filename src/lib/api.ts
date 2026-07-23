import type { Product } from "@/types";

const BASE_URL = "https://fakestoreapi.com";

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = res.json();
  return data;
}
