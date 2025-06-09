import React, { useEffect, useState } from "react";
import "./ResetPasswordPage.css";
import "./LoginPage.css";
import { useSelector } from "react-redux";
import AuthService from "../services/authService";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = ({ isFirstLogin = false }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const authToken = useSelector((state) => state.authToken);
  const loginId = useSelector((state) => state.loginId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (isFirstLogin) {
      try {
        const data = {
          userId: loginId,
          newPassword: password,
        };
        const res = await AuthService.passwordUpdate(authToken, data);
        setSuccess(res.message || "Password reset successful!");
        setPassword("");
        setConfirmPassword("");
        navigate("/password-reset-success");
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || "Password reset failed. Please try again."
        );
      }
    } else {
      setSuccess("Password reset successful!");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card reset-password-card">
        <h2 className="login-title">Reset Password</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit} className="reset-password-form">
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              className="eye-button"
              size="small"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>

          <div className="input-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input-field"
            />
            <IconButton
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="eye-button"
              size="small"
            >
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>

          <button type="submit" className="login-button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
