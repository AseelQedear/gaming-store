import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaMoon,
  FaSun,
  FaSearch,
  FaGamepad,
  FaSignOutAlt,
} from "react-icons/fa";
import { useCart } from "../components/CartContext";
import { useAuth } from "../components/AuthContext";

const AppNavbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [bounce, setBounce] = useState(false);

  const { openCart, cartItems } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", String(newMode));
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.documentElement.classList.toggle("dark-mode", savedMode);
  }, []);


  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (totalItemCount > 0) {
      setBounce(true);
      const timeout = setTimeout(() => setBounce(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [totalItemCount]);

  useEffect(() => {
    const gamepadIcon = document.querySelector(".nav-icon") as HTMLElement;
    if (gamepadIcon) {
      gamepadIcon.addEventListener("mouseenter", () => {
        gamepadIcon.classList.remove("wiggle");
        void gamepadIcon.offsetWidth;
        gamepadIcon.classList.add("wiggle");
      });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const wrapper = document.querySelector(".search-wrapper");
      if (wrapper && !wrapper.contains(e.target as Node)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowSearch(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleUserClick = () => {
    isAuthenticated ? navigate("/profile") : navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchTerm.trim()) {
        navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
        setShowSearch(false);
        setSearchTerm("");
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-md fixed-top shadow-sm">
      <div className="container-fluid px-4">
        <NavLink className="navbar-brand d-flex align-items-center" to="/" title="Home">
          <FaGamepad size={20} className="nav-icon pop-in" />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="mainNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-md-0 gap-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Devices</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 icon-group">
            <div className={`search-wrapper ${showSearch ? "expanded-wrapper" : "hide-on-mobile"}`}>
              <span title="Search" onClick={() => setShowSearch(!showSearch)} style={{ cursor: "pointer" }}>
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                className={`search-input ${showSearch ? "expanded" : ""}`}
              />
            </div>

            <span title="Toggle Dark Mode" className="hide-on-mobile" onClick={toggleDarkMode} style={{ cursor: "pointer" }}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </span>

            <span title="Cart" onClick={openCart} className="cart-icon" style={{ cursor: "pointer" }}>
              <FaShoppingCart />
              {totalItemCount > 0 && (
                <span className={`cart-badge ${bounce ? "bounce-cart" : ""}`}>{totalItemCount}</span>
              )}
            </span>

            <span title="Profile" onClick={handleUserClick} style={{ cursor: "pointer" }}>
              <FaUser />
            </span>

            {isAuthenticated && (
              <span title="Logout" onClick={handleLogout} style={{ cursor: "pointer" }}>
                <FaSignOutAlt />
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
