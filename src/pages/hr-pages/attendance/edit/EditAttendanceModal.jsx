import React, { useState, useEffect } from "react";
import "./EditAttendanceModal.css";
import { useSelector } from "react-redux";
import AttendanceService from "../../../../services/attendanceService";

const EditAttendanceModal = ({ log, onClose }) => {
  const userData = useSelector((state) => state.userData);

  const [editedLog, setEditedLog] = useState({
    date: "",
    time: "",
    type: "",
    source: ""
  });

  const [preview12HourTime, setPreview12HourTime] = useState("");

  useEffect(() => {
    if (log) {
      const istDate = new Date(log.time);
      const hours = istDate.getHours().toString().padStart(2, "0");
      const minutes = istDate.getMinutes().toString().padStart(2, "0");

      const time24 = `${hours}:${minutes}`;
      const time12 = istDate.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata"
      });

      setEditedLog({
        date: log.date,
        time: time24,
        type: log.type,
        source: log.source
      });
      setPreview12HourTime(time12);
    }
  }, [log]);

  const handleChange = (field, value) => {
    setEditedLog((prev) => ({
      ...prev,
      [field]: value
    }));

    if (field === "time") {
      const [hour, minute] = value.split(":");
      const date = new Date();
      date.setHours(parseInt(hour));
      date.setMinutes(parseInt(minute));
      setPreview12HourTime(
        date.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata"
        })
      );
    }
  };

  const handleSave = async () => {
    if (!editedLog.date || !editedLog.time || !editedLog.type) {
      alert("Please fill all fields!");
      return;
    }

    const localDateTime = new Date(`${editedLog.date}T${editedLog.time}:00`);
    const utcDateTime = localDateTime.toISOString();

    const payload = {
      id: log.id,
      employeeId: log.employeeId,
      type: editedLog.type,
      source: editedLog.source,
      time: utcDateTime,
      date: editedLog.date,
      updatedAt: new Date().toISOString()
    };

    try {
      await AttendanceService.updateAttendance(payload.id, payload);
      onClose();
    } catch (err) {
      console.error("Failed to update attendance:", err);
    }
  };

  if (!log) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Attendance Log</h3>

        <div className="modal-field">
          <label>Date:</label>
          <input
            type="date"
            value={editedLog.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>

        <div className="modal-field">
          <label>Time:</label>
          <input
            type="time"
            value={editedLog.time}
            onChange={(e) => handleChange("time", e.target.value)}
          />
          <small>Preview: {preview12HourTime}</small>
        </div>

        <div className="modal-field">
          <label>Type:</label>
          <select
            value={editedLog.type}
            onChange={(e) => handleChange("type", e.target.value)}
          >
            <option value="In">In</option>
            <option value="Out">Out</option>
          </select>
        </div>

        <div className="modal-field">
          <label>Source:</label>
          <input type="text" value={editedLog.source} readOnly />
        </div>

        <div className="modal-actions">
          <button className="btn-primary" onClick={handleSave}>Save</button>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditAttendanceModal;
