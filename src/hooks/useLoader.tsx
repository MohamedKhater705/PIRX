import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useRouteLoading(delay = 400) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), delay);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return isLoading;
}
