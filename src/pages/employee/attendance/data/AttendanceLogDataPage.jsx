import React from "react";
import "./AttendanceLogDataPage.css";

const AttendanceLogDataPage = ({ attendanceLogs }) => {
  return (
    <div className="attendance-logs">
      <h3>Attendance Logs</h3>
      <table>
        <thead>
          <tr>
            <th>Datea</th>
            <th>Time</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {attendanceLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.date}</td>
              <td>{log.time?.substring(11, 16) || "N/A"}</td>
              <td>{log.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceLogDataPage;
