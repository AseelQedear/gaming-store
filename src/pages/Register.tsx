import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import { useTranslation } from "react-i18next";
import "../styles/Auth.scss";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "null");
    if (user?.token) {
      navigate("/");
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

    if (!firstName.trim()) newErrors.firstName = t("register_page.first_name_required");
    if (!lastName.trim()) newErrors.lastName = t("register_page.last_name_required");
    if (!email.trim()) newErrors.email = t("register_page.email_required");
    else if (!emailRegex.test(email)) newErrors.email = t("register_page.invalid_email");
    if (!phone.trim()) newErrors.phone = t("register_page.phone_required");
    else if (!phoneRegex.test(phone)) newErrors.phone = t("register_page.invalid_phone");
    if (!password.trim()) newErrors.password = t("register_page.password_required");
    else if (!passwordRegex.test(password)) newErrors.password = t("register_page.weak_password");
    if (password !== confirmPassword)
      newErrors.confirmPassword = t("register_page.passwords_not_matching");

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

    try {
      const res = await axios.post<{ token: string; email: string }>(
        "https://gaming-store-production.up.railway.app/api/auth/register",
        {
          firstName,
          lastName,
          email,
          phone,
          password,
          confirmPassword,
        }
      );

      const { token, email: registeredEmail } = res.data;
      const userData = JSON.stringify({ token, email: registeredEmail });

      localStorage.setItem("user", userData);
      loginUser({ token, email: registeredEmail });

      navigate("/");
    } catch (error: any) {
      if (error.response?.data?.error) {
        setServerError(error.response.data.error);
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstKey = Object.keys(errors)[0];
        setServerError(errors[firstKey][0]);
      } else {
        setServerError(t("register_page.unexpected_error"));
      }
    }
  };

  return (
    <div className="auth-page" dir={isRTL ? "rtl" : "ltr"}>
      <div className="auth-image">
        <img src="/media/image.png" alt="Register" />
      </div>

      <div className="auth-form">
        <div className="form-wrapper">
          <h2 className="auth-title">{t("register_page.title")}</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder={t("register_page.first_name")}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`form-control ${submitted && errors.firstName ? "is-invalid" : ""}`}
                  />
                  {submitted && errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder={t("register_page.last_name")}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`form-control ${submitted && errors.lastName ? "is-invalid" : ""}`}
                  />
                  {submitted && errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder={t("register_page.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-control ${submitted && errors.email ? "is-invalid" : ""}`}
              />
              {submitted && errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="tel"
                placeholder={t("register_page.phone")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`form-control ${submitted && errors.phone ? "is-invalid" : ""}`}
              />
              {submitted && errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder={t("register_page.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-control ${submitted && errors.password ? "is-invalid" : ""}`}
              />
              {submitted && errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder={t("register_page.confirm_password")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`form-control ${submitted && errors.confirmPassword ? "is-invalid" : ""}`}
              />
              {submitted && errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>

            {serverError && <div className="alert alert-danger">{serverError}</div>}

            <button type="submit" className="btn btn-primary w-100 mb-3">
              {t("register_page.register")}
            </button>

            <p className="auth-text">
              {t("register_page.have_account")}{" "}
              <Link to="/login" className="auth-link">
                {t("register_page.login_here")}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
