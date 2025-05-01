import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/AuthContext"; 
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "null");
    if (user?.token) {
      navigate("/");
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format.";
    if (!phone.trim()) newErrors.phone = "Phone is required.";
    else if (!phoneRegex.test(phone)) newErrors.phone = "Phone must be exactly 10 digits.";
    if (!password.trim()) newErrors.password = "Password is required.";
    else if (!passwordRegex.test(password)) newErrors.password = "Weak password.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

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
      const res = await axios.post<{ token: string; email: string }>("http://localhost:5202/api/auth/register", {
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
      });

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
        setServerError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-image">
        <img src="/media/image.png" alt="Register" />
      </div>

      <div className="auth-form">
        <div className="form-wrapper">
          <h2 className="auth-title">Join the Adventure!</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`form-control ${submitted && errors.firstName ? "is-invalid" : ""}`}
                  />
                  {submitted && errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`form-control ${submitted && errors.lastName ? "is-invalid" : ""}`}
                  />
                  {submitted && errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>
              </div>
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-control ${submitted && errors.email ? "is-invalid" : ""}`}
              />
              {submitted && errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="form-group">
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`form-control ${submitted && errors.phone ? "is-invalid" : ""}`}
              />
              {submitted && errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-control ${submitted && errors.password ? "is-invalid" : ""}`}
              />
              {submitted && errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`form-control ${submitted && errors.confirmPassword ? "is-invalid" : ""}`}
              />
              {submitted && errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>

            {serverError && <div className="alert alert-danger">{serverError}</div>}

            <button type="submit" className="btn btn-primary w-100 mb-3">Register</button>

            <p className="auth-text">
              Already have an account? <Link to="/login" className="auth-link">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
