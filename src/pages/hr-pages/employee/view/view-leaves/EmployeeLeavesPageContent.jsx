import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import "./EmployeeLeavesPageContent.css";
import LeaveService from "../../../../../services/leaveService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeLeavesPageContent = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const fetchLeaves = async () => {
    try {
      const leavesData = await LeaveService.getEmployeeLeaveById(employeeId);
      const typesData = await LeaveService.getLeaveTypes();


      const mappedLeaves = leavesData.map((leave, index) => {
        const leaveTypeName = typesData.find((lt) => lt.id === leave.leaveTypeId)?.leaveName || "Unknown";

        return {
          id: leave.id || index + 1,
          leaveType: leaveTypeName,
          fromDate: leave.startDate?.split("T")[0],
          toDate: leave.endDate?.split("T")[0],
          status: leave.status,
          note: leave.note,
          ccTo: leave.approverName || "-",
        };
      });

      setLeaveHistory(mappedLeaves);
    } catch (error) {
      console.error("Error fetching employee leaves:", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [employeeId]);

  return (
    <div>
      <Button variant="contained"
        onClick={()=>{navigate(-1)}}
      >
        Back
      </Button>
      <Typography variant="h6" sx={{ marginTop: 4 }}>
        Leave History
      </Typography>
      <table className="leave-history-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Note</th>
            <th>Approved By</th>
          </tr>
        </thead>
        <tbody>
          {leaveHistory.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.leaveType}</td>
              <td>{leave.fromDate}</td>
              <td>{leave.toDate}</td>
              <td>{leave.status}</td>
              <td>{leave.note}</td>
              <td>{leave.ccTo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeLeavesPageContent;
