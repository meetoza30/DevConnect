// hooks/useAuth.js
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/check-auth`, { withCredentials: true });
      if (res.data?.status) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();

    const onStorageChange = () => checkAuth();
    window.addEventListener("storage", onStorageChange);

    return () => window.removeEventListener("storage", onStorageChange);
  }, [checkAuth]);

  return { isLoggedIn};
}
