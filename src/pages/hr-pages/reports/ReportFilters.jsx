import React from "react";
import { Box, TextField } from "@mui/material";

const ReportFilters = ({ startDate, setStartDate, endDate, setEndDate }) => (
  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
    <TextField
      label="Start Date"
      type="date"
      InputLabelProps={{ shrink: true }}
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />
    <TextField
      label="End Date"
      type="date"
      InputLabelProps={{ shrink: true }}
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
    />
  </Box>
);

export default ReportFilters;
