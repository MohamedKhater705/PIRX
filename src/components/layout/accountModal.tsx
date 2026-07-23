import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, User, Lock, MapPin } from "lucide-react";
import { useAuth } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

type ModalTab = "profile" | "password" | "address";

interface AccountModalProps {
  initialTab?: ModalTab;
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountModal({
  initialTab = "profile",
  isOpen,
  onClose,
}: AccountModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>(initialTab);
  const { user, updateUser, updatePassword, updateAddress } = useAuth();
  const navigate = useNavigate();

  // Helper to trigger the route loading spinner on form save
  const triggerSpinner = () => {
    onClose();
    navigate("/profile", { replace: true });
  };

  // Keep state synced when initialTab changes from parent
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Profile Form State
  const [username, setUsername] = useState(user?.username || "");
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");

  // Password Form State
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");

  // Address Form State
  const [street, setStreet] = useState(user?.address?.street || "");
  const [city, setCity] = useState(user?.address?.city || "");
  const [postalCode, setPostalCode] = useState(user?.address?.postalCode || "");
  const [country, setCountry] = useState(user?.address?.country || "");

  // Handlers connected to auth store
  const handleProfileSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateUser?.({ username, fullName, email });
    triggerSpinner();
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setPassError("New passwords do not match.");
      return;
    }
    if (newPass.length < 6) {
      setPassError("Password must be at least 6 characters.");
      return;
    }
    setPassError("");
    updatePassword?.({ currentPass, newPass });
    triggerSpinner();
  };

  const handleAddressSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateAddress?.({ street, city, postalCode, country });
    triggerSpinner();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-0 md:p-8">
          {/* Animated Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Animated Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-4xl lg:max-w-5xl z-10">
            <Card className="p-8 md:p-14 lg:p-16 shadow-2xl rounded-3xl lg:rounded-4xl relative bg-white border-0 max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-0 md:top-8 md:right-8 p-3 rounded-full hover:bg-gray-100 active:scale-90 transition-all duration-200 cursor-pointer">
                <X className="size-10 md:size-10 text-gray-500" />
              </button>

              {/* Tab Navigation Controls */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-8 lg:mb-12 border-b pb-8">
                <button
                  type="button"
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-2xl md:text-3xl lg:text-4xl font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${
                    activeTab === "profile"
                      ? "bg-black text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-[1.02]"
                  }`}>
                  <User className="size-7 md:size-9" /> Profile
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("password")}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-2xl md:text-3xl lg:text-4xl font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${
                    activeTab === "password"
                      ? "bg-black text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-[1.02]"
                  }`}>
                  <Lock className="size-7 md:size-9" /> Password
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("address")}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-2xl md:text-3xl lg:text-4xl font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${
                    activeTab === "address"
                      ? "bg-black text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-[1.02]"
                  }`}>
                  <MapPin className="size-7 md:size-9" /> Address
                </button>
              </div>

              {/* TAB 1: EDIT PROFILE */}
              {activeTab === "profile" && (
                <>
                  <CardHeader className="text-center p-0">
                    <CardTitle className="text-5xl md:text-6xl lg:text-7xl font-bold">
                      Edit Profile
                    </CardTitle>
                    <CardDescription className="text-2xl md:text-3xl lg:text-4xl mt-3 text-gray-500">
                      Update your account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-8 md:mt-12 p-0">
                    <form
                      onSubmit={handleProfileSubmit}
                      className="flex flex-col gap-6 md:gap-10">
                      <div className="flex flex-col gap-3">
                        <Label
                          htmlFor="username"
                          className="text-2xl md:text-3xl lg:text-4xl font-medium">
                          Username
                        </Label>
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          className="!text-2xl md:!text-3xl lg:!text-4xl py-6 md:py-8 px-6 h-auto rounded-2xl"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label
                          htmlFor="fullName"
                          className="text-2xl md:text-3xl lg:text-4xl font-medium">
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="!text-2xl md:!text-3xl lg:!text-4xl py-6 md:py-8 px-6 h-auto rounded-2xl"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label
                          htmlFor="email"
                          className="text-2xl md:text-3xl lg:text-4xl font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="!text-2xl md:!text-3xl lg:!text-4xl py-6 md:py-8 px-6 h-auto rounded-2xl"
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.97 }}>
                        <Button
                          type="submit"
                          className="w-full text-2xl md:text-3xl lg:text-4xl py-6 md:py-8 h-auto rounded-2xl bg-black text-white hover:bg-gray-800 shadow-md cursor-pointer mt-4 transition-colors">
                          Save Profile
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </>
              )}

              {/* TAB 2: CHANGE PASSWORD */}
              {activeTab === "password" && (
                <>
                  <CardHeader className="text-center p-0">
                    <CardTitle className="text-5xl md:text-6xl lg:text-7xl font-bold">
                      Change Password
                    </CardTitle>
                    <CardDescription className="text-2xl md:text-3xl lg:text-4xl mt-3 text-gray-500">
                      Keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-8 md:mt-12 p-0">
                    <form
                      onSubmit={handlePasswordSubmit}
                      className="flex flex-col gap-6 md:gap-10">
                      {passError && (
                        <p className="p-4 bg-red-50 text-red-600 rounded-2xl text-center text-xl md:text-2xl font-medium border border-red-200">
                          {passError}
                        </p>
                      )}
                      <div className="flex flex-col gap-3">
                        <Label
                          htmlFor="currentPass"
                          className="text-2xl md:text-3xl lg:text-4xl font-medium">
                          Current Password
                        </Label>
                        <Input
                          id="currentPass"
                          type="password"
                          placeholder="••••••••"
                          value={currentPass}
                          onChange={(e) => setCurrentPass(e.target.value)}
                          required
                          className="!text-3xl md:!text-4xl lg:!text-5xl py-6 md:py-8 px-6 h-auto rounded-2xl"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label
                          htmlFor="newPass"
                          className="text-2xl md:text-3xl lg:text-4xl font-medium">
                          New Password
                        </Label>
                        <Input
                          id="newPass"
                          type="password"
                          placeholder="••••••••"
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          required
                          className="!text-3xl md:!text-4xl lg:!text-5xl py-6 md:py-8 px-6 h-auto rounded-2xl"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label
                          htmlFor="confirmPass"
                          className="text-2xl md:text-3xl lg:text-4xl font-medium">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPass"
                          type="password"
                          placeholder="••••••••"
                          value={confirmPass}
                          onChange={(e) => setConfirmPass(e.target.value)}
                          required
                          className="!text-3xl md:!text-4xl lg:!text-5xl py-6 md:py-8 px-6 h-auto rounded-2xl"
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.97 }}>
                        <Button
                          type="submit"
                          className="w-full text-2xl md:text-3xl lg:text-4xl py-6 md:py-8 h-auto rounded-2xl bg-black text-white hover:bg-gray-800 shadow-md cursor-pointer mt-4 transition-colors">
                          Update Password
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </>
              )}

              {/* TAB 3: CHANGE ADDRESS */}
              {activeTab === "address" && (
                <>
                  <CardHeader className="text-center p-0">
                    <CardTitle className="text-5xl md:text-6xl lg:text-7xl font-bold">
                      Shipping Address
                    </CardTitle>
                    <CardDescription className="text-2xl md:text-3xl lg:text-4xl mt-3 text-gray-500">
                      Manage your primary delivery location
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-8 md:mt-12 p-0">
                    <form
                      onSubmit={handleAddressSubmit}
                      className="flex flex-col gap-6 md:gap-10">
                      <div className="flex flex-col gap-3">
                        <Label
                          htmlFor="street"
                          className="text-2xl md:text-3xl lg:text-4xl font-medium">
                          Street Address
                        </Label>
                        <Input
                          id="street"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          required
                          className="!text-2xl md:!text-3xl lg:!text-4xl py-6 md:py-8 px-6 h-auto rounded-2xl"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="flex flex-col gap-3">
                          <Label
                            htmlFor="city"
                            className="text-2xl md:text-3xl lg:text-4xl font-medium">
                            City
                          </Label>
                          <Input
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className="!text-2xl md:!text-3xl lg:!text-4xl py-6 md:py-8 px-6 h-auto rounded-2xl"
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <Label
                            htmlFor="postalCode"
                            className="text-2xl md:text-3xl lg:text-4xl font-medium">
                            Postal Code
                          </Label>
                          <Input
                            id="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                            className="!text-2xl md:!text-3xl lg:!text-4xl py-6 md:py-8 px-6 h-auto rounded-2xl"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label
                          htmlFor="country"
                          className="text-2xl md:text-3xl lg:text-4xl font-medium">
                          Country
                        </Label>
                        <Input
                          id="country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          required
                          className="!text-2xl md:!text-3xl lg:!text-4xl py-6 md:py-8 px-6 h-auto rounded-2xl"
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.97 }}>
                        <Button
                          type="submit"
                          className="w-full text-2xl md:text-3xl lg:text-4xl py-6 md:py-8 h-auto rounded-2xl bg-black text-white hover:bg-gray-800 shadow-md cursor-pointer mt-4 transition-colors">
                          Save Address
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </>
              )}
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
