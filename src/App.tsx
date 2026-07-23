import HomePage from "./pages/Home";
import Cart from "./pages/cart";
import Nav from "./components/layout/nav";
import WishList from "./pages/wishlist";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Footer from "./components/layout/footer";
import NotFound from "./pages/notfound";
import Profile from "./pages/profile";
import Checkout from "./pages/checkout";
import MobileNav from "./components/layout/mobileNav";
import ClickSpark from "./components/layout/ClickSpark";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { useRouteLoading } from "@/hooks/useLoader";
import PageLoader from "@/components/layout/pageloader";

function AppContent() {
  const isLoading = useRouteLoading();
  return (
    <>
      {isLoading && <PageLoader />}
      <Toaster
        position="top-left"
        toastOptions={{
          classNames: {
            toast: "!text-lg !p-8 !rounded-2xl",
            title: "!text-3xl !font-bold !text-amber-600",
            description: "!text-2xl !text-gray-700",
          },
          style: {
            fontSize: "1.1rem",
            padding: "1.25rem 1.5rem",
            borderRadius: "1rem",
          },
        }}
      />
      <ClickSpark
        sparkColor="#94a3b8"
        sparkSize={20}
        sparkRadius={30}
        sparkCount={10}
        duration={400}>
        <Nav />
        <MobileNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishList" element={<WishList />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ClickSpark>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/PIRX">
      <AppContent />
    </BrowserRouter>
  );
}
