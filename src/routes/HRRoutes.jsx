import { Route } from "react-router-dom";
import { lazy } from "react";
import AuthContext from "../AuthContext";

const Dashboard = lazy(() => import("../pages/hr-pages/HRDashboard"));
const AttendancePage = lazy(() => import("../pages/hr-pages/AttendancePage"));
const TodaysPresence = lazy(() => import("../pages/hr-pages/attendance/TodaysPresence"));
const Employee = lazy(() => import("../pages/hr-pages/Employee"));
const LeaveManagementPage = lazy(() => import("../pages/hr-pages/LeaveManagementPage"));
const TodaysLeavesPage = lazy(() => import("../pages/hr-pages/leave-management/TodaysLeavesPage"));
const AddEmployee = lazy(() => import("../pages/hr-pages/employee/AddEmployee"));
const EditEmployee = lazy(() => import("../pages/hr-pages/employee/EditEmployee"));
const ViewEmployee = lazy(() => import("../pages/hr-pages/employee/ViewEmployee"));
const EmployeeAttendacnePage = lazy(() => import("../pages/hr-pages/employee/view/EmployeeAttendacnePage"));
const EmployeeLeavesPage = lazy(() => import("../pages/hr-pages/employee/view/EmployeeLeavesPage"));
const NotificationPage = lazy(() => import("../pages/hr-pages/NotificationPage"));
const ReportPage = lazy(() => import("../pages/hr-pages/ReportsPage"));
const SettingPage = lazy(() => import("../pages/hr-pages/SettingPage"));

const HRRoutes = [ 
  
    <Route path="/hr/dashboard" element={<AuthContext><Dashboard /></AuthContext>} />,
    <Route path="/hr/attendance" element={<AuthContext><AttendancePage /></AuthContext>} />,
    <Route path="/hr/attendance/today-presence" element={<AuthContext><TodaysPresence /></AuthContext>} />,
    <Route path="/hr/employee" element={<AuthContext><Employee /></AuthContext>} />,
    <Route path="/hr/leave-management" element={<AuthContext><LeaveManagementPage /></AuthContext>} />,
    <Route path="/hr/leave-management/todays-leaves" element={<AuthContext><TodaysLeavesPage /></AuthContext>} />,
    <Route path="/hr/notification" element={<AuthContext><NotificationPage /></AuthContext>} />,
    <Route path="/hr/reports" element={<AuthContext><ReportPage /></AuthContext>} />,
    <Route path="/hr/settings" element={<AuthContext><SettingPage /></AuthContext>} />,
    <Route path="/hr/employee/add-employee" element={<AuthContext><AddEmployee /></AuthContext>} />,
    <Route path="/hr/employee/edit-employee/:id" element={<AuthContext><EditEmployee /></AuthContext>} />,
    <Route path="/hr/employee/view-employee/:employeeId" element={<AuthContext><ViewEmployee /></AuthContext>} />,
    <Route path="/hr/employee/view-employee/attendance/:employeeId" element={<AuthContext><EmployeeAttendacnePage /></AuthContext>} />,
    <Route path="/hr/employee/view-employee/leaves/:employeeId" element={<AuthContext><EmployeeLeavesPage /></AuthContext>} />
];

export default HRRoutes;
