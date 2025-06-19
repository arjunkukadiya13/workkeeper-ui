import React, { useState, useEffect } from "react";
import "./EditAttendanceModal.css";
import { useSelector } from "react-redux";
import AttendanceService from "../../../../services/attendanceService";
import NotificationService from "../../../../services/notificationService";

const EditAttendanceModal = ({ log, onClose }) => {
  const userData = useSelector((state) => state.userData);

  const [editedLog, setEditedLog] = useState({
    id: 0,
    date: "",
    time: "",
    type: "",
    employeeId: userData.id,
    source: ""
  });

  useEffect(() => {
    if (log) {
      const utcDateTime = new Date(log.time);
      const localTimeString = utcDateTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });

      setEditedLog({
        id: log.id,
        date: log.date,
        time: localTimeString,
        type: log.type,
        employeeId: userData.id,
        source: log.source
      });
    }
  }, [log]);

  const handleChange = (field, value) => {
    setEditedLog((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {

      const localDateTime = new Date(`${editedLog.date}T${editedLog.time}`);

      const payload = {
        id: editedLog.id,
        employeeId: editedLog.employeeId,
        date: editedLog.date,
        time: localDateTime.toISOString(), // Save as UTC
        type: editedLog.type,
        source: editedLog.source,
        updatedAt: new Date().toISOString()
      };

      await AttendanceService.updateAttendance(payload.id, payload);
      const message = `${userData.name} edited their attendance log on ${editedLog.date} at ${editedLog.time} (Type: ${editedLog.type}).`;

      const notificationPayload = {
        employeeId: 1, 
        message: message,
        messageType: "Attendance Update",
        sentFrom: editedLog.employeeId,
        isRead: false,
        readAt: null,
        sentAt: new Date().toISOString()
      };
      await NotificationService.newLeaveNotification(notificationPayload)
      onClose();
    } catch (error) {
      console.error("Failed to update attendance log:", error);
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
          <button className="btn-primary" onClick={handleSave}>
            Save
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAttendanceModal;
