import { Plus, Minus, X } from "lucide-react";
import { useState } from "react";
import type { Product, CartItem } from "@/types";
import ShinyText from "../ui/ShinyText";
import { useCart } from "@/store/useCart";
interface CartItemRowProps {
  product: CartItem;
  onOpenModal: (product: Product) => void;
  removeItem: (id: number) => void;
}
export default function CartItemRow({
  product,
  onOpenModal,
  removeItem,
}: CartItemRowProps) {
  const [isBtnActive, setIsBtnActive] = useState(false);
  //   const [itemCount, setItemCount] = useState(1);
  const { updateQuantity } = useCart();
  const currentQuantity = product.quantity || 1;
  return (
    <li
      onClick={() => onOpenModal(product)}
      key={product.id}
      className={`flex flex-col  sm:flex-row items-center bg-gray-200 border-gray-300 border-1 w-full lg:w-[calc(100%-100px)] py-5 px-5 sm:pl-15 md:px-8 rounded-3xl my-10 md:my-20 shadow-lg  cursor-pointer transition-all duration-200 ease-in-out hover:scale-101 hover:shadow-xl ${isBtnActive ? "" : "active:scale-100"} select-none`}>
      <img
        src={product.image}
        alt="product-picture"
        className="w-full object-contain max-w-[250px] max-h-90 sm:max-w-sm md:max-w-100 md:max-h-110 rounded-2xl bg-black"
      />
      <div className="itemInfo mx-0 sm:mx-10 mt-5 sm:mt-0 text-center sm:text-left">
        <span className="text-5xl md:text-5xl">{product.title}</span>
        <div className="text-black text-4xl md:text-5xl font-bold mt-3 md:mt-5">
          {" "}
          <ShinyText
            text={`$${product.price}`}
            speed={1}
            delay={0}
            color="#000000"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
            className="text-gray-500"
          />
        </div>
        <div className="text-gray-500 text-3xl md:text-4xl mt-2">
          <ShinyText
            text={`Subtotal: ${(product.price * currentQuantity).toFixed(2)} `}
            speed={1}
            delay={0}
            color="#b5b5b5"
            shineColor="#000000"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
            className="text-gray-500"
          />
        </div>
      </div>

      <div
        onMouseDown={() => setIsBtnActive(true)}
        onMouseUp={() => setIsBtnActive(false)}
        onMouseLeave={() => setIsBtnActive(false)}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="btns lg:ml-auto lg:mr-15 flex flex-nowrap lg:self justify-center gap-3 md:gap-7 items-center rounded-4xl mt-5 sm:mt-0 sm:ml-10 ">
        <span
          onClick={() => updateQuantity(product.id, currentQuantity + 1)}
          className="p-2 md:p-4 bg-white rounded-4xl shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl active:scale-120">
          <Plus
            fill="currentColor"
            className="text-amber-500 size-10 md:size-15"
          />
        </span>
        <span className="p-2 md:p-4 bg-white rounded-4xl py-4 px-6 md:py-7 md:px-10 text-4xl md:text-3xl shadow-lg">
          {currentQuantity}
        </span>
        <span
          onClick={() =>
            updateQuantity(
              product.id,
              currentQuantity > 1 ? currentQuantity - 1 : 1,
            )
          }
          className="p-2 md:p-4 bg-white rounded-4xl shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl active:scale-120">
          <Minus
            fill="currentColor"
            className="text-amber-500 size-10 md:size-15"
          />
        </span>
        <span
          onClick={() => removeItem(product.id)}
          className="p-2 md:p-4 bg-white rounded-4xl shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl active:scale-120">
          <X fill="currentColor" className="text-red-500 size-10 md:size-15" />
        </span>
      </div>
    </li>
  );
}
