import React, { useState, useEffect } from "react";
import "./EditAttendanceModal.css";

const EditAttendanceModal = ({ log, onClose }) => {
  const [editedLog, setEditedLog] = useState({
    date: "",
    time: "",
    type: "",
    source: ""
  });

  useEffect(() => {
    if (log) {
      setEditedLog({
        date: log.date,
        time: log.time?.substring(11, 16) || "",
        type: log.type,
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

  const handleSave = () => {
    console.log("Edited Log to be saved via API:", editedLog);
    onClose(); 
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
          <button className="btn-primary" onClick={handleSave}>Save</button>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditAttendanceModal;
