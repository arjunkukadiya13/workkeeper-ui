import React from "react";
import "./AttendanceLogDataPage.css";

const AttendanceLogDataPage = ({ attendanceLogs, onEdit, page, totalPages, onPageChange }) => {
  return (
    <div className="attendance-logs">
      <h3>Attendance Logs</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time (IST)</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {attendanceLogs.map((log, index) => {
            const isEditable = log.source === "Web";

            const formattedDate = new Date(log.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });

            const formattedTime = log.time
              ? new Date(log.time).toLocaleTimeString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "N/A";

            return (
              <tr key={index}>
                <td>{formattedDate}</td>
                <td>{formattedTime}</td>
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

      {/* Pagination */}
      <div className="pagination-controls">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AttendanceLogDataPage;
