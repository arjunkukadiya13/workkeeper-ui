import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { reportTypes } from "./reportTypes";

const TableSelector = ({ reportType, setReportType }) => (
  <FormControl fullWidth sx={{ mb: 2 }}>
    <InputLabel>Select Report Type</InputLabel>
    <Select
      value={reportType}
      label="Select Report Type"
      onChange={(e) => setReportType(e.target.value)}
    >
      {Object.entries(reportTypes).map(([key, value]) => (
        <MenuItem key={key} value={key}>
          {value.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default TableSelector;
