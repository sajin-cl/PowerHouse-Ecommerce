import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

    let active = true;

    const checkSession = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/auth/check-session", {
          withCredentials: true,
        });
        if (!active) return;
        setLoggedIn(res.data.loggedIn);
      } catch (err) {
        if (!active) return;
        console.error(err.response?.data?.message || "Session check failed");
        navigate("/login");
      }
    };

    checkSession();

    const interval = setInterval(checkSession, 30000);

    return () => { active = false; clearInterval(interval); };

  }, []);
  

  const logout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/logout", { withCredentials: true });
      console.log(res.data.message);
      setLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return { loggedIn, logout };
};
