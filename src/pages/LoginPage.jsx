import React, { useState } from "react";
import { TextField, Button, Card, Typography, InputAdornment, IconButton, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import AuthService from "../services/authService";
import { useDispatch } from "react-redux";
import { userLogin } from "../data/userData/loginSlice";
import { setUserData } from "../data/userData/userSlice";
import { setAuthToken } from "../data/userData/authTokenSlice";
import { setLoginId } from "../data/userData/loginIdSlice";
import EmployeeService from "../services/employeeService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    const data = await AuthService.login(email, password);
    dispatch(userLogin());
    dispatch(setAuthToken(data.token));
    dispatch(setLoginId(data.user.id));
    if (data.user.isFirstLogin == true) {
      navigate("/create-new-password");
    } else {
      dispatch(setUserData(await EmployeeService.getEmployeeByEmail(email)))
      const roleName = data.user.roleName.toLowerCase();
      setLoading(false);
      if (roleName == "hr manager") {
        navigate("/hr/dashboard");
      } else if (roleName == "employee") {
        navigate("/employee/dashboard");

      }
    }

  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Typography variant="h5" className="login-title">WorkKeeper Login</Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {error && <Typography color="error" className="error-message">{error}</Typography>}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="login-button"
          onClick={handleLogin}
        >
          Login
        </Button>

        <div className="login-links">
          <a href="/forgot-password" className="forgot-password"
            onClick={() => { navigate("/forgot-password") }}
          >Forgot Password?</a>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
