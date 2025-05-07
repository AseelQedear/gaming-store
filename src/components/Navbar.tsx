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
  FaGlobe,
} from "react-icons/fa";
import { useCart } from "../components/CartContext";
import { useAuth } from "../components/AuthContext";
import { useTranslation } from "react-i18next";
import MobileResponsiveNavbar from "./MobileResponsiveNavbar";
import "../styles/partials/navbar.scss";

const AppNavbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [bounce, setBounce] = useState(false);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { openCart, cartItems } = useCart();
  const { isAuthenticated, logout } = useAuth();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

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
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearch(false);
      setSearchTerm("");
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navbar navbar-expand-md fixed-top shadow-sm d-none d-md-flex">
        <div className="container-fluid px-4">
          <NavLink className="navbar-brand d-flex align-items-center" to="/" title="Home">
            <FaGamepad size={20} className="nav-icon pop-in" />
          </NavLink>

          <ul className="navbar-nav mx-auto mb-2 mb-md-0 gap-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">{t("devices")}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">{t("about")}</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 icon-group">
            <div className={`search-wrapper ${showSearch ? "expanded-wrapper" : "hide-on-mobile"}`}>
              <span title={t("search")} onClick={() => setShowSearch(!showSearch)}><FaSearch /></span>
              <input
                type="text"
                placeholder={t("search_placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                className={`search-input ${showSearch ? "expanded" : ""}`}
              />
            </div>

            <span title={t("cart")} onClick={openCart} className="cart-icon">
              <FaShoppingCart />
              {totalItemCount > 0 && (
                <span className={`cart-badge ${bounce ? "bounce-cart" : ""}`}>{totalItemCount}</span>
              )}
            </span>

            <span title={t("profile")} onClick={handleUserClick}><FaUser /></span>

            {isAuthenticated && (
              <span title={t("logout")} onClick={handleLogout}><FaSignOutAlt /></span>
            )}

            <span title={t("dark_mode")} className="hide-on-mobile" onClick={toggleDarkMode}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </span>

            <div className="dropdown lang-dropdown">
              <button
                className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2"
                type="button"
                data-bs-toggle="dropdown"
              >
                <FaGlobe />
                {i18n.language.toUpperCase()}
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => changeLanguage("en")}>EN</button></li>
                <li><button className="dropdown-item" onClick={() => changeLanguage("ar")}>AR</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="d-md-none">
        <MobileResponsiveNavbar />
      </div>
    </>
  );
};

export default AppNavbar;
