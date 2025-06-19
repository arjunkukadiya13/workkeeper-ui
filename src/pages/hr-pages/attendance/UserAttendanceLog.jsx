import React, { useState, useEffect, lazy, Suspense } from "react";
import "./UserAttendance.css";
import { useSelector } from "react-redux";
import AttendanceService from "../../../services/attendanceService";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddAttendanceForm = lazy(() => import("./add/AddAttendanceForm"));
const AttendanceLogDataPage = lazy(() => import("./data/AttendanceLogDataPage"));
const FilterAttendanceLogs = lazy(() => import("./filter/FilterAttendanceLogs"));
const EditAttendanceModal = lazy(() => import("./edit/EditAttendanceModal"));
const EmployeeInformationWidget = lazy(() =>
  import("../../../components/employee-components/EmployeeInformationWidget")
);

const UserAttendance = () => {
  const userData = useSelector((state) => state.userData);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editingLog, setEditingLog] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const fetchAttendanceLogs = async (pageNumber = 1) => {
    try {
      const response = await AttendanceService.getUserAttendanceLogPaginated(userData.id, pageNumber, 5);
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
    <>
      <div className="attendance-header-bar">
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          className="back-button"
        >
          Back
        </Button>
      </div>
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

        {/* Filter Logs by Date */}
        <Suspense fallback={<div>Loading Filters...</div>}>
          <FilterAttendanceLogs
            userId={userData.id}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setAttendanceLogs={setAttendanceLogs}
          />
        </Suspense>

        {/* Attendance Logs Table */}
        <Suspense fallback={<div>Loading Attendance Logs...</div>}>
          <AttendanceLogDataPage
            attendanceLogs={attendanceLogs}
            onEdit={setEditingLog}
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
    </>
  );
};

export default UserAttendance;
