import { Link } from "react-router-dom";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center">
      <Ghost className="size-32 text-gray-300" />
      <h1 className="text-9xl font-extrabold">404</h1>
      <p className="text-4xl text-gray-500">
        This page wandered off somewhere.
      </p>
      <Link
        to="/"
        className="mt-6 px-10 py-6 bg-black text-white rounded-2xl text-2xl hover:bg-gray-800 transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl active:scale-95">
        Back to Home
      </Link>
    </div>
  );
}
