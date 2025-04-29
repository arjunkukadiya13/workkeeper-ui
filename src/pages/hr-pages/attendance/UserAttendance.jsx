import React, { useState, useEffect } from "react";
import "./UserAttendance.css";

const initialAttendanceLogs = [
  { date: "2025-04-07", time: "09:00", type: "In" },
  { date: "2025-04-07", time: "18:00", type: "Out" },
  { date: "2025-04-06", time: "09:15", type: "In" },
];

const employeeData = {
  id: 1023,
  name: "Arjun Kukadiya",
  department: { departmentName: "Software Development" },
  office: { officeName: "Head Office" },
  designation: "Software Engineer",
};

const formatDate = (date) => date.toISOString().split("T")[0];
const formatTime = (date) => date.toTimeString().slice(0, 5);

const UserAttendance = () => {
  const [attendanceLogs, setAttendanceLogs] = useState(initialAttendanceLogs);
  const now = new Date();
  const [formData, setFormData] = useState({
    date: formatDate(now),
    time: formatTime(now),
    type: "In",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      setFormData((prev) => ({
        ...prev,
        time: formatTime(currentTime),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auto-set type based on last log
    if (attendanceLogs.length > 0) {
      const lastLog = attendanceLogs[0];
      const nextType = lastLog.type === "In" ? "Out" : "In";
      setFormData((prev) => ({
        ...prev,
        type: nextType,
      }));
    }
  }, [attendanceLogs]);

  const handleAddAttendance = (e) => {
    e.preventDefault();

    if (!formData.date || !formData.time || !formData.type) {
      alert("Please fill all fields!");
      return;
    }

    const lastLog = attendanceLogs[0];
    if (lastLog && lastLog.type === formData.type) {
      alert(`Cannot add two "${formData.type}" logs consecutively!`);
      return;
    }

    const newLog = {
      date: formData.date,
      time: formData.time,
      type: formData.type,
    };

    setAttendanceLogs((prevLogs) => [newLog, ...prevLogs]);
    // No need to reset formData because useEffect will auto-set type after adding
  };

  return (
    <div className="attendance-container">
      <h2 className="attendance-header">Employee Attendance</h2>

      {/* Employee Details */}
      <div className="attendance-details">
        <div className="attendance-detail">
          <label>Employee Name:</label>
          <span>{employeeData.name}</span>
        </div>
        <div className="attendance-detail">
          <label>Employee ID:</label>
          <span>EMP-{employeeData.id}</span>
        </div>
        <div className="attendance-detail">
          <label>Department:</label>
          <span>{employeeData.department.departmentName}</span>
        </div>
        <div className="attendance-detail">
          <label>Office:</label>
          <span>{employeeData.office.officeName}</span>
        </div>
        <div className="attendance-detail">
          <label>Designation:</label>
          <span>{employeeData.designation}</span>
        </div>
      </div>

      {/* Add Attendance Form */}
      <div className="add-attendance-form">
        <h3>Add Attendance</h3>
        <form onSubmit={handleAddAttendance}>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={formData.type === "In"}
                disabled
                readOnly
              />
              In
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.type === "Out"}
                disabled
                readOnly
              />
              Out
            </label>
          </div>

          <button type="submit">Add Attendance</button>
        </form>
      </div>

      {/* Attendance Logs */}
      <div className="attendance-logs">
        <h3>Attendance Logs</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {attendanceLogs.map((log, index) => (
              <tr key={index}>
                <td>{log.date}</td>
                <td>{log.time}</td>
                <td>{log.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAttendance;
