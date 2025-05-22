import React from "react";
import "./AttendanceLogDataPage.css";

const AttendanceLogDataPage = ({
  attendanceLogs = [],
  onEdit,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const tableStyle = {
    border: "1px solid black",
    width: "100%",
    borderCollapse: "collapse",
  };
  const thTdStyle = {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
  };

  return (
    <div className="attendance-logs">
      <h3>Attendance Logs</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Date</th>
            <th style={thTdStyle}>Time</th>
            <th style={thTdStyle}>Type</th>
            <th style={thTdStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {attendanceLogs.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "10px" }}>
                No attendance logs found.
              </td>
            </tr>
          ) : (
            attendanceLogs.map((log, index) => {
              const isEditable = log.source === "Web";
              return (
                <tr key={log.id || index}>
                  <td style={thTdStyle}>{log.date}</td>
                  <td style={thTdStyle}>{log.time?.substring(11, 16) || "N/A"}</td>
                  <td style={thTdStyle}>{log.type}</td>
                  <td style={thTdStyle}>
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
            })
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination" style={{ marginTop: "15px" }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AttendanceLogDataPage;
