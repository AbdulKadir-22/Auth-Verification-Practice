import React, { useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        formData,
        { withCredentials: true } // 🍪 Enables cookie/token transport
      );

      const data = response.data;

      if (data.token) {
        localStorage.setItem("authToken", data.token); // Optional
      }

      navigate("/dashboard"); // 🎯 Redirect on success
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-form-section">
          <h2>Welcome Back</h2>
          <div className="login-link">
            Don’t have an account? <NavLink to="/">Register</NavLink>
          </div>

          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="email-pass">
              <div className="form-input-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-wrapper pass">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="terms-checkbox">
              <label htmlFor="terms">
                <a href="#">Forgot Password?</a>
              </label>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="divider">Or Login with</div>

            <div className="social-login">
              <button type="button" className="social-btn">
                <AiOutlineGoogle size={20} />
                <span>Google</span>
              </button>
              <button type="button" className="social-btn">
                <FaApple size={20} />
                <span>Apple</span>
              </button>
            </div>
          </form>
        </div>

        <div className="login-image-section">
          <img
            src="https://i.pinimg.com/736x/69/0a/52/690a52eef949a47fbabcb34b92cbafe3.jpg"
            alt="Login Visual"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
