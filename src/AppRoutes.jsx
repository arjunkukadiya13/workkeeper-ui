import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import HRRoutes from "./routes/HRRoutes";
import EmployeeRoutes from "./routes/EmployeeRoutes";
import { lazy } from "react";

const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const Loader = () => <div className="spinner">🔄 Loading...</div>;

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {PublicRoutes}
        {HRRoutes}
        {EmployeeRoutes}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
