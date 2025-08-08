import React, { useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios"; // use your configured Axios instance
import "../styles/registration.css";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await axiosInstance.post("/user/signup", payload);
      setSuccess(res.data.message || "Account created successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-image-section">
          <img
            src="https://i.pinimg.com/736x/69/0a/52/690a52eef949a47fbabcb34b92cbafe3.jpg"
            alt="Registration Visual"
          />
        </div>

        <div className="registration-form-section">
          <h2>Create an Account</h2>
          <div className="login-link">
            Already have an account?
            <NavLink to="/login"> Login</NavLink>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="form-input"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="form-input"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="email-pass">
              <div className="form-input-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                  required
                />
              </div>
            </div>

            <div className="terms-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree with the <a href="#">Terms and Conditions</a>
              </label>
            </div>

            <button type="submit" className="create-account-btn" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <div className="divider">Or register with</div>

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
      </div>
    </div>
  );
};

export default Registration;
