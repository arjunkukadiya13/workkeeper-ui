import React from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPasswordPage.css"; 

const PasswordResetSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-card reset-password-card">
        <h2 className="login-title">Password Updated</h2>
        <div className="success-message">
          ✅ Your password has been updated successfully!
        </div>
        <p className="info-message">
          For your security, please log in again using your new password.
        </p>
        <button
          className="login-button"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default PasswordResetSuccessPage;
