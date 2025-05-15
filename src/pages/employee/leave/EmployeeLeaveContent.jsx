import React, { useEffect, useState } from "react";
import "./EmployeeLeaveContent.css";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import LeaveService from "../../../services/leaveService";

const EmployeeLeaveContent = () => {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [note, setNote] = useState("");
  const [ccTo, setCcTo] = useState("");

  const [leaveTypes, setLeaveTypes] = useState([]);

  const [leaveBalance, setLeaveBalance] = useState({
    "Privilege Leave": 10,
    "Optional Leave": 1,
    "Paternity Leave": 3,
    "Maternity Leave": 180,
    "Bereavement Leave": 3,
    "Compensation Leave": 2,
    "Loss of Pay": 0,
  });

  const [leaveHistory, setLeaveHistory] = useState([
    {
      id: 1,
      leaveType: "Privilege Leave",
      fromDate: "2025-05-01",
      toDate: "2025-05-03",
      status: "Approved",
      note: "Personal work",
    },
    {
      id: 2,
      leaveType: "Optional Leave",
      fromDate: "2025-04-14",
      toDate: "2025-04-14",
      status: "Pending",
      note: "Festival",
    },
    {
      id: 3,
      leaveType: "Compensation Leave",
      fromDate: "2025-03-25",
      toDate: "2025-03-25",
      status: "Rejected",
      note: "Comp for weekend work",
    },
  ]);

  const handleApply = () => {
    const newLeave = {
      id: leaveHistory.length + 1,
      leaveType,
      fromDate,
      toDate,
      status: "Pending",
      note,
    };

    setLeaveHistory([newLeave, ...leaveHistory]);
    alert("Leave applied successfully (static mode)");

    setLeaveType("");
    setFromDate("");
    setToDate("");
    setNote("");
    setCcTo("");
  };

  const handleWithdraw = (id) => {
    const updated = leaveHistory.filter((leave) => leave.id !== id);
    setLeaveHistory(updated);
    alert("Leave withdrawn (static mode)");
  };

  const fetchLeaveTypes = async () => {

      setLeaveTypes(await LeaveService.getLeaveTypes());
   
  };

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  return (
    <div className="employee-leave-container">
      <Typography variant="h5" gutterBottom>Apply for Leave</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Leave Type</InputLabel>
        <Select
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          label="Leave Type"
        >
          {leaveTypes.map((type) => (
            <MenuItem key={type.id} value={type.leaveName}>
              {type.leaveName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        type="date"
        label="From Date"
        InputLabelProps={{ shrink: true }}
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        type="date"
        label="To Date"
        InputLabelProps={{ shrink: true }}
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Note (Optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="CC To (Email)"
        value={ccTo}
        onChange={(e) => setCcTo(e.target.value)}
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleApply}>
        Apply Leave
      </Button>

      <Typography variant="h6" sx={{ marginTop: 4 }}>Leave Balance</Typography>
      <ul>
        {Object.entries(leaveBalance).map(([type, days]) => (
          <li key={type}>{type}: {days} days</li>
        ))}
      </ul>

      <Typography variant="h6" sx={{ marginTop: 4 }}>Leave History</Typography>
      <table className="leave-history-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Note</th>
            <th>Action</th>
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
              <td>
                {leave.status === "Pending" && (
                  <Button color="error" onClick={() => handleWithdraw(leave.id)}>Withdraw</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeLeaveContent;
