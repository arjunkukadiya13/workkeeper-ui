import React, { useState } from "react";
import { TextField, Button, Card, Typography, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import userApi from "../services/authService";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const data = await userApi.login(email, password);
      console.log(data.user.role.roleName);
      localStorage.setItem("authToken", data.token);
      const roleName = data.user.role.roleName.toLowerCase();
      if(roleName=="hr manager"){
        navigate("/hr/dashboard");
      }else if(roleName=="employee"){
        navigate("/employee/dashboard");

      }
      
    } catch (err) {
      setError("Login failed Invalid Credentials");
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
          <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
