import { useState } from "react";
import { useAuth } from "@/store/authStore";

export function useRequireAuth() {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingActionName, setPendingActionName] = useState("continue");

  /**
   * Wraps any action. If user is logged in, executes callback immediately.
   * If not logged in, opens the modal.
   */
  const requireAuth = (actionCallback: () => void, actionName = "continue") => {
    if (user) {
      actionCallback();
    } else {
      setPendingActionName(actionName);
      setIsAuthModalOpen(true);
    }
  };

  return {
    requireAuth,
    isAuthModalOpen,
    closeAuthModal: () => setIsAuthModalOpen(false),
    pendingActionName,
  };
}
