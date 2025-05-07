import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaUser,
  FaShoppingCart,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaSearch,
  FaGlobe,
  FaGamepad,
} from "react-icons/fa";
import { Offcanvas } from "react-bootstrap";
import { useCart } from "../components/CartContext";
import { useAuth } from "../components/AuthContext";
import { useTranslation } from "react-i18next";


const MobileResponsiveNavbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { cartItems } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", String(newMode));
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.setAttribute("dir", lng === "ar" ? "rtl" : "ltr");
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.documentElement.classList.toggle("dark-mode", savedMode);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <>
      <nav className="mobile-navbar d-flex justify-content-between align-items-center px-3">
        <NavLink to="/">
          <FaGamepad size={22} className="text-accent" />
        </NavLink>

        <div className="icon-group d-flex align-items-center gap-3">
          <FaSearch title={t("search")} onClick={() => navigate("/products")} />
          <div className="cart-icon position-relative" onClick={() => navigate("/cart")}>
            <FaShoppingCart title={t("cart")} />
            {totalItemCount > 0 && <span className="cart-badge">{totalItemCount}</span>}
          </div>
          <FaBars title="Menu" onClick={() => setSidebarOpen(true)} />
        </div>
      </nav>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <Offcanvas show={sidebarOpen} onHide={() => setSidebarOpen(false)} placement="end" className="mobile-sidebar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{t("menu")}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="sidebar-links">
            <li><NavLink to="/products" onClick={() => setSidebarOpen(false)}>{t("devices")}</NavLink></li>
            <li><NavLink to="/about" onClick={() => setSidebarOpen(false)}>{t("about")}</NavLink></li>
          </ul>

          <div className="sidebar-controls">
            <button onClick={toggleDarkMode}>
              {darkMode ? <><FaSun /> {t("light_mode")}</> : <><FaMoon /> {t("dark_mode")}</>}
            </button>

            {isAuthenticated && (
              <button onClick={handleLogout}>
                <FaSignOutAlt /> {t("logout")}
              </button>
            )}

            <button onClick={() => navigate(isAuthenticated ? "/profile" : "/login")}>
              <FaUser /> {t("profile")}
            </button>

            <div className="lang-switch">
              <button onClick={() => changeLanguage("en")}><FaGlobe /> EN</button>
              <button onClick={() => changeLanguage("ar")}><FaGlobe /> AR</button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MobileResponsiveNavbar;
