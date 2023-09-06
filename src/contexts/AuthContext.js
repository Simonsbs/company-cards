import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { ProjectID } from "../constants/constants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const [token, setTokenState] = useState(initialToken);
  const [decodedToken, setDecodedToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);

        if (decoded.ProjectID !== ProjectID) {
          console.warn("Invalid ProjectID in token. Logging out.");
          setToken(null);
          return;
        }

        setUser({
          email: decoded.Email,
          name: decoded.Name,
          role: decoded.Role,
          projectID: decoded.ProjectID,
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  const setToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
      setUser(null);
      setDecodedToken(null);
    }
    setTokenState(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, decodedToken }}>
      {children}
    </AuthContext.Provider>
  );
};
