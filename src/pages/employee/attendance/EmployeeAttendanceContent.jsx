import React, { useState, useEffect, lazy } from "react";
import "./EmployeeAttendanceContent.css";
import { useSelector } from "react-redux";
import AttendanceService from "../../../services/attendanceService";
import AddAttendanceForm from "./add/AddAttendanceForm";
import AttendanceLogDataPage from "./data/AttendanceLogDataPage";
import FilterAttendanceLogs from "./filter/FilterAttendanceLogs";

const EmployeeInformationWidget = lazy(() =>
  import("../../../components/employee-components/EmployeeInformationWidget")
);

const EmployeeAttendanceContent = () => {
  const userData = useSelector((state) => state.userData);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editingLog, setEditingLog] = useState(null);


  const fetchAttendanceLogs = async () => {
    try {
      const logs = await AttendanceService.getUserAttendance(userData.id);
      logs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setAttendanceLogs(logs);
    } catch (error) {
      console.error("Error fetching attendance logs:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceLogs();
  }, []);

  return (
    <div className="attendance-container">
      <h2 className="attendance-header">Employee Attendance</h2>

      {/* Employee Details */}
      <EmployeeInformationWidget />

      {/* Add Attendance Form */}
      <AddAttendanceForm
        attendanceLogs={attendanceLogs}
        refreshAttendanceLogs={fetchAttendanceLogs}
      />

      {/* Filter Logs by Date */}
      <FilterAttendanceLogs
        userId={userData.id}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setAttendanceLogs={setAttendanceLogs}
      />

      {/* Attendance Logs Table */}
      <AttendanceLogDataPage
        attendanceLogs={attendanceLogs}
        onEdit={setEditingLog}
      />
    </div>
  );
};

export default EmployeeAttendanceContent;
