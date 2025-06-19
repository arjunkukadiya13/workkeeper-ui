import React from "react";
import "./AttendanceLogDataPage.css"; 

const AttendanceDataPage = ({ attendanceData, page, totalPages, onPageChange }) => {
  return (
    <div className="attendance-logs">
      <h3>Daily Attendance Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Shift</th>
            <th>Source</th>
            <th>Working Hours</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry, index) => {
            const workingHours = (entry.workMinutes / 60).toFixed(2); 

            return (
              <tr key={index}>
                <td>{entry.shiftId}</td> 
                <td>{entry.source}</td>
                <td>{workingHours}</td>
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

export default AttendanceDataPage;
