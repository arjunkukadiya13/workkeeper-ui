import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ReportSelector from "./ReportSelector";
import ReportFilters from "./ReportFilters";
import ReportTable from "./ReportTable";
import ReportService from "../../../services/reportService";

function ReportPageContent() {
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const functionMap = {
    teamPresence: "dailyTeamPresence",
    attendance: "attendanceTrends",
  };
  const handleGenerateReport = async () => {
    const functionName = functionMap[reportType];
    if (!functionName || typeof ReportService[functionName] !== "function") {
      console.error("Invalid or undefined report function");
      return;
    }

    try {
      const data = await ReportService[functionName]("2025-06-06", "2025-06-10");
      setReportData(data);
    } catch (err) {
      console.error("Failed to fetch report:", err);
    }
  };
  const handleExport = (type) => {
    alert(`Exporting ${type.toUpperCase()} (simulated)`);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      <ReportSelector reportType={reportType} setReportType={setReportType} />
      <ReportFilters
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <Button
        variant="contained"
        onClick={handleGenerateReport}
        disabled={!reportType || !startDate || !endDate}
        sx={{ mb: 3 }}
      >
        Generate Report
      </Button>

      <ReportTable reportType={reportType} reportData={reportData} />

      {reportData.length > 0 && (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" onClick={() => handleExport("csv")}>
            Export CSV
          </Button>
          <Button variant="outlined" onClick={() => handleExport("pdf")}>
            Export PDF
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ReportPageContent;
