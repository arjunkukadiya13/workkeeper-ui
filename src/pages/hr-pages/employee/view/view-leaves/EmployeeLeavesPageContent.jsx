import { Button, Typography,useState } from "@mui/material";
import "./EmployeeLeavesPageContent.css"
import LeaveService from "../../../../../services/leaveService";
import { useEffect } from "react";

const EmployeeLeavesPageContent = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const fetchLeaves = async () => {
    try {
      const leavesData = await LeaveService.getEmployeeLeaveById(id);

      const mappedLeaves = leavesData.map((leave, index) => {
        const leaveTypeName = leaveTypes.find((lt) => lt.id === leave.leaveTypeId)?.leaveName || "Unknown";
        const ccToEmail = ccOptions.find((emp) => emp.id === leave.approverId)?.organizationEmail || "";

        return {
          id: leave.id || index + 1,
          leaveType: leaveTypeName,
          fromDate: leave.startDate.split("T")[0],
          toDate: leave.endDate.split("T")[0],
          status: leave.status,
          note: leave.note,
          ccTo: ccToEmail,
        };
      });

      setLeaveHistory(mappedLeaves);
    } catch (error) {
      console.error("Error fetching employee leaves:", error);
    }
  };
  useEffect(()=>{
      fetchLeaves();
  },[])

  return (
    <div>
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
            <th>CC To</th>
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
              <td>{leave.ccTo || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default EmployeeLeavesPageContent