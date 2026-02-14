import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logout as logoutService, checkSession as validateSessionService } from "../services/authService";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));


  useEffect(() => {

    const token = localStorage.getItem('token');

    if (token) {
      validateSessionService()
        .then(() => setLoggedIn(true))
        .catch(() => {
          logout();
        })

    }
    else {
      setLoggedIn(false);
      
    }
  }, []);



  const logout = async () => {
    try {
      await logoutService();
    } catch (err) {
      console.error("Logout failed on backend:", err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setLoggedIn(false);
      navigate("/login");
    }
  };

  return { loggedIn, logout };
};
