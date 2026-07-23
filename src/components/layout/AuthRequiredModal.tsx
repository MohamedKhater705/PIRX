import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionName?: string;
}

export default function AuthRequiredModal({
  isOpen,
  onClose,
  actionName = "continue",
}: AuthRequiredModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="z-[9999] sm:max-w-3xl p-12 lg:p-16 rounded-4xl text-center flex flex-col items-center bg-white shadow-2xl border-0">
        {/* Icon Container */}
        <div className="size-36 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-8">
          <Lock className="size-20" />
        </div>

        <DialogHeader className="p-0">
          <DialogTitle className="text-5xl lg:text-6xl font-bold text-center">
            Authentication Required
          </DialogTitle>
          <DialogDescription className="text-2xl lg:text-3xl text-gray-500 mt-6 text-center leading-relaxed">
            You must be logged in to {actionName}.
          </DialogDescription>
        </DialogHeader>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full mt-12">
          <Link to="/login" className="w-full" onClick={onClose}>
            <Button className="w-full text-3xl py-10 h-auto rounded-3xl bg-black text-white hover:bg-gray-800 transition-all cursor-pointer">
              Log In
            </Button>
          </Link>
          <Link to="/signup" className="w-full" onClick={onClose}>
            <Button
              variant="outline"
              className="w-full text-3xl py-10 h-auto rounded-3xl border-2 transition-all cursor-pointer">
              Sign Up
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
