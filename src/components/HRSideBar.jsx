import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaCalendarCheck, FaUsers, FaChartBar, FaCog,FaCalendarAlt } from "react-icons/fa";
import "./SideBar.css"

const HRSideBar = () => {

  return (
    <div style={{ width: "250px", height: "100vh",color: "white", padding: "20px" }}>
      {/* <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px", color:"black"}}>Employee name</h2> */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <NavLink to="/hr/dashboard" >
      <FaTachometerAlt /> Dashboard
    </NavLink>
    <NavLink to="/hr/attendance" >
      <FaCalendarCheck /> Attendance
    </NavLink>
    <NavLink to="/hr/employee" >
      <FaUsers /> Employees
    </NavLink>
    <NavLink to="/hr/leave-management" >
      <FaCalendarAlt  /> Leave Management
    </NavLink>
    <NavLink to="/hr/reports" >
      <FaChartBar /> Reports
    </NavLink>
    <NavLink to="/hr/settings" >
      <FaCog /> Settings
    </NavLink>
      </nav>
    </div>
  );
};

export default HRSideBar;
