import React from "react";
import "./AttendanceLogDataPage.css";

const AttendanceLogDataPage = ({ attendanceLogs, onEdit }) => {
  return (
    <div className="attendance-logs">
      <h3>Attendance Logs</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {attendanceLogs.map((log, index) => {
            const isEditable = log.source === "Web";

            return (
              <tr key={index}>
                <td>{log.date}</td>
                <td>{log.time?.substring(11, 16) || "N/A"}</td>
                <td>{log.type}</td>
                <td>
                  <button
                    onClick={() => isEditable && onEdit(log)}
                    disabled={!isEditable}
                    title={
                      isEditable
                        ? "Edit this log"
                        : "Editing not allowed for logs not added via Web"
                    }
                    className={isEditable ? "" : "disabled-button"}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceLogDataPage;
