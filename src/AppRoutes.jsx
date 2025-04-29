import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/hr-pages/HRDashboard"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AttendancePage = lazy(() => import("./pages/hr-pages/AttendancePage"));
const Employee = lazy(() => import("./pages/hr-pages/Employee"));
const AddEmployee = lazy(() => import("../src/pages/hr-pages/employee/AddEmployee"));
const EditEmployee = lazy(() => import("../src/pages/hr-pages/employee/EditEmployee"));
const EmployeeDashboard = lazy(() => import("../src/pages/employee/EmployeeDashboard"));
const EmployeeAttendance = lazy(() => import("../src/pages/employee/EmployeeAttendance"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const Loader = () => <div className="spinner">🔄 Loading...</div>;

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* HR routes */}
        <Route path="/hr/dashboard" element={<Dashboard />} />
        <Route path="/hr/attendance" element={<AttendancePage />} />
        <Route path="/hr/employee" element={<Employee />} />
        <Route path="/hr/employee/add-employee" element={<AddEmployee />} />
        <Route path="/hr/employee/edit-employee/:id" element={<EditEmployee />} />

        {/* employee routes */}
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/attendance" element={<EmployeeAttendance />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
