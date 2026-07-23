import { useState } from "react";
import SpotlightCard from "../ui/SpotlightCard";
import ShinyText from "../ui/ShinyText";
import type { Product } from "@/types/index";
import { useCart } from "@/store/useCart";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import AuthRequiredModal from "@/components/layout/AuthRequiredModal";
import { toast } from "sonner";

interface CardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: CardProps) {
  const [isBtnActive, setIsBtnActive] = useState(false);
  const { addToCart } = useCart();

  const { requireAuth, isAuthModalOpen, closeAuthModal, pendingActionName } =
    useRequireAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents opening the modal card when clicking "Add"

    requireAuth(() => {
      addToCart(product);
      toast.success("Added to cart!", {
        description: `${product.title} is now in your shopping cart.`,
      });
    }, "add items to your cart");
  };

  return (
    <>
      <div
        onClick={onClick}
        className={`bg-gray-300 flex flex-col h-full animate-fade-slide-in cursor-pointer rounded-2xl transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl ${
          isBtnActive ? "" : "active:scale-95"
        }`}>
        {/* Top Section: Image */}
        <SpotlightCard>
          <img
            src={product.image}
            alt="Product-Picture"
            className="w-full h-80 object-contain rounded-t-2xl"
          />
        </SpotlightCard>

        {/* Bottom Section: Content wrapper */}
        <div className="flex flex-col flex-1 justify-between p-8">
          {/* Title and Description Group */}
          <div className="mb-6">
            <p className="capitalize text-[2rem] font-bold line-clamp-1">
              {product.title}
            </p>

            {product.description && (
              <p className="text-gray-700 text-xl mt-2 line-clamp-2">
                {product.description}
              </p>
            )}
          </div>

          {/* Footer Group: Price & Button */}
          <div className="flex justify-between items-center mt-auto">
            <span>
              <p className="capitalize text-[2.5rem] font-bold">
                <ShinyText
                  text={`$${product.price}`}
                  speed={1.9}
                  delay={0}
                  color="#000000"
                  shineColor="#ffffff"
                  spread={120}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                />
              </p>
            </span>

            <div className="flex-shrink-0">
              <button
                onClick={handleAddToCart}
                onMouseDown={() => setIsBtnActive(true)}
                onMouseUp={() => setIsBtnActive(false)}
                onMouseLeave={() => setIsBtnActive(false)}
                className="flex cursor-pointer justify-between items-center w-50 h-20 p-12 font-regular text-justify text-[3rem] shrink-0 bg-white rounded-full transition-transform duration-200 hover:scale-110 active:scale-90 ml-5">
                <span className="text-3xl">Add</span> +
              </button>
            </div>
          </div>
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
