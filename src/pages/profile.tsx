import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Pencil, Package, User, Lock, MapPin } from "lucide-react";
import { useAuth } from "@/store/authStore";
import AccountModal from "@/components/layout/accountModal";
import { useNavigate } from "react-router-dom";

const orders = [
  {
    id: "1024",
    date: "July 2, 2026",
    items: 3,
    total: "239.97$",
    status: "Delivered",
  },
  {
    id: "1031",
    date: "June 18, 2026",
    items: 1,
    total: "79.99$",
    status: "Shipped",
  },
  {
    id: "1042",
    date: "May 30, 2026",
    items: 2,
    total: "159.98$",
    status: "Cancelled",
  },
];

const statusColor: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Controls modal visibility and which tab opens initially
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"profile" | "password" | "address">(
    "profile",
  );

  const openTabModal = (tab: "profile" | "password" | "address") => {
    setModalTab(tab);
    setIsModalOpen(true);
  };

  // Handles Logout and triggers route loader by navigating to home
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Helper to resolve address details whether stored as string or object
  const getAddressDetail = (
    key: "street" | "city" | "postalCode" | "country",
  ) => {
    if (!user?.address) return null;
    if (typeof user.address === "object") {
      return user.address[key] || null;
    }
    return key === "street" ? user.address : null;
  };

  const street = getAddressDetail("street");
  const city = getAddressDetail("city");
  const postalCode = getAddressDetail("postalCode");
  const country = getAddressDetail("country");

  const hasAddress = street || city || postalCode || country;

  return (
    <div className="max-w-7xl mx-auto py-24 px-10 flex flex-col gap-20">
      {/* Account Modal */}
      <AccountModal
        isOpen={isModalOpen}
        initialTab={modalTab}
        onClose={() => setIsModalOpen(false)}
      />

      {/* User info */}
      <Card className="p-6 md:p-16 rounded-3xl shadow-xl">
        <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 p-0">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 text-center sm:text-left">
            <div className="size-40 md:size-44 rounded-full bg-gray-200 flex items-center justify-center text-5xl md:text-6xl font-bold text-gray-500">
              <User className="size-30" />
            </div>
            <div>
              <h2 className="text-5xl md:text-6xl font-bold">
                {user?.username || "Guest"}
              </h2>
              <p className="text-gray-500 text-[17px] md:text-3xl mt-1 md:mt-3">
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => openTabModal("profile")}
            className="text-2xl py-3 px-4 md:py-8 md:px-8 rounded-2xl h-auto cursor-pointer transition-all duration-200 hover:bg-gray-100 active:scale-95">
            <Pencil className="mr-2 size-7" /> Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Order history */}
      <div>
        <h3 className="text-5xl font-bold mb-10 flex items-center gap-4">
          <Package className="size-12" /> Order History
        </h3>
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <Card key={order.id} className="p-10 rounded-2xl shadow-md">
              <CardContent className="flex items-center justify-between p-0">
                <div>
                  <p className="text-3xl font-semibold">Order #{order.id}</p>
                  <p className="text-gray-500 text-xl mt-2">
                    {order.date} · {order.items} items
                  </p>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-3xl font-bold">{order.total}</span>
                  <Badge
                    className={`text-lg px-5 py-3 rounded-full ${statusColor[order.status]}`}>
                    {order.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Saved Address Section */}
      <Card className="p-10 md:p-16 rounded-3xl shadow-xl">
        <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
          <CardTitle className="text-4xl md:text-5xl font-bold flex items-center gap-4">
            <MapPin className="size-10 md:size-12" /> Saved Address
          </CardTitle>
          <Button
            variant="outline"
            onClick={() => openTabModal("address")}
            className="text-xl md:text-2xl py-3 px-5 md:py-6 md:px-8 rounded-2xl h-auto cursor-pointer transition-all duration-200 hover:bg-gray-100">
            <Pencil className="mr-2 size-6" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {hasAddress ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <div>
                <p className="text-gray-400 text-lg md:text-xl font-medium">
                  Street
                </p>
                <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-1">
                  {street || "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-lg md:text-xl font-medium">
                  City
                </p>
                <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-1">
                  {city || "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-lg md:text-xl font-medium">
                  Postal Code
                </p>
                <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-1">
                  {postalCode || "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-lg md:text-xl font-medium">
                  Country
                </p>
                <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-1">
                  {country || "—"}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-2xl py-4">
              No shipping address saved yet.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="p-16 rounded-3xl shadow-xl">
        <CardHeader className="p-0 mb-8">
          <CardTitle className="text-5xl font-bold">Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-col md:flex-row gap-5">
          <Button
            variant="outline"
            onClick={() => openTabModal("password")}
            className="justify-start text-2xl py-8 px-8 rounded-2xl h-auto cursor-pointer transition-all duration-200 hover:bg-gray-100 active:scale-95">
            <Lock className="mr-2 size-7" /> Change Password
          </Button>

          <Button
            variant="outline"
            onClick={() => openTabModal("address")}
            className="justify-start text-2xl py-8 px-8 rounded-2xl h-auto cursor-pointer transition-all duration-200 hover:bg-gray-100 active:scale-95">
            <MapPin className="mr-2 size-7" /> Shipping Address
          </Button>

          <Button
            variant="destructive"
            onClick={handleLogout}
            className="justify-start text-2xl py-8 px-8 rounded-2xl h-auto cursor-pointer transition-all duration-200 active:scale-95 hover:bg-red-200">
            <LogOut className="mr-2 size-7" /> Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
