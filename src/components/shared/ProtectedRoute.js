import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
