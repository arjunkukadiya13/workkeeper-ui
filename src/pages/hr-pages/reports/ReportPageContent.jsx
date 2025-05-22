import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

function ReportPageContent() {
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);

  const handleGenerateReport = () => {
    // Simulated report data for demo
    let data = [];
    if (reportType === "attendance") {
      data = [
        { date: "2025-05-01", present: 45, absent: 5 },
        { date: "2025-05-02", present: 48, absent: 2 },
      ];
    } else if (reportType === "leave") {
      data = [
        { employee: "John Doe", leaveType: "Privilege", daysTaken: 5 },
        { employee: "Jane Smith", leaveType: "Maternity", daysTaken: 120 },
      ];
    } else if (reportType === "workhours") {
      data = [
        { employee: "John Doe", totalHours: 160, overtimeHours: 10 },
        { employee: "Jane Smith", totalHours: 150, overtimeHours: 5 },
      ];
    } else if (reportType === "overtime") {
      data = [
        { employee: "John Doe", overtimeHours: 10, dates: "May 1-7" },
        { employee: "Jane Smith", overtimeHours: 5, dates: "May 1-7" },
      ];
    }
    setReportData(data);
  };

  const handleExportCSV = () => {
    alert("Exporting CSV (simulated)");
  };

  const handleExportPDF = () => {
    alert("Exporting PDF (simulated)");
  };

  // Render table rows dynamically based on report type
  const renderTableHeaders = () => {
    switch (reportType) {
      case "attendance":
        return (
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Present</TableCell>
            <TableCell>Absent</TableCell>
          </TableRow>
        );
      case "leave":
        return (
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Leave Type</TableCell>
            <TableCell>Days Taken</TableCell>
          </TableRow>
        );
      case "workhours":
        return (
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Total Hours</TableCell>
            <TableCell>Overtime Hours</TableCell>
          </TableRow>
        );
      case "overtime":
        return (
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Overtime Hours</TableCell>
            <TableCell>Dates</TableCell>
          </TableRow>
        );
      default:
        return null;
    }
  };

  const renderTableRows = () => {
    return reportData.map((row, index) => {
      switch (reportType) {
        case "attendance":
          return (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.present}</TableCell>
              <TableCell>{row.absent}</TableCell>
            </TableRow>
          );
        case "leave":
          return (
            <TableRow key={index}>
              <TableCell>{row.employee}</TableCell>
              <TableCell>{row.leaveType}</TableCell>
              <TableCell>{row.daysTaken}</TableCell>
            </TableRow>
          );
        case "workhours":
          return (
            <TableRow key={index}>
              <TableCell>{row.employee}</TableCell>
              <TableCell>{row.totalHours}</TableCell>
              <TableCell>{row.overtimeHours}</TableCell>
            </TableRow>
          );
        case "overtime":
          return (
            <TableRow key={index}>
              <TableCell>{row.employee}</TableCell>
              <TableCell>{row.overtimeHours}</TableCell>
              <TableCell>{row.dates}</TableCell>
            </TableRow>
          );
        default:
          return null;
      }
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      <FormControl sx={{ minWidth: 250, mb: 2 }}>
        <InputLabel id="report-type-label">Select Report Type</InputLabel>
        <Select
          labelId="report-type-label"
          value={reportType}
          label="Select Report Type"
          onChange={(e) => setReportType(e.target.value)}
        >
          <MenuItem value="attendance">Attendance Trends</MenuItem>
          <MenuItem value="leave">Leave Balance & Patterns</MenuItem>
          <MenuItem value="workhours">Employee Work Hours</MenuItem>
          <MenuItem value="overtime">Overtime</MenuItem>
        </Select>
      </FormControl>

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

      <Button
        variant="contained"
        onClick={handleGenerateReport}
        disabled={!reportType || !startDate || !endDate}
        sx={{ mb: 3 }}
      >
        Generate Report
      </Button>

      {reportData.length > 0 && (
        <Paper sx={{ mb: 2, p: 2 }}>
          <Table>
            <TableHead>{renderTableHeaders()}</TableHead>
            <TableBody>{renderTableRows()}</TableBody>
          </Table>
        </Paper>
      )}

      {reportData.length > 0 && (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Button variant="outlined" onClick={handleExportPDF}>
            Export PDF
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ReportPageContent;
