import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [isAuthenticated, setIsAuthenticated] = useState(user);

  useEffect(() => {
    setIsAuthenticated(user);
    return () => {
        setIsAuthenticated(false);
    };
  }, []);

  return isAuthenticated ? <Component /> : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
