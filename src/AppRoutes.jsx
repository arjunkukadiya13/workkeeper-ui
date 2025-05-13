import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/hr-pages/HRDashboard"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AttendancePage = lazy(() => import("./pages/hr-pages/AttendancePage"));
const Employee = lazy(() => import("./pages/hr-pages/Employee"));
const AddEmployee = lazy(() => import("./pages/hr-pages/employee/AddEmployee"));
const EditEmployee = lazy(() => import("./pages/hr-pages/employee/EditEmployee"));
const ViewEmployee = lazy(() => import("./pages/hr-pages/employee/ViewEmployee"));
const SettingPage = lazy(() => import("./pages/hr-pages/SettingPage"));
const EmployeeDashboard = lazy(() => import("./pages/employee/EmployeeDashboard"));
const EmployeeAttendance = lazy(() => import("./pages/employee/EmployeeAttendance"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AuthContext = lazy(() => import("./AuthContext"));

const Loader = () => <div className="spinner">🔄 Loading...</div>;

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />

        {/* HR routes (protected) */}
        <Route path="/hr/dashboard" element={<AuthContext><Dashboard /></AuthContext>} />
        <Route path="/hr/attendance" element={<AuthContext><AttendancePage /></AuthContext>} />
        <Route path="/hr/employee" element={<AuthContext><Employee /></AuthContext>} />
        <Route path="/hr/settings" element={<AuthContext><SettingPage /></AuthContext>} />
        <Route path="/hr/employee/add-employee" element={<AuthContext><AddEmployee /></AuthContext>} />
        <Route path="/hr/employee/edit-employee/:id" element={<AuthContext><EditEmployee /></AuthContext>} />
        <Route path="/hr/employee/view-employee/:employeeId" element={<AuthContext><ViewEmployee /></AuthContext>} />

        {/* Employee routes (protected) */}
        <Route path="/employee/dashboard" element={<AuthContext><EmployeeDashboard /></AuthContext>} />
        <Route path="/employee/attendance" element={<AuthContext><EmployeeAttendance /></AuthContext>} />

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
