import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaCalendarCheck, FaUsers, FaChartBar, FaCog } from "react-icons/fa";
import "./SideBar.css"

const EmployeeSideBar = () => {

  return (
    <div style={{ width: "250px", height: "100vh",color: "white", padding: "20px" }}>
      {/* <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px", color:"black"}}>Employee name</h2> */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <NavLink to="/employee/dashboard" >
      <FaTachometerAlt /> Dashboard
    </NavLink>
    <NavLink to="/employee/attendance" >
      <FaCalendarCheck /> Attendance
    </NavLink>
    <NavLink to="/employee/settings" >
      <FaCog /> Settings
    </NavLink>
      </nav>
    </div>
  );
};

export default EmployeeSideBar;
