import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {

        const res = await axios.get("http://localhost:4000/api/auth/check-session", { withCredentials: true });

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
          console.error(err.response?.data?.message || "Session expired");
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
      await axios.get("http://localhost:4000/api/auth/logout", { withCredentials: true });
      setLoggedIn(false);
      navigate("/login");
    }
    catch (err) {
      console.error("Logout failed", err);
    }
  };

  return { loggedIn, logout };
};