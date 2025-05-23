import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaUser,
  FaShoppingCart,
  FaSignOutAlt,
  FaSearch,
  FaGlobe,
  FaGamepad,
  FaMoon,
  FaSun,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import { Offcanvas } from "react-bootstrap";
import { useCart } from "../components/CartContext";
import { useAuth } from "../components/AuthContext";
import { useTranslation } from "react-i18next";

const MobileResponsiveNavbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { cartItems, openCart } = useCart(); 
  const { isAuthenticated, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const dir = i18n.dir();
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

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate("/login", { replace: true });
  };

  const handleUserClick = () => {
    navigate(isAuthenticated ? "/profile" : "/login");
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.documentElement.classList.toggle("dark-mode", savedMode);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);

  const topIcons = [
    <FaSearch key="search" title={t("search")} onClick={() => navigate("/products")} />,
    <div key="cart" className="cart-icon position-relative" title={t("cart")} onClick={openCart}>
      <FaShoppingCart />
      {totalItemCount > 0 && <span className="cart-badge">{totalItemCount}</span>}
    </div>,
    <FaUser key="user" title={t("profile")} onClick={handleUserClick} />,
  ];

  return (
    <>
      <nav className="mobile-navbar d-flex justify-content-between align-items-center px-3">
        <NavLink to="/">
          <FaGamepad size={22} className="text-accent nav-icon" />
        </NavLink>

        <div className="icon-group d-flex align-items-center gap-3">
          {(dir === "rtl" ? [...topIcons].reverse() : topIcons).map((icon) => (
            <span key={icon.key}>{icon}</span>
          ))}
          <FaBars title={t("menu")} onClick={() => setSidebarOpen(true)} />
        </div>
      </nav>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <Offcanvas
        show={sidebarOpen}
        onHide={() => setSidebarOpen(false)}
        placement="end"
        className="mobile-sidebar"
      >
        <Offcanvas.Header>
          <Offcanvas.Title>{t("menu")}</Offcanvas.Title>
          <span className="close-icon" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </span>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <ul className="sidebar-links">
            <li>
              <NavLink to="/products" onClick={() => setSidebarOpen(false)}>
                {t("devices")} <FaChevronRight />
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={() => setSidebarOpen(false)}>
                {t("about")} <FaChevronRight />
              </NavLink>
            </li>
          </ul>

          <div className="sidebar-controls-inline">
            <span title={t("dark_mode")} onClick={toggleDarkMode}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </span>

            <span title="AR" onClick={() => changeLanguage("ar")}>
              AR <FaGlobe />
            </span>

            <span title="EN" onClick={() => changeLanguage("en")}>
              EN <FaGlobe />
            </span>
          </div>

          {isAuthenticated && (
            <div className="sidebar-logout">
              <span onClick={handleLogout} title={t("logout")}>
                <FaSignOutAlt /> {t("logout")}
              </span>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MobileResponsiveNavbar;
