import React, { useState } from "react";
import { AiOutlineGoogle } from 'react-icons/ai'; // Google icon
import { FaApple } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here, you'll send the formData to your backend API
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data); // Handle the response from the server
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="registration-container">

      <div className="registration-card">
        <div className="registration-image-section">
          <img src="https://i.pinimg.com/736x/69/0a/52/690a52eef949a47fbabcb34b92cbafe3.jpg" alt="Registration Visual" />
        </div>
        <div className="registration-form-section">
          <h2>Create an Account</h2>
          <div className="login-link">
            Already have an account? 
            <NavLink to="/login">
              Login
            </NavLink>
          </div>

          <form>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="form-input"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="form-input"
              />
            </div>
            <div className="email-pass">
                <div className="form-input-wrapper">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-input"
                />
                </div>
                <div className="form-input-wrapper pass">
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="form-input"
                />
                </div>
            </div>

            <div className="terms-checkbox">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">I agree with the <a href="#">Terms and Condition</a></label>
            </div>

            <button type="submit" className="create-account-btn">
              Create Account
            </button>

            <div className="divider">Or register with</div>

            <div className="social-login">
              {/* Google Login Button */}
              <button type="button" className="social-btn">
                <AiOutlineGoogle size={20} />
                <span>Google</span>
              </button>

              {/* Apple Login Button */}
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
