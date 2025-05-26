import React, { useState, useEffect, lazy, Suspense } from "react";
import "./UserAttendance.css";
import { useSelector } from "react-redux";
import AttendanceService from "../../../services/attendanceService";

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
      <Suspense fallback={<div>Loading Employee Info...</div>}>
        <EmployeeInformationWidget userData={userData}/>
      </Suspense>

      {/* Add Attendance Form */}
      <Suspense fallback={<div>Loading Add Form...</div>}>
        <AddAttendanceForm
          attendanceLogs={attendanceLogs}
          refreshAttendanceLogs={fetchAttendanceLogs}
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
        />
      </Suspense>

      {/* Edit Modal */}
      <Suspense fallback={null}>
        {editingLog && (
          <EditAttendanceModal
            log={editingLog}
            onClose={() => setEditingLog(null)}
          />
        )}
      </Suspense>
    </div>
  );
};

export default UserAttendance;
