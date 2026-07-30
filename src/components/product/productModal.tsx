import { Heart, Plus, Minus, X } from "lucide-react";
import ShinyText from "../ui/ShinyText";
import type { Product } from "@/types/index";
import { useCart } from "@/store/useCart";
import { useWishlist } from "@/store/useWishlist";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import AuthRequiredModal from "@/components//layout/AuthRequiredModal";
import { toast } from "sonner";

interface CardProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: CardProps) {
  const { addQuanityToCard } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [itemCount, setItemCount] = useState(1);
  const inWishlist = isInWishlist(product.id);
  const navigate = useNavigate();

  const { requireAuth, isAuthModalOpen, closeAuthModal, pendingActionName } =
    useRequireAuth();

  // Guarded Wishlist Handler
  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info("Removed from wishlist");
    } else {
      requireAuth(() => {
        addToWishlist(product);
        toast.success("Saved to wishlist!");
      }, "add items to your wishlist");
    }
  };

  // Guarded Add to Cart Handler
  const handleAddToCart = () => {
    requireAuth(() => {
      addQuanityToCard(product, itemCount);
      toast.success("Added to cart!", {
        description: `Added ${itemCount} x ${product.title}`,
      });
    }, "add items to your cart");
  };

  // Guarded Buy Now Handler
  const handleBuyNow = () => {
    requireAuth(() => {
      addQuanityToCard(product, itemCount);
      navigate("/checkout");
    }, "proceed to checkout");
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[555] p-4 ">
        <div className="relative w-full max-w-[1300px] lg:min-h-[700px] max-h-[90vh] bg-white rounded-4xl flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 gap-10 lg:gap-50 overflow-y-auto scrollbar-none py-12 lg:py-20 transform transition-all animate-in fade-in zoom-in-95 duration-200 ease-out ">
          <button
            onClick={onClose}
            className="absolute top-2 right-1.5 lg:top-8 lg:right-8 text-gray-400 hover:text-red-600 active:text-red-600 hover:scale-110 active:scale-125 lg:active:scale-90 transition-all duration-200 cursor-pointer">
            <X className="size-12 lg:size-15" />
          </button>

          <div className="w-full lg:w-auto order-2 lg:order-1">
            <div className="p-2 lg:p-12 lg:h-[500px] lg:overflow-y-scroll lg:scrollbar-none">
              <span className="text-2xl lg:text-3xl text-gray-400 font-semibold uppercase tracking-widest block mb-2">
                {product.category}
              </span>
              <h2 className="text-5xl lg:text-[70px] font-bold mt-4 lg:mt-[20px]">
                {product.title}
              </h2>
              <span className="flex items-center justify-between my-6 lg:my-[20px]">
                <span className="text-3xl md:text-[30px] lg:text-[40px]">
                  <ShinyText
                    text={`$${product.price}`}
                    speed={1.9}
                    delay={0}
                    color="#000000"
                    shineColor="#ffffff"
                    spread={40}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                  />
                </span>
                <span className="text-3xl lg:text-[30px] md:text-[25px] flex flex-row items-center gap-4 lg:gap-[40px]">
                  <button
                    onClick={handleWishlistToggle}
                    className="cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 active:scale-90">
                    <Heart
                      fill={inWishlist ? "currentColor" : "none"}
                      className={`size-10 lg:size-15 ${
                        inWishlist ? "text-red-500" : "text-gray-400"
                      }`}
                    />
                  </button>
                  {product.rating.rate} stars
                </span>
              </span>
              <p className="text-2xl lg:text-[25px] md:text-[20px] text-gray-600">
                {product.description}
              </p>
            </div>

            <div className="btns flex items-start flex-col gap-6 lg:gap-5 mt-8 lg:mt-10">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:gap-10 w-full lg:w-auto">
                <button
                  onClick={handleAddToCart}
                  className="bg-amber-600 text-white rounded-4xl text-2xl md:text-3xl px-10 md:px-60 lg:px-50 py-6 lg:py-8 cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl active:scale-95 md:active:scale-100">
                  Add to cart
                </button>

                <div className="flex items-center justify-around w-full sm:w-[260px] md:w-[470px] lg:w-[503px] p-4 md:p-4 bg-gray-300 text-amber-600 rounded-4xl">
                  <button
                    onClick={() => setItemCount((prev) => prev + 1)}
                    className="transition-all duration-200 ease-in-out hover:scale-125 active:scale-125 md:active:scale-90 cursor-pointer">
                    <Plus className="size-12 lg:size-15" />
                  </button>
                  <span className="counter text-4xl md:text-[25px] lg:text-[30px] select-none">
                    {itemCount}
                  </span>
                  <button
                    onClick={() =>
                      setItemCount((prev) => (prev <= 1 ? prev : prev - 1))
                    }
                    className="transition-all duration-200 ease-in-out hover:scale-125 active:scale-125 md:active:scale-90 cursor-pointer">
                    <Minus className="size-12 lg:size-15" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleBuyNow}
                className="bg-black cursor-pointer text-center text-white rounded-4xl text-2xl lg:text-3xl px-10 md:px-30 py-6 md:py-8 lg:py-8 transition-all duration-200 ease-in-out hover:scale-102 hover:shadow-xl active:scale-95 md:active:scale-100 self-stretch w-full">
                Buy Now
              </button>
            </div>
          </div>

          <img
            src={product.image}
            alt="Product-picture"
            className="w-[200px] max-w-[300px] lg:max-w-[400px] md:w-full rounded-4xl order-1 lg:order-2"
          />
        </div>
      </div>

      {/* Auth Modal Trigger */}
      <AuthRequiredModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        actionName={pendingActionName}
      />
    </>
  );
}
