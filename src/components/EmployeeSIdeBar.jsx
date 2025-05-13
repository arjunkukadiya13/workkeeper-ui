import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaCalendarCheck, FaCog,FaCalendarAlt,FaBell  } from "react-icons/fa";
import "./SideBar.css"

const EmployeeSideBar = () => {

  return (
    <div style={{ width: "250px", height: "100vh",color: "white", padding: "20px" }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <NavLink to="/employee/dashboard" >
      <FaTachometerAlt /> Dashboard
    </NavLink>
    <NavLink to="/employee/attendance" >
      <FaCalendarCheck /> Attendance
    </NavLink>
    <NavLink to="/employee/leaves" >
      <FaCalendarAlt  /> Leaves
    </NavLink>
    <NavLink to="/employee/notification" >
      <FaBell /> Notification
    </NavLink>
    <NavLink to="/employee/settings" >
      <FaCog /> Settings
    </NavLink>
      </nav>
    </div>
  );
};

export default EmployeeSideBar;
