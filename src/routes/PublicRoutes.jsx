import { Route } from "react-router-dom";
import { lazy } from "react";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../pages/ResetPasswordPage"));
const PasswordResetSuccessPage = lazy(() => import("../pages/PasswordResetSuccessPage"));

const PublicRoutes = [
    <Route path="/" element={<LoginPage />} />,
    <Route path="/login" element={<LoginPage />} />,
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />,
    <Route path="/reset-password" element={<ResetPasswordPage />} />,
    <Route path="/create-new-password" element={<ResetPasswordPage isFirstLogin={true} />} />,
    <Route path="/password-reset-success" element={<PasswordResetSuccessPage />} />
  ];

export default PublicRoutes;
