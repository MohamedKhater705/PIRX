import { useState, useEffect } from "react";
import type { Product } from "@/types/index";
import { getAllProducts } from "@/lib/api";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);
  return { products, isLoading, error };
}
