import {
  UserRound,
  Menu,
  Home,
  ShoppingCart,
  Heart,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/store/useCart";
import Logo from "../../assets/pirx_logo_combined.svg";
import { useWishlist } from "@/store/useWishlist";
import { useAuth } from "@/store/authStore";

export default function MobileNav() {
  const { cartItems } = useCart();
  const { items } = useWishlist();
  const { user } = useAuth(); // Retrieve current authenticated user

  return (
    <nav className="flex animate-fade-slide-in justify-between items-center rounded-full bg-gray-200 p-3 px-3 pr-10 mt-5 max-w-screen lg:hidden">
      <Link
        to="/"
        className="flex items-center justify-center bg-gray-300 rounded-full w-fit h-fit transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gray-100">
        <img src={Logo} alt="Pirx logo" className="w-70 h-30" />
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <button className="lg:hidden cursor-pointer">
            <Menu className="size-20" />
          </button>
        </SheetTrigger>
        <SheetContent side="top" className="w-full py-16 rounded-b-4xl">
          <div className="flex flex-col gap-8 items-center">
            <Link
              to="/"
              className="flex items-center gap-4 text-3xl font-semibold border-b-2 border-gray-200 w-full justify-center pb-3 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-black active:-translate-y-1 active:border-black">
              <Home className="size-8" /> Home
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-4 text-3xl font-semibold border-b-2 border-gray-200 w-full justify-center pb-5 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-black active:-translate-y-1 active:border-black">
              <ShoppingCart
                fill="currentColor"
                className="size-8 text-yellow-500"
              />{" "}
              Cart ( {cartItems.length} )
            </Link>

            <Link
              to="/wishlist"
              className="flex items-center gap-4 text-3xl font-semibold border-b-2 border-gray-200 w-full justify-center pb-5 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-black active:-translate-y-1 active:border-black">
              <Heart fill="currentColor" className="text-red-500 size-8" />{" "}
              Wishlist ( {items.length} )
            </Link>

            {/* Conditional Mobile Navigation Rendering */}
            {user ? (
              <Link
                to="/Profile"
                aria-label="profile"
                className="flex items-center gap-4 text-3xl font-semibold w-full justify-center pb-5 border-b-2 border-gray-200 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-black active:-translate-y-1 active:border-black">
                <UserRound className="size-8" /> Profile
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-4 text-3xl font-semibold border-b-2 border-gray-200 w-full justify-center pb-5 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-black active:-translate-y-1 active:border-black">
                  <LogIn className="size-8" /> Log In
                </Link>

                <Link
                  to="/signup"
                  className="flex items-center gap-4 text-3xl font-semibold border-b-2 border-gray-200 w-full justify-center pb-5 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-black active:-translate-y-1 active:border-black">
                  <UserPlus className="size-8" /> Sign Up
                </Link>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
