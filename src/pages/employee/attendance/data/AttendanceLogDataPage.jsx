import React from "react";
import "./AttendanceLogDataPage.css";

const AttendanceLogDataPage = ({ attendanceLogs, onEdit, page, totalPages, onPageChange }) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDate = (d1, d2) => d1.toDateString() === d2.toDateString();

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
            const isEditableSource = log.source === "Web";
            const logDate = new Date(log.date);
            const editableDate =
              isSameDate(logDate, today) || isSameDate(logDate, yesterday);

            const canEdit = isEditableSource && editableDate;

            const formattedDate = logDate.toLocaleDateString("en-IN", {
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

            let tooltipMessage = "";
            if (!isEditableSource) {
              tooltipMessage = "Editing not allowed for logs not added via Web";
            } else if (!editableDate) {
              tooltipMessage = "You can only edit logs from today or yesterday";
            }

            return (
              <tr key={index}>
                <td>{formattedDate}</td>
                <td>{formattedTime}</td>
                <td>{log.type}</td>
                <td>
                  <button
                    onClick={() => canEdit && onEdit(log)}
                    disabled={!canEdit}
                    title={tooltipMessage}
                    className={canEdit ? "" : "disabled-button"}
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
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AttendanceLogDataPage;
