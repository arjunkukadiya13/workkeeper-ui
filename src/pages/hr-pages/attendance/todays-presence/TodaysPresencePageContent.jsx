import { useEffect, useState } from "react";
import AttendanceService from "../../../../services/attendanceService";
import "./TodaysPresencePageContent.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TodaysPresencePageContent = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate()
 const fetchTodaysPresence = async () => {
    try {
      const todayDate = new Date().toISOString().split("T")[0];
      const data = await AttendanceService.todaysPresentEmployees(todayDate);
      console.log(data)
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch today's presence:", error);
    }
  };

  useEffect(() => {
    fetchTodaysPresence();
  }, []);

  return (
    <div className="todays-presence-container">
      <Button
        onClick={() => { navigate(-1) }}
      >
        Back
      </Button>
      <h2>Today's Employee Presence</h2>
      <table className="presence-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp.employeeId}
              className={emp.isPresent ? "present" : "absent"}
            >
              <td>{emp.name}</td>
              <td>{emp.departmentName}</td>
              <td>{emp.designation}</td>
              <td>{emp.status}</td>
              <td>
                {emp.isPresent && emp.hasMultipleCheckIns
                  ? "Multiple check-ins"
                  : emp.isAbsent
                    ? "Absent"
                    : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodaysPresencePageContent;
