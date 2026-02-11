import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout as logoutService, checkSession as validateSessionService } from "../services/authService";

export const useAuth = () => {

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {

        const res = await validateSessionService();

        if (isMounted) {
          if (res.data.loggedIn) {
            setLoggedIn(true);
          }
          else if (loggedIn) {
            setLoggedIn(false);
            navigate("/login");
          }
        }
      }
      catch (err) {
        if (isMounted && loggedIn) {
          setLoggedIn(false);
          navigate("/login");
          console.error(err || "Session expired");
        }
      }
    };

    checkSession();

    let interval;
    if (loggedIn) { interval = setInterval(checkSession, 30000); }

    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
    };
  }, [loggedIn, navigate]);




  const logout = async () => {
    try {
      await logoutService();
      setLoggedIn(false);
      navigate("/login");
    }
    catch (err) {
      console.error("Logout failed", err);
    }
  };

  return { loggedIn, logout };
};