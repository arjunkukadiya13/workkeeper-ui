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
import EmployeeService from "../../../services/employeeService";
import { useSelector } from "react-redux";
import LeaveBalanceWidget from "./balance/LeaveBalanceWidget";

const EmployeeLeaveContent = () => {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [note, setNote] = useState("");
  const [ccTo, setCcTo] = useState("");

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [ccOptions, setCcOptions] = useState([]);
  const [leaveHistory, setLeaveHistory] = useState([]);

  const userData = useSelector((state) => state.userData);


  const handleApply = async () => {
    const selectedLeaveType = leaveTypes.find((lt) => lt.leaveName === leaveType);
    const selectedApprover = ccOptions.find((emp) => emp.organizationEmail === ccTo);

    const payload = {
      employeeId: userData.id,
      leaveTypeId: selectedLeaveType?.id || 0,
      note: note || "",
      approverId: selectedApprover?.id || 0,
      startDate: new Date(fromDate).toISOString(),
      endDate: new Date(toDate).toISOString(),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await LeaveService.addNewLeave(payload);
      alert("Leave applied successfully");

      fetchLeaves();

      setLeaveType("");
      setFromDate("");
      setToDate("");
      setNote("");
      setCcTo("");
    } catch (error) {
      console.error("Failed to apply leave:", error);
    }
  };

  const handleWithdraw = async (id) => {

    const updated = leaveHistory.filter((leave) => leave.id !== id);
    setLeaveHistory(updated);
    alert("Leave withdrawn successfully");
  };

  const fetchLeaveTypes = async () => {
    try {
      const types = await LeaveService.getLeaveTypes();
      setLeaveTypes(types);
    } catch (error) {
      console.error("Error fetching leave types:", error);
    }
  };

  const fetchHRDetails = async () => {
    try {
      const ccList = await EmployeeService.getEmployeeByRole("HR Manager");
      setCcOptions(ccList);
    } catch (error) {
      console.error("Error fetching HR managers:", error);
    }
  };

  const fetchLeaves = async () => {
    try {
      const leavesData = await LeaveService.getEmployeeLeaveById(userData.id);

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

  useEffect(() => {
    const loadData = async () => {
      await fetchLeaveTypes();
      await fetchHRDetails();
      await fetchLeaves();
    };

    loadData();
  }, []);

  return (
    <div className="employee-leave-container">
      <Typography variant="h5" gutterBottom>
        Apply for Leave
      </Typography>

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
        inputProps={{
          min: fromDate || "",
        }}
        disabled={!fromDate}
      />

      <TextField
        fullWidth
        label="Note (Optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>CC To (Email)</InputLabel>
        <Select
          value={ccTo}
          onChange={(e) => setCcTo(e.target.value)}
          label="CC To (Email)"
        >
          {ccOptions.map((emp) => (
            <MenuItem key={emp.id} value={emp.organizationEmail}>
              {emp.name} ({emp.organizationEmail})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleApply}>
        Apply Leave
      </Button>

      <LeaveBalanceWidget/>

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
              <td>{leave.ccTo || "-"}</td>
              <td>
                {leave.status === "Pending" && (
                  <Button color="error" onClick={() => handleWithdraw(leave.id)}>
                    Withdraw
                  </Button>
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
