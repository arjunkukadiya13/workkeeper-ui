import { useEffect, useState } from "react";
import AttendanceService from "../../../../services/attendanceService";
import "./TodaysPresencePageContent.css";

const TodaysPresencePageContent = () => {
  const [employees, setEmployees] = useState([]);

  const fetchTodaysPresence = async () => {
    try {
      const data = await AttendanceService.todaysPresentEmployees("2025-05-29");
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
