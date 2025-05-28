import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AttendanceService from "../../../../services/attendanceService";
import "./AddAttendanceForm.css"

const formatDate = (date) => date.toISOString().split("T")[0];
const formatTime = (date) => date.toTimeString().slice(0, 5);

const AddAttendanceForm = ({ attendanceLogs, refreshAttendanceLogs }) => {
  const userData = useSelector((state) => state.userData);
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
 const handleAddAttendance = async (e) => {
  e.preventDefault();

  if (!formData.date || !formData.time || !formData.type) {
    alert("Please fill all fields!");
    return;
  }

  const dateTime = new Date(`${formData.date}T${formData.time}:00`);

  const payload = {
    employeeId: userData.id,
    type: formData.type,
    source: "Web",
    time: dateTime.toISOString(), 
    date: formData.date,
    updatedAt: new Date().toISOString(),
  };

  try {
    await AttendanceService.addUserAttendance(payload);
    await refreshAttendanceLogs();
  } catch (error) {
    console.error("Error adding attendance:", error);
  }
};

  return (
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

        <div className="attendance-type-checkboxes">
          <label>
            <input
              type="checkbox"
              checked={formData.type === "In"}
              onChange={() =>
                setFormData((prev) => ({ ...prev, type: "In" }))
              }
            />
            In
          </label>
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="checkbox"
              checked={formData.type === "Out"}
              onChange={() =>
                setFormData((prev) => ({ ...prev, type: "Out" }))
              }
            />
            Out
          </label>
        </div>
        <button type="submit">Add Attendance</button>
      </form>
    </div>
  );
};

export default AddAttendanceForm;
