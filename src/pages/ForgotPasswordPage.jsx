import React, { useState } from "react";
import "./LoginPage.css"
import AuthService from "../services/authService";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    await AuthService.forgotPasswordRequest(email);
    setMessage(`Password reset link sent to ${email}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Forgot Password</h2>
        {message && <div className="error-message" style={{ color: "green" }}>{message}</div>}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <button type="submit" className="login-button" style={{ width: "100%" }}>
            Send Reset Link
          </button>
        </form>

        <div className="login-links" style={{ marginTop: "20px" }}>
          <a href="/login" className="forgot-password">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
