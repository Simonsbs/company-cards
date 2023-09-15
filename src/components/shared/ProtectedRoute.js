import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const ProtectedRoute = ({ requiresAdmin = false }) => {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (requiresAdmin && user?.Role !== "Admin") {
      navigate("/user-business-cards");
    }
  }, [token, user, navigate, requiresAdmin]);

  return <Outlet />;
};

export default ProtectedRoute;
