import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-black text-white mt-32 px-10 py-16 rounded-t-4xl">
      <div className="flex flex-col lg:flex-row justify-between gap-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          <span className="text-4xl font-bold">pirx.</span>
          <p className="text-gray-400 text-2xl max-w-xs">
            Where every piece is chosen, never just picked.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold text-gray-300">Shop</span>
          <Link to="/" className="text-gray-400 hover:text-white transition">
            Home
          </Link>
          <Link
            to="/cart"
            className="text-gray-400 hover:text-white transition">
            Cart
          </Link>
          <Link
            to="/wishlist"
            className="text-gray-400 hover:text-white transition">
            Wishlist
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold text-gray-300">Account</span>
          <Link
            to="/login"
            className="text-gray-400 hover:text-white transition">
            Log In
          </Link>
          <Link
            to="/signup"
            className="text-gray-400 hover:text-white transition">
            Sign Up
          </Link>
          <Link
            to="/profile"
            className="text-gray-400 hover:text-white transition">
            Profile
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold text-gray-300">Follow</span>

          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400 transition">
              <FaInstagram className="size-6" />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FaTwitter className="size-6" />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FaFacebook className="size-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 max-w-7xl mx-auto">
        © 2026 PIRX. All rights reserved.
      </div>
    </footer>
  );
}
