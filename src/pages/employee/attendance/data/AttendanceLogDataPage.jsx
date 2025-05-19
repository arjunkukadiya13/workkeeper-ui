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
            <th>Action</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {attendanceLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.date}</td>
              <td>{log.time?.substring(11, 16) || "N/A"}</td>
              <td>{log.type}</td>
              <td>
                {/* Only allow editing for manually entered records */}
                {log.source === "Web" && (
                  <button onClick={() => onEdit(log)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default AttendanceLogDataPage;
