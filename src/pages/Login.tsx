import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import { useTranslation } from "react-i18next";
import "../styles/Auth.scss";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "null");
    const token = user?.token;
    if (token) {
      navigate("/");
    }
  }, [navigate]);

   useEffect(() => {
      const dir = i18n.dir();
      document.documentElement.setAttribute("dir", dir);
      document.body.classList.toggle("rtl", dir === "rtl");
    }, [i18n.language]);
    
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) newErrors.email = t("login_page.email_required");
    else if (!emailRegex.test(email)) newErrors.email = t("login_page.invalid_email");

    if (!password.trim()) newErrors.password = t("login_page.password_required");
    else if (password.length < 8) newErrors.password = t("login_page.password_too_short");

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setServerError("");

    try {
      const response = await axios.post(
        "https://gaming-store-production.up.railway.app/api/auth/login",
        { email, password }
      );

      if (response.data && response.data.token) {
        const userData = JSON.stringify({
          token: response.data.token,
          email: response.data.email,
        });

        if (rememberMe) {
          localStorage.setItem("user", userData);
          sessionStorage.removeItem("user");
        } else {
          sessionStorage.setItem("user", userData);
          localStorage.removeItem("user");
        }

        loginUser({ token: response.data.token, email: response.data.email });
        navigate("/");
      } else {
        setServerError(t("login_page.invalid_response"));
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setServerError(error.response.data.error || t("login_page.login_failed"));
      } else {
        setServerError(t("login_page.unexpected_error"));
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-image">
        <img src="/media/image.png" alt="Login" />
      </div>

      <div className="auth-form">
        <div className="form-wrapper">
          <h2 className="auth-title">{t("login_page.welcome_back")}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="email"
                className={`form-control ${submitted && errors.email ? "is-invalid" : ""}`}
                placeholder={t("login_page.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {submitted && errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="form-group mb-3">
              <input
                type="password"
                className={`form-control ${submitted && errors.password ? "is-invalid" : ""}`}
                placeholder={t("login_page.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {submitted && errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  {t("login_page.remember_me")}
                </label>
              </div>
            </div>

            {serverError && <div className="alert alert-danger mb-3">{serverError}</div>}

            <button type="submit" className="btn btn-primary w-100 mb-3">
              {t("login_page.login")}
            </button>

            <p className="auth-text">
              {t("login_page.no_account")}{" "}
              <Link to="/register" className="auth-link">
                {t("login_page.register_here")}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
