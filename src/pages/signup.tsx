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
import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/store/authStore";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSignUp(e: FormEvent) {
    e.preventDefault();
    login({
      email: email,
      fullName: fullname,
      username: username,
      address: {
        street,
        city,
        postalCode,
        country,
      },
    });
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-7xl p-8 md:p-24 shadow-2xl shadow-gray-350/50 rounded-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-6xl md:text-8xl font-bold">
            Create account
          </CardTitle>
          <CardDescription className="text-2xl md:text-3xl mt-3 md:mt-6">
            Sign up to get started with PIRX
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8 md:gap-14 mt-6 md:mt-10">
          <form
            onSubmit={handleSignUp}
            className="flex flex-col gap-5 md:gap-10">
            {/* Row 1: Name & Username */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-10">
              <div className="flex flex-col gap-3 md:gap-4">
                <Label htmlFor="fullName" className="text-2xl md:text-3xl">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={fullname}
                  onChange={(e) => setFullname(e.currentTarget.value)}
                  className="!text-2xl md:!text-4xl py-5 md:py-7 px-5 md:px-8 h-auto rounded-2xl placeholder:text-2xl md:placeholder:text-4xl"
                />
              </div>

              <div className="flex flex-col gap-3 md:gap-4">
                <Label htmlFor="username" className="text-2xl md:text-3xl">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  className="!text-2xl md:!text-4xl py-5 md:py-7 px-5 md:px-8 h-auto rounded-2xl placeholder:text-2xl md:placeholder:text-4xl"
                />
              </div>
            </div>

            {/* Row 2: Email & Street Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-10">
              <div className="flex flex-col gap-3 md:gap-4">
                <Label htmlFor="email" className="text-2xl md:text-3xl">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  className="!text-2xl md:!text-4xl py-5 md:py-7 px-5 md:px-8 h-auto rounded-2xl placeholder:text-2xl md:placeholder:text-4xl"
                />
              </div>

              <div className="flex flex-col gap-3 md:gap-4">
                <Label htmlFor="street" className="text-2xl md:text-3xl">
                  Street Address
                </Label>
                <Input
                  id="street"
                  type="text"
                  placeholder="123 Main St"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.currentTarget.value)}
                  className="!text-2xl md:!text-4xl py-5 md:py-7 px-5 md:px-8 h-auto rounded-2xl placeholder:text-2xl md:placeholder:text-4xl"
                />
              </div>
            </div>

            {/* Row 3: City, Postal Code & Country */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-10">
              <div className="flex flex-col gap-3 md:gap-4">
                <Label htmlFor="city" className="text-2xl md:text-3xl">
                  City
                </Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Cairo"
                  required
                  value={city}
                  onChange={(e) => setCity(e.currentTarget.value)}
                  className="!text-2xl md:!text-4xl py-5 md:py-7 px-5 md:px-8 h-auto rounded-2xl placeholder:text-2xl md:placeholder:text-4xl"
                />
              </div>

              <div className="flex flex-col gap-3 md:gap-4">
                <Label htmlFor="postalCode" className="text-2xl md:text-3xl">
                  Postal Code
                </Label>
                <Input
                  id="postalCode"
                  type="text"
                  placeholder="11511"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.currentTarget.value)}
                  className="!text-2xl md:!text-4xl py-5 md:py-7 px-5 md:px-8 h-auto rounded-2xl placeholder:text-2xl md:placeholder:text-4xl"
                />
              </div>

              <div className="flex flex-col gap-3 md:gap-4 sm:col-span-2 md:col-span-1">
                <Label htmlFor="country" className="text-2xl md:text-3xl">
                  Country
                </Label>
                <Input
                  id="country"
                  type="text"
                  placeholder="Egypt"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.currentTarget.value)}
                  className="!text-2xl md:!text-4xl py-5 md:py-7 px-5 md:px-8 h-auto rounded-2xl placeholder:text-2xl md:placeholder:text-4xl"
                />
              </div>
            </div>

            {/* Row 4: Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-10">
              <div className="flex flex-col gap-3 md:gap-4">
                <Label htmlFor="password" className="text-2xl md:text-3xl">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  className="!text-4xl md:!text-6xl py-2 md:py-2 px-5 md:px-8 h-auto rounded-2xl placeholder:text-4xl md:placeholder:text-6xl"
                />
              </div>

              <div className="flex flex-col gap-3 md:gap-4">
                <Label
                  htmlFor="confirmPassword"
                  className="text-2xl md:text-3xl">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="!text-4xl md:!text-6xl py-2 md:py-2 px-5 md:px-8 h-auto rounded-2xl placeholder:text-4xl md:placeholder:text-6xl"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full text-2xl md:text-4xl py-6 md:py-8 h-auto rounded-2xl mt-3 md:mt-6 cursor-pointer">
              Sign Up
            </Button>
          </form>

          <p className="text-center text-gray-500 text-2xl md:text-3xl">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-semibold hover:underline">
              Log in
            </Link>
          </p>
          <p className="text-center text-gray-500 text-2xl md:text-3xl">
            <Link to="/" className="text-black font-semibold hover:underline">
              Continue as a guest?
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
