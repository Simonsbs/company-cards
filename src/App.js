import { useContext, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import BusinessCardList from "./components/business-card/BusinessCardList";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import UserBusinessCards from "./components/business-card/UserBusinessCards";
import { BusinessCardsProvider } from "./contexts/BusinessCardsContext";
import { ThemeContext, ThemeProvider } from "./contexts/ThemeContext";
import UserProfile from "./components/auth/UserProfile";
import UserManagement from "./components/users/UserManagement";

const App = () => {
  const { theme } = useContext(ThemeContext);

  // Determine the theme class based on the current theme state
  const themeClass =
    theme === "dark" ? "bg-dark text-white" : "bg-light text-dark";

  useEffect(() => {
    document.body.className = themeClass;
  }, [themeClass]);

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<BusinessCardList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-business-cards" element={<ProtectedRoute />}>
            <Route index element={<UserBusinessCards />} />
          </Route>
          <Route path="/profile" element={<ProtectedRoute />}>
            <Route index element={<UserProfile />} />
          </Route>
          <Route
            path="/users"
            element={<ProtectedRoute requiresAdmin={true} />}
          >
            <Route index element={<UserManagement />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

const result = () => (
  <ThemeProvider>
    <AuthProvider>
      <BusinessCardsProvider>
        <App />
      </BusinessCardsProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default result;
