import { Link } from "react-router-dom";
import { Handbag, Heart, UserRound } from "lucide-react";
import Logo from "../../assets/pirx_logo_combined.svg";
import { useCart } from "@/store/useCart";
import { useSearch } from "@/store/useSearch";
import { useWishlist } from "@/store/useWishlist";
import { useAuth } from "@/store/authStore";

export default function Nav() {
  const { cartItems } = useCart();
  const { query, setQuery } = useSearch();
  const { items } = useWishlist();
  const { user } = useAuth(); // Retrieve current authenticated user

  return (
    <nav className="hidden animate-fade-slide-in justify-between items-center rounded-full bg-gray-200 p-3 px-6 my-7 max-w-730 mx-auto lg:flex">
      <div className="gap-[1.6rem] flex items-center">
        <Link
          to="/"
          className="flex shrink-0 items-center justify-center bg-gray-300 rounded-full w-fit h-fit transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gray-100">
          <img src={Logo} alt="Pirx logo" className="w-70 h-30" />
        </Link>
        <form className="searchBar relative">
          <input
            aria-label="Search products"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="py-8 px-16 bg-white capitalize rounded-full pr-[11.2rem]"
            placeholder="Search Products..."
          />
        </form>
      </div>

      <div className="flex gap-5">
        <Link
          to="/cart"
          aria-label="cart"
          className="group bg-white flex items-center rounded-full w-24 h-24 hover:w-60 p-0 overflow-hidden transition-all duration-200 ease-in-out hover:scale-105 active:scale-100 hover:bg-gray-100">
          <span className="flex items-center justify-center w-24 h-24 shrink-0">
            <Handbag />
          </span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap px-2">
            {cartItems.length} items
          </span>
        </Link>

        <Link
          to="/wishlist"
          aria-label="wishlist"
          className="group bg-white flex items-center rounded-full w-24 h-24 hover:w-60 p-0 overflow-hidden transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gray-100 active:scale-100">
          <span className="flex items-center justify-center w-24 h-24 shrink-0">
            <Heart fill="currentColor" className="text-red-500" />
          </span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap px-2">
            {items.length} items
          </span>
        </Link>

        {/* Conditional Auth Rendering */}
        {user ? (
          <Link
            to="/Profile"
            aria-label="profile"
            className="bg-white flex justify-between items-center rounded-full w-56 h-24 p-0 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gray-100 active:scale-100">
            <span className="ml-5">Profile</span>
            <UserRound className="w-25 h-25 p-4 bg-amber-200 rounded-full" />
          </Link>
        ) : (
          <>
            <Link
              to="/SignUp"
              aria-label="Sign up"
              className="flex justify-center items-center rounded-full w-56 h-24 border-2 border-black text-black font-semibold transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:scale-105 active:scale-95">
              <span>Sign Up</span>
            </Link>

            <Link
              to="/Login"
              aria-label="Log in"
              className="flex justify-center items-center rounded-full w-56 h-24 bg-black text-white font-semibold border-2 border-black transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-black hover:scale-105 active:scale-95">
              <span>Log In</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
