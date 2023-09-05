import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import BusinessCardList from "./components/business-card/BusinessCardList";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import UserBusinessCards from "./components/business-card/UserBusinessCards";
import { BusinessCardsProvider } from "./contexts/BusinessCardsContext";

const App = () => {
  return (
    <AuthProvider>
      <BusinessCardsProvider>
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
            </Routes>
          </main>
          <Footer />
        </Router>
      </BusinessCardsProvider>
    </AuthProvider>
  );
};

export default App;
