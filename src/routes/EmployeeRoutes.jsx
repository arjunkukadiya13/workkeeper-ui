import { Route } from "react-router-dom";
import { lazy } from "react";
import AuthContext from "../AuthContext";

const EmployeeDashboard = lazy(() => import("../pages/employee/EmployeeDashboard"));
const EmployeeAttendance = lazy(() => import("../pages/employee/EmployeeAttendance"));
const EmployeeTeam = lazy(() => import("../pages/employee/EmployeeTeam"));
const EmployeeLeave = lazy(() => import("../pages/employee/EmployeeLeave"));
const EmployeeNotification = lazy(() => import("../pages/employee/EmployeeNotification"));
const EmployeeSettingPage = lazy(() => import("../pages/employee/EmployeeSettingPage"));

const EmployeeRoutes = [

    <Route path="/employee/dashboard" element={<AuthContext><EmployeeDashboard /></AuthContext>} />,
    <Route path="/employee/attendance" element={<AuthContext><EmployeeAttendance /></AuthContext>} />,
    <Route path="/employee/team" element={<AuthContext><EmployeeTeam /></AuthContext>} />,
    <Route path="/employee/leaves" element={<AuthContext><EmployeeLeave /></AuthContext>} />,
    <Route path="/employee/notification" element={<AuthContext><EmployeeNotification /></AuthContext>} />,
    <Route path="/employee/settings" element={<AuthContext><EmployeeSettingPage /></AuthContext>} />
    
];

export default EmployeeRoutes;
