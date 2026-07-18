import { Navigate } from "react-router-dom";

export const CheckIsToken = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');
  
  console.log("Strażnik Tokenu:", { token, role, allowedRoles});

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles!==role) {
    return <Navigate to={`/${role}/calendary`} replace />;
  }
  
  return children;
};