import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/api/auth/check-session', { withCredentials: true, })
      .then(res => setLoggedIn(res.data.loggedIn))
      .catch(err => {
        if (err.response) console.error(err.response.data?.message);
        setLoggedIn(false)
      })
  }, []);

  const logout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/logout", { withCredentials: true });
      console.log(res.data.message);
      setLoggedIn(false);
      navigate('/login')
    }
    catch (err) {
      console.error('logout failed', err)
    }
  }

  return { loggedIn, logout }
};