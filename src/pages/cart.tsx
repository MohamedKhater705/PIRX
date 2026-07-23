import { Link } from "react-router-dom";
import { useState } from "react";
// import shoe from "@/assets/Screenshot 2026-07-04 195234.png";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/useCart";
// import { useProducts } from "@/hooks/useProducts";
import CartRow from "@/components/product/cartItemRow";
import type { Product } from "@/types";
import Modal from "../components/product/productModal";

export default function Cart() {
  const { cartItems, removeItem } = useCart();

  const subTotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const delivery = subTotalPrice > 0 ? 15 : 0; // Flat delivery fee example
  const grandTotal = subTotalPrice + delivery;

  const [popUp, setPopUp] = useState<Product | null>(null);

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-6 text-center min-h-[75vh]">
        {" "}
        <ShoppingBag className="size-25 md:size-30 text-gray-300" />
        <h3 className="text-6xl md:text-8xl font-bold text-gray-700">
          Your cart is empty
        </h3>
        <p className="text-gray-500 text-4xl md:text-6xl my-6">
          Looks like you haven't found your piece yet.
        </p>
        <Link
          to="/"
          className="mt-4 px-8 py-8 bg-black text-white rounded-4xl text-3xl md:text-5xl hover:bg-gray-800 transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl active:scale-103">
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <>
      <div>
        <div className="welcomText flex justify-center items-center flex-col my-30">
          <h2 className=" mt-10 text-7xl text-center md:text-8xl">
            Your Cart{" "}
          </h2>
          <p className="text-gray-500 mt-10   text-4xl text-center md:text-5xl  ">
            Everything you've handpicked, waiting for its moment.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-around gap-10 border-t-4 pt-10 px-4 md:px-8">
          <ul className="items w-full lg:pl-15">
            <span className="text-4xl md:text-5xl">
              Your items : ({cartItems.length}){" "}
            </span>

            {cartItems.map((product) => {
              return (
                <CartRow
                  key={product.id}
                  product={product}
                  onOpenModal={(prod) => setPopUp(prod)}
                  removeItem={(id) => removeItem(id)}
                />
              );
            })}
          </ul>

          <div className="orderSummary w-full lg:min-w-[500px] lg:max-w-[500px] h-auto lg:h-[460px] shadow-2xl rounded-4xl border-2 border-gray-400 px-6 md:px-10 py-8 lg:py-0 flex justify-center flex-col gap-6 mb-5">
            <h2 className="text-6xl md:text-7xl font-bold my-6 md:my-15">
              Order Summary
            </h2>

            <div className="flex flex-col gap-6 md:gap-10">
              <div className="flex justify-between">
                <span className="text-3xl md:text-4xl text-gray-500">
                  Subtotal
                </span>
                <span className="text-3xl md:text-4xl font-bold">
                  ${subTotalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-3xl md:text-4xl text-gray-500">
                  Delivery
                </span>
                <span className="text-3xl md:text-4xl font-bold">
                  ${delivery.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between border-t-2 border-gray-300 py-6 md:py-10">
              <span className="text-4xl md:text-5xl font-extrabold">Total</span>
              <span className="text-4xl md:text-5xl font-extrabold">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
            <Link
              to="/checkout"
              aria-label="checkout"
              className="text-4xl md:text-4xl flex justify-center bg-black text-white rounded-2xl py-5 md:py-7 hover:bg-gray-800 transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl active:scale-110">
              Checkout
            </Link>
          </div>
        </div>
        {popUp && <Modal product={popUp} onClose={() => setPopUp(null)} />}
      </div>
    </>
  );
}
