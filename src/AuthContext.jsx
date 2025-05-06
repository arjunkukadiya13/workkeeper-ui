import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthContext = ({ children }) => {
  const isLogin = useSelector((state) => state.isLogin); 
  if (!isLogin) {
    return <Navigate to="/" replace />;
  }

  return children; 
};

export default AuthContext;
