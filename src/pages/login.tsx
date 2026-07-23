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
import { useState, FormEvent } from "react";
import { useAuth } from "@/store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    login({ email: email });
    navigate("/"); // Redirects home and triggers route spinner hook automatically
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-4xl p-8 md:p-24 shadow-2xl shadow-gray-350/50 rounded-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-6xl md:text-8xl font-bold">
            Welcome back
          </CardTitle>
          <CardDescription className="text-2xl md:text-3xl mt-3 md:mt-6">
            Log in to continue to PIRX
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-6 md:mt-10">
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-8 md:gap-14">
            <div className="flex flex-col gap-3 md:gap-4">
              <Label htmlFor="email" className="text-2xl md:text-3xl">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="!text-2xl md:!text-4xl py-5 md:py-7 px-5 md:px-8 h-auto rounded-2xl placeholder:text-2xl md:placeholder:text-4xl"
              />
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              <Label htmlFor="password" className="text-2xl md:text-3xl">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="!text-4xl md:!text-6xl py-2 md:py-2 px-5 md:px-8 h-auto rounded-2xl placeholder:text-4xl md:placeholder:text-6xl"
              />
            </div>

            <Button
              type="submit"
              className="w-full text-2xl md:text-4xl py-6 md:py-8 h-auto rounded-2xl mt-3 md:mt-6 cursor-pointer">
              Log In
            </Button>
          </form>

          <p className="text-center text-gray-500 text-2xl md:text-3xl mt-8">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-black font-semibold hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-center text-gray-500 text-2xl md:text-3xl mt-3">
            <Link to="/" className="text-black font-semibold hover:underline">
              Continue as a guest?
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
