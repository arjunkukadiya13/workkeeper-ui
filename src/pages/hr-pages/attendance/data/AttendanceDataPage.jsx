import React, { useEffect } from "react";
import "./AttendanceLogDataPage.css";
import LeaveService from "../../../../services/leaveService";

const AttendanceDataPage = ({ attendanceData, page, totalPages, onPageChange }) => {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(); 
  };

  const formatWorkHours = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="attendance-logs">
      <h3>Attendance Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Work Duration</th>
            <th className="date-header">Date</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.length > 0 ? (
            attendanceData.map((log) => (
              <tr key={log.id}>
                <td>{log.source}</td>
                <td>{formatWorkHours(log.workMinutes)}</td>
                <td className="date-cell">{formatDate(log.createdAt)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No attendance data found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AttendanceDataPage;
