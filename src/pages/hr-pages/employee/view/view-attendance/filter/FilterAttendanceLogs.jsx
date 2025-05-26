import React from "react";
import AttendanceService from "../../../../../../services/attendanceService";
// import ".././EmployeeAttendanceContent.css"; 

const FilterAttendanceLogs = ({
  userId,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setAttendanceLogs,
}) => {
  const fetchFilteredLogs = async (start, end) => {
    try {
      const logs = await AttendanceService.getLogsBetweenDates(userId, start, end);
      logs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setAttendanceLogs(logs);
    } catch (error) {
      console.error("Error fetching attendance logs:", error);
    }
  };

  const handleDateFilter = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Please select both start and end dates!");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after end date.");
      return;
    }

    await fetchFilteredLogs(startDate, endDate);
  };

  return (
    <div className="date-range-filter">
      <h3>Filter Attendance by Date</h3>
      <form onSubmit={handleDateFilter}>
        <div className="date-picker-group">
          <div className="date-picker">
            <label>From Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="date-picker">
            <label>To Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Filter Logs</button>
      </form>
    </div>
  );
};

export default FilterAttendanceLogs;
