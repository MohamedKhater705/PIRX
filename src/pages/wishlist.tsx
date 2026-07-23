import { Link } from "react-router-dom";
import { useState } from "react";
import { Heart } from "lucide-react";
import Card from "../components/product/productCard";
import type { Product } from "@/types/index";
import Modal from "../components/product/productModal";
import { useWishlist } from "@/store/useWishlist";

export default function WishList() {
  const [popUp, setPopUp] = useState<Product | null>(null);
  const { items } = useWishlist();

  return (
    <>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-32 gap-6 min-h-[75vh]">
          {" "}
          <Heart className="size-30 text-gray-300" />
          <h3 className="text-8xl font-bold text-gray-700">
            Your Wishlist is empty
          </h3>
          <p className="text-gray-500 text-6xl my-6">
            Save the pieces you keep thinking about.
          </p>
          <Link
            to="/"
            className="mt-4 px-8 py-8 bg-black text-white rounded-4xl text-5xl hover:bg-gray-800 transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl active:scale-103">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex flex-col justify-center items-center">
            <div className="welcomeText flex justify-center items-center flex-col mt-30 mb-10">
              <h2 className="mt-10 text-8xl text-center">Your Wishlist</h2>
              <p className="text-gray-500 text-5xl my-10 text-center">
                A little list of things you loved on sight.
              </p>
            </div>
            <hr className="w-full max-w-full border-t-3 border-gray-300 my-10" />
          </div>
          <div className="grid grid-cols-[repeat(1,minmax(300px,1fr))] md:grid-cols-[repeat(3,minmax(300px,1fr))] lg:grid-cols-[repeat(6,minmax(300px,1fr))] gap-6 pt-20 px-10 md:px-[6px]">
            {items.map((product) => (
              <Card
                key={product.id}
                product={product}
                onClick={() => setPopUp(product)}
              />
            ))}
          </div>
        </div>
      )}

      {popUp && <Modal product={popUp} onClose={() => setPopUp(null)} />}
    </>
  );
}
