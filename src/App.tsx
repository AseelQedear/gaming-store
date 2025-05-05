// src/App.tsx

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { WishlistProvider } from "./components/wishlistContext";
import { CartProvider, useCart } from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedCheckout from "./components/ProtectedCheckout";
import PrivateRoute from "./components/PrivateRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";

import "./i18n";
import AOS from "aos";
import "aos/dist/aos.css";

import "./App.scss";

const AppContent: React.FC = () => {
  const { isDrawerOpen, closeCart, cartItems, updateQuantity, removeItem } = useCart();
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

 
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const hideNavFooter = location.pathname === "/checkout";

  return (
    <>
      {!hideNavFooter && <AppNavbar />}

      <main className={!hideNavFooter ? "container mt-4 pt-5" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:name" element={<ProductDetails />} />

          <Route
            path="/register"
            element={
              <PublicOnlyRoute>
                <Register />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/checkout" element={<ProtectedCheckout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!hideNavFooter && <Footer />}

      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onQuantityChange={updateQuantity}
        onRemoveItem={removeItem}
      />
    </>
  );
};

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <WishlistProvider>
        <CartProvider>
          <AuthProvider>
            <Router>
              <AppContent />
            </Router>
          </AuthProvider>
        </CartProvider>
      </WishlistProvider>
    </React.StrictMode>
  );
};

export default App;
