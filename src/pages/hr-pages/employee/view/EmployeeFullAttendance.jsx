import React, { useState, useEffect, lazy, Suspense } from "react";
import "./EmployeeAttendanceContent.css";
import AttendanceService from "../../../../services/attendanceService";

const AttendanceLogDataPage = lazy(() => import("./view-attendance/data/AttendanceLogDataPage"));
const FilterAttendanceLogs = lazy(() => import("./view-attendance/filter/FilterAttendanceLogs"));
const EditAttendanceModal = lazy(() => import("./view-attendance/edit/EditAttendanceModal"));
const EmployeeInformationWidget = lazy(() =>
  import("../../../../components/employee-components/EmployeeInformationWidget")
);

const EmployeeAttendanceContent = () => {
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [editingLog, setEditingLog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPaginatedAttendanceLogs = async (page = 1) => {
    if (!userData?.id) return;

    try {
      const response = await AttendanceService.getUserAttendancePaginate(userData.id, page);

      const pages = Number.isInteger(response?.totalPages) ? response.totalPages : 1;

      setAttendanceLogs(response);
      setTotalPages(pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching paginated attendance logs:", error);
      setAttendanceLogs([]);
      setTotalPages(1);
      setCurrentPage(1);
    }
  };

  // Initial load and on userData.id change
  useEffect(() => {
    fetchPaginatedAttendanceLogs(1);
  }, [userData?.id]);

  return (
    <div className="attendance-container">
      <h2 className="attendance-header">Employee Attendance</h2>

      <Suspense fallback={<div>Loading Employee Info...</div>}>
        <EmployeeInformationWidget />
      </Suspense>

      <Suspense fallback={<div>Loading Filters...</div>}>
        <FilterAttendanceLogs
          userId={userData?.id}
          startDate=""
          endDate=""
          setStartDate={() => {}}
          setEndDate={() => {}}
          setAttendanceLogs={setAttendanceLogs}
        />
      </Suspense>


      <Suspense fallback={<div>Loading Attendance Logs...</div>}>
        <AttendanceLogDataPage
          attendanceLogs={attendanceLogs}
          onEdit={setEditingLog}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={fetchPaginatedAttendanceLogs}
        />
      </Suspense>

      <Suspense fallback={null}>
        {editingLog && (
          <EditAttendanceModal
            log={editingLog}
            onClose={() => setEditingLog(null)}
            refreshAttendanceLogs={() => fetchPaginatedAttendanceLogs(currentPage)}
          />
        )}
      </Suspense>
    </div>
  );
};

export default EmployeeAttendanceContent;
