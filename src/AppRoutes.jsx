import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/hr-pages/HRDashboard"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AttendancePage = lazy(() => import("./pages/hr-pages/AttendancePage"));
const TodaysPresence = lazy(() => import("./pages/hr-pages/attendance/TodaysPresence"));
const Employee = lazy(() => import("./pages/hr-pages/Employee"));
const LeaveManagementPage = lazy(() => import("./pages/hr-pages/LeaveManagementPage"));
const TodaysLeavesPage = lazy(() => import("./pages/hr-pages/leave-management/TodaysLeavesPage"));
const AddEmployee = lazy(() => import("./pages/hr-pages/employee/AddEmployee"));
const EditEmployee = lazy(() => import("./pages/hr-pages/employee/EditEmployee"));
const ViewEmployee = lazy(() => import("./pages/hr-pages/employee/ViewEmployee"));
const EmployeeAttendacnePage = lazy(() => import("./pages/hr-pages/employee/view/EmployeeAttendacnePage"));
const EmployeeLeavesPage = lazy(() => import("./pages/hr-pages/employee/view/EmployeeLeavesPage"));
const NotificationPage = lazy(() => import("./pages/hr-pages/NotificationPage"));
const ReportPage = lazy(() => import("./pages/hr-pages/ReportsPage"));
const SettingPage = lazy(() => import("./pages/hr-pages/SettingPage"));
const EmployeeDashboard = lazy(() => import("./pages/employee/EmployeeDashboard"));
const EmployeeAttendance = lazy(() => import("./pages/employee/EmployeeAttendance"));
const EmployeeTeam = lazy(() => import("./pages/employee/EmployeeTeam"));
const EmployeeLeave = lazy(() => import("./pages/employee/EmployeeLeave"));
const EmployeeNotification = lazy(() => import("./pages/employee/EmployeeNotification"));
const EmployeeSettingPage = lazy(() => import("./pages/employee/EmployeeSettingPage"));
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
        <Route path="/hr/attendance/today-presence" element={<AuthContext><TodaysPresence /></AuthContext>} />
        <Route path="/hr/employee" element={<AuthContext><Employee /></AuthContext>} />
        <Route path="/hr/leave-management" element={<AuthContext><LeaveManagementPage /></AuthContext>} />
        <Route path="/hr/leave-management/todays-leaves" element={<AuthContext><TodaysLeavesPage /></AuthContext>} />
        <Route path="/hr/notification" element={<AuthContext><NotificationPage /></AuthContext>} />
        <Route path="/hr/reports" element={<AuthContext><ReportPage /></AuthContext>} />
        <Route path="/hr/settings" element={<AuthContext><SettingPage /></AuthContext>} />
        <Route path="/hr/employee/add-employee" element={<AuthContext><AddEmployee /></AuthContext>} />
        <Route path="/hr/employee/edit-employee/:id" element={<AuthContext><EditEmployee /></AuthContext>} />
        <Route path="/hr/employee/view-employee/:employeeId" element={<AuthContext><ViewEmployee /></AuthContext>} />
        <Route path="/hr/employee/view-employee/attendance/:employeeId" element={<AuthContext><EmployeeAttendacnePage /></AuthContext>} />
        <Route path="/hr/employee/view-employee/leaves/:employeeId" element={<AuthContext><EmployeeLeavesPage /></AuthContext>} />

        {/* Employee routes (protected) */}
        <Route path="/employee/dashboard" element={<AuthContext><EmployeeDashboard /></AuthContext>} />
        <Route path="/employee/attendance" element={<AuthContext><EmployeeAttendance /></AuthContext>} />
        <Route path="/employee/team" element={<AuthContext><EmployeeTeam /></AuthContext>} />
        <Route path="/employee/leaves" element={<AuthContext><EmployeeLeave /></AuthContext>} />
        <Route path="/employee/notification" element={<AuthContext><EmployeeNotification /></AuthContext>} />
        <Route path="/employee/settings" element={<AuthContext><EmployeeSettingPage /></AuthContext>} />

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
