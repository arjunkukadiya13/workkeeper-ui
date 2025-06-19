import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AttendanceService from "../../../../services/attendanceService";
import "./AddAttendanceForm.css";
import LeaveService from "../../../../services/leaveService";
import NotificationService from "../../../../services/notificationService";

const formatDate = (date) => date.toISOString().split("T")[0];
const formatTime = (date) => date.toTimeString().slice(0, 5);

const AddAttendanceForm = ({ attendanceLogs, refreshAttendanceLogs, showSuccessMessage }) => {
  const userData = useSelector((state) => state.userData);
  const now = new Date();

  const [formData, setFormData] = useState({
    date: formatDate(now),
    time: formatTime(now),
    type: "In",
  });

  const [todayHoliday, setTodayHoliday] = useState(null);
  const [lastLogType, setLastLogType] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      const todayDate = formatDate(new Date());
      const holidays = await LeaveService.getUpcomingHoliday(todayDate);
      const today = holidays.find(
        (h) => h.startDate.split("T")[0] === todayDate
      );
      if (today) setTodayHoliday(today);
    };

    const updateLastLogType = () => {
      if (attendanceLogs && attendanceLogs.length > 0) {
        const sorted = [...attendanceLogs].sort((a, b) => b.id - a.id);
        setLastLogType(sorted[0].type);
      }
    };

    fetchHolidays();
    updateLastLogType();
  }, [attendanceLogs]);

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

    // Check for duplicate log type
    if (lastLogType === formData.type) {
      alert(`You already marked "${formData.type}" as your last attendance log. Please select a different type.`);
      return;
    }

    // Confirm if today is holiday
    if (todayHoliday) {
      const confirmAdd = window.confirm(
        `Today is a holiday (${todayHoliday.name}). Do you still want to add attendance?`
      );
      if (!confirmAdd) return;
      const message = `${userData.name} marked an attendance log on a holiday (${todayHoliday.name}) dated ${formData.date} at ${formData.time} (Type: ${formData.type}).`;

      const notificationPayload = {
        employeeId: 1,
        message: message,
        messageType: "Holiday Attendance Alert",
        sentFrom: userData.id,
        isRead: false,
        readAt: null,
        sentAt: new Date().toISOString()
      };
     await NotificationService.newLeaveNotification(notificationPayload)
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
      if (showSuccessMessage) {
        showSuccessMessage("Attendance log added successfully!");
      }
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
