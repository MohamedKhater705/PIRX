import Card from "../components/product/productCard";
import Modal from "../components/product/productModal";
import FilterBar from "../components/layout/filterBar";
import MobileBar from "../components/layout/mobileFilterBar";
import ProductCardSkeleton from "../components/product/skeletonCard";
import ShinyText from "../components/ui/ShinyText";
import { useProducts } from "@/hooks/useProducts";
import { useState, useEffect } from "react";
import { useSearch } from "@/store/useSearch";
import type { Product } from "@/types";

export default function Home() {
  const [popUp, setPopUp] = useState<Product | null>(null);
  const [category, setCategory] = useState("Discover");
  const [sort, setSort] = useState("");

  // 1. Control how many products to display initially
  const INITIAL_LIMIT = 12;
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);

  const { products, isLoading, error } = useProducts();
  const { query } = useSearch();

  const filteredProducts = products
    .filter((p) =>
      category === "Discover" ? true : p.category === category.toLowerCase(),
    )
    .filter((p) => {
      const searchQuery = query.toLowerCase();
      return (
        p.title.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery)
      );
    })
    .sort((a, b) => {
      if (sort === "Price: Low to High") return a.price - b.price;
      if (sort === "Price: High to Low") return b.price - a.price;
      return 0;
    });

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-4xl text-gray-500">Something went wrong: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div
        key={`${category}-${sort}-${query}`}
        className="px-10 py-16 pb-0 flex justify-center flex-col items-center lg:pb-16">
        <h1 className="text-[6rem] font-bold capitalize">
          Step up your style with{" "}
          <ShinyText
            text="PIRX."
            speed={1}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
            className="text-gray-500"
          />
        </h1>
        <p className="text-[3rem] text-gray-500 my-10">
          Where every piece is chosen, never just picked.
        </p>
      </div>

      <FilterBar
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />
      <MobileBar
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <div className="grid grid-cols-1 md:grid-cols-[repeat(3,minmax(300px,1fr))] lg:grid-cols-[repeat(6,minmax(300px,1fr))] gap-6 pt-20 px-10 md:px-[6px] max-w-full overflow-hidden">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : // 2. Slice the array to show only up to visibleCount items
            filteredProducts.slice(0, visibleCount).map((product) => (
              <Card
                key={product.id}
                product={product}
                onClick={() => {
                  setPopUp(product);
                }}
              />
            ))}
        {popUp && <Modal product={popUp} onClose={() => setPopUp(null)} />}
      </div>
      {!isLoading && (
        <div className="flex justify-center my-16">
          {visibleCount < filteredProducts.length ? (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="px-10 py-5 bg-black text-white text-3xl rounded-3xl font-semibold hover:bg-gray-800 transition-all cursor-pointer">
              Show More
            </button>
          ) : (
            <p className="text-3xl text-gray-400">You've reached the end!</p>
          )}
        </div>
      )}
    </>
  );
}
