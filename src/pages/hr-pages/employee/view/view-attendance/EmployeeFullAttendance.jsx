import React, { useState, useEffect, lazy, Suspense } from "react";
import "./EmployeeFullAttendance.css";
import AttendanceService from "../../../../../services/attendanceService";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../../../../../services/employeeService";
import { Button } from "@mui/material";

const AttendanceLogDataPage = lazy(() => import("./data/AttendanceLogDataPage"));
const FilterAttendanceLogs = lazy(() => import("./filter/FilterAttendanceLogs"));
const EditAttendanceModal = lazy(() => import("./edit/EditAttendanceModal"));
const EmployeeInformationWidget = lazy(() =>
  import("../../../../../components/employee-components/EmployeeInformationWidget")
);

const EmployeeAttendanceContent = () => {
  const [userData,setUserData] = useState([])
  const { employeeId } = useParams();
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [editingLog, setEditingLog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const fetchPaginatedAttendanceLogs = async (page = 1) => {

    try {
      const response = await AttendanceService.getUserAttendancePaginate(10, page);
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
  
  const fetchUserData = async () =>{
    setUserData(await EmployeeService.getEmployeeById(employeeId))
  }

  useEffect(() => {
    fetchUserData();
    fetchPaginatedAttendanceLogs(1);
  }, [employeeId]);

  return (
    <>
    <Button variant="contained"
            onClick={()=>{navigate(-1)}}
          >
            Back
    </Button>
    <div className="attendance-container">
      <h2 className="attendance-header">Employee Attendance</h2>

      <Suspense fallback={<div>Loading Employee Info...</div>}>
        <EmployeeInformationWidget userData={userData}/>
      </Suspense>

      <Suspense fallback={<div>Loading Filters...</div>}>
        <FilterAttendanceLogs
          userId={employeeId}
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
    </>
  );
};

export default EmployeeAttendanceContent;
