import type { Product } from "@/types";

const BASE_URL = "https://fakestoreapi.com";

export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok)
      throw new Error(
        "Oops!, something went wrong while getting your products",
      );
    return await res.json();
  } catch (error) {
    console.warn(
      "API blocked or offline. Switching to local fallback...",
      error,
    );
    const fallbackRes = await fetch("/PIRX/products.json");
    return await fallbackRes.json();
  }
}
