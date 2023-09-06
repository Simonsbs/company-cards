import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/company-cards/login");
    }
  }, [token, navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
