import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { dataTables } from "./dataTables";

const TableSelector = ({ reportType, setReportType }) => (
  <FormControl fullWidth sx={{ mb: 2 }}>
    <InputLabel>Select Table</InputLabel>
    <Select
      value={reportType}
      label="Select Table"
      onChange={(e) => setReportType(e.target.value)}
    >
      {Object.entries(dataTables).map(([key, value]) => (
        <MenuItem key={key} value={key}>
          {value.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default TableSelector;
