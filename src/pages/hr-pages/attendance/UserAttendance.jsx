import React, { useState, useEffect } from "react";
import "./UserAttendance.css";
import { useSelector } from "react-redux";

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
  const userData = useSelector((state) => state.userData); 
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
  };

  return (
    <div className="attendance-container">
      <h2 className="attendance-header">Employee Attendance</h2>

      {/* Employee Details */}
      <div className="attendance-details">
        <div className="attendance-detail">
          <label>Employee Name:</label>
          <span>{userData.name}</span>
        </div>
        <div className="attendance-detail">
          <label>Department:</label>
          <span>{userData.departmentName}</span>
        </div>
        <div className="attendance-detail">
          <label>Office:</label>
          <span>{userData.officeName}</span>
        </div>
        <div className="attendance-detail">
          <label>Designation:</label>
          <span>{userData.designation}</span>
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

          <p className="next-type">
            Next Entry Type: <strong>{formData.type}</strong>
          </p>

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
