import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {

    if (hasRun.current) return;
    hasRun.current = true;
    
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');

    if (setIsLogin) {
      setIsLogin(false);
    }

    alert("Wylogowano");

    
    navigate("/login", { replace: true });
  }, [navigate, setIsLogin]);

  
  return null;
};