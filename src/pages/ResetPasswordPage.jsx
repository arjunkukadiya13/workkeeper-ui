import React, { useEffect, useState } from "react";
import "./ResetPasswordPage.css";
import "./LoginPage.css";
import { useSelector } from "react-redux";
import AuthService from "../services/authService";
import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPasswordPage = ({ isFirstLogin = false }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
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
          err.response?.data?.message ||
          "Password reset failed. Please try again."
        );
      }
    } else {
      try {
        const data = {
          email: email,
          token: token,
          newPassword: password,
        };
        console.log(data)
        const res = await AuthService.resetPassword(data);
        setSuccess(res.message || "Password reset successful!");
        setPassword("");
        setConfirmPassword("");
        navigate("/password-reset-success");
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
          "Password reset failed. Please try again."
        );
      }
    }
  };

  useEffect(() => {
    if (!isFirstLogin) {
      console.log("Token from URL:", token);
      console.log("Email from URL:", email);
    }
  }, [isFirstLogin, token, email]);

  return (
    <div className="login-container">
      <div className="login-card reset-password-card">
        <h2 className="login-title">Reset Password</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit} className="reset-password-form">
          <TextField
            type={showPassword ? "text" : "password"}
            label="New Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type={showConfirmPassword ? "text" : "password"}
            label="Confirm Password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="login-button"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
