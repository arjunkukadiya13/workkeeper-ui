import React, { useState, useEffect } from "react";
import "./EmployeeAttendanceContent.css";
import { useSelector } from "react-redux";
import AttendanceService from "../../../services/attendanceService";

const formatDate = (date) => date.toISOString().split("T")[0];
const formatTime = (date) => date.toTimeString().slice(0, 5);

const EmployeeAttendanceContent = () => {
  const userData = useSelector((state) => state.userData);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  const fetchAttendanceLogs = async () => {
    try {
      const logs = await AttendanceService.getUserAttendance(userData.id);
      logs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setAttendanceLogs(logs);

      
      if (logs.length > 0) {
        const nextType = logs[0].type === "In" ? "Out" : "In";
        setFormData((prev) => ({ ...prev, type: nextType }));
      }
    } catch (error) {
      console.error("Error fetching attendance logs:", error);
    }
  };

  const fetchFilteredLogs = async (startDate,endDate) => {
    try {
      const logs = await AttendanceService.getLogsBetweenDates(userData.id,startDate,endDate);
      logs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setAttendanceLogs(logs);

      
      if (logs.length > 0) {
        const nextType = logs[0].type === "In" ? "Out" : "In";
        setFormData((prev) => ({ ...prev, type: nextType }));
      }
    } catch (error) {
      console.error("Error fetching attendance logs:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceLogs();
  }, []);

  const handleDateFilter = async (e) => {
  e.preventDefault();

  if (!startDate || !endDate) {
    alert("Please select both start and end dates!");
    return;
  }

  if (new Date(startDate) > new Date(endDate)) {
    alert("Start date cannot be after end date.");
    return;
  }

  await fetchFilteredLogs(startDate, endDate);
};

  const handleAddAttendance = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.time || !formData.type) {
      alert("Please fill all fields!");
      return;
    }

    if (
      attendanceLogs.length > 0 &&
      attendanceLogs[0].type === formData.type
    ) {
      alert(`Cannot add two "${formData.type}" logs consecutively!`);
      return;
    }

    const now = new Date();
    const isoDateTime = now.toISOString();

    const payload = {
      employeeId: userData.id,
      type: formData.type,
      source: "Web",
      time: `${formData.date}T${formData.time}:00`,
      date: formData.date,
      updatedAt: isoDateTime,
    };

    try {
      await AttendanceService.addUserAttendance(payload);
      await fetchAttendanceLogs(); 
    } catch (error) {
      console.error("Error adding attendance:", error);
    }
  };

  return (
    <div className="attendance-container">
      <h2 className="attendance-header">Employee Attendance</h2>

      {/* Employee Details */}
     <div className="attendance-details">
  <div className="attendance-row">
    <div className="attendance-detail">
      <label>Employee Name: </label>
      <span>{userData.name}</span>
    </div>
    <div className="attendance-detail">
      <label>Department: </label>
      <span>{userData.departmentName}</span>
    </div>
  </div>

  <div className="attendance-row">
    <div className="attendance-detail">
      <label>Office: </label>
      <span>{userData.officeName}</span>
    </div>
    <div className="attendance-detail">
      <label>Designation: </label>
      <span>{userData.designation}</span>
    </div>
  </div>
</div>



      {/* Add Attendance Form */}
      <div className="add-attendance-form">
        <h3>Add Attendance</h3>
        <form onSubmit={handleAddAttendance}>
          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
          />
          <input
            type="time"
            value={formData.time}
            onChange={(e) =>
              setFormData({ ...formData, time: e.target.value })
            }
          />
          <p className="next-type">
            Next Entry Type: <strong>{formData.type}</strong>
          </p>
          <button type="submit">Add Attendance</button>
        </form>
      </div>

      <div className="date-range-filter">
  <h3>Filter Attendance by Date</h3>
  <form onSubmit={handleDateFilter}>
    <div className="date-picker-group">
      <div className="date-picker">
        <label>From Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="date-picker">
        <label>To Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </div>
    <button type="submit">Filter Logs</button>
  </form>
</div>


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
                <td>{log.time?.substring(11, 16) || "N/A"}</td>
                <td>{log.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeAttendanceContent;
