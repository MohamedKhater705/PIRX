import type { Product } from "@/types";

// Renamed to API_URL so it doesn't get confused with Vite's import.meta.env.BASE_URL
const API_URL = "https://fakestoreapi.com";

export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`);
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

    // import.meta.env.BASE_URL points to your site's root (/PIRX/)
    const fallbackRes = await fetch(`${import.meta.env.BASE_URL}products.json`);

    if (!fallbackRes.ok) {
      throw new Error("Fallback JSON file could not be loaded!", {
        cause: error,
      });
    }

    return await fallbackRes.json();
  }
}
