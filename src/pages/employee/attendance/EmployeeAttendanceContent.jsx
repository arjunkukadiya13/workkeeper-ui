import React, { useState, useEffect, lazy, Suspense } from "react";
import "./EmployeeAttendanceContent.css";
import { useSelector } from "react-redux";
import AttendanceService from "../../../services/attendanceService";

const AddAttendanceForm = lazy(() => import("./add/AddAttendanceForm"));
const AttendanceDataPage = lazy(() => import("./data/AttendanceDataPage"));
const EditAttendanceModal = lazy(() => import("./edit/EditAttendanceModal"));
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const EmployeeInformationWidget = lazy(() =>
  import("../../../components/employee-components/EmployeeInformationWidget")
);

const EmployeeAttendanceContent = () => {
  const userData = useSelector((state) => state.userData);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [editingLog, setEditingLog] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const fetchAttendanceLogs = async (pageNumber = 1) => {
    try {
      const response = await AttendanceService.getUserAttendancePaginate(userData.id, pageNumber, 5);
      setAttendanceLogs(response.data);
      setTotalPages(response.totalPages);
      setPage(pageNumber);
    } catch (error) {
      console.error("Error fetching attendance logs:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceLogs();
  }, []);

  const onEditModelClose = () => {
    setEditingLog(null);
    fetchAttendanceLogs(page);
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="attendance-container">
      <h2 className="attendance-header">Employee Attendance</h2>

      {/* Employee Details */}
      <Suspense fallback={<div>Loading Employee Info...</div>}>
        <EmployeeInformationWidget userData={userData} />
      </Suspense>

      {/* Success Message */}
      {successMessage && (
        <div style={{ color: "green", marginBottom: "10px" }}>
          {successMessage}
        </div>
      )}

      {/* Add Attendance Form */}
      <Suspense fallback={<div>Loading Add Form...</div>}>
        <AddAttendanceForm
          attendanceLogs={attendanceLogs}
          refreshAttendanceLogs={() => fetchAttendanceLogs(page)}
          showSuccessMessage={showSuccessMessage}
        />
      </Suspense>

      {/* View Full Logs Button */}
      <div className="attendance-header-bar">
        <Button
          variant="contained"
          onClick={() => navigate("logs")}
          className="back-button"
        >
          View Full Logs
        </Button>
      </div>

      {/* Attendance Logs Table */}
      <Suspense fallback={<div>Loading Attendance Summary...</div>}>
        <AttendanceDataPage
          attendanceData={attendanceLogs}
          page={page}
          totalPages={totalPages}
          onPageChange={fetchAttendanceLogs}
        />
      </Suspense>

      {/* Edit Modal */}
      <Suspense fallback={null}>
        {editingLog && (
          <EditAttendanceModal
            log={editingLog}
            onClose={onEditModelClose}
          />
        )}
      </Suspense>
    </div>
  );
};

export default EmployeeAttendanceContent;
