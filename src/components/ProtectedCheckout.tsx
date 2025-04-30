import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import Checkout from "../pages/Checkout";

const ProtectedCheckout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { cartItems, cartLoaded } = useCart();

  useEffect(() => {
    console.log("🛒 ProtectedCheckout Debug:");
    console.log("isAuthenticated:", isAuthenticated);
    console.log("cartLoaded:", cartLoaded);
    console.log("cartItems:", cartItems);
  }, [isAuthenticated, cartLoaded, cartItems]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!cartLoaded) {
    return <div>Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return <Navigate to="/products" replace />;
  }

  return <Checkout />;
};

export default ProtectedCheckout;
