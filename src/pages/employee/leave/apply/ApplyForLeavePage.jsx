import React from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import "./ApplyForLeavePage.css"

const ApplyForLeavePage = ({
  leaveType,
  setLeaveType,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  note,
  setNote,
  ccTo,
  setCcTo,
  leaveTypes,
  ccOptions,
  handleApply,
}) => {
  return (
    <div>
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
    </div>
  );
};

export default ApplyForLeavePage;
