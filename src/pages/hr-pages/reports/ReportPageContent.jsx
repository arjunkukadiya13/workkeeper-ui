import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ReportSelector from "./ReportSelector";
import ReportFilters from "./ReportFilters";
import ReportTable from "./ReportTable";
import ReportService from "../../../services/reportService";
import { exportToCSV, exportToPDF } from "../../../data/reportExports";
import { reportTypes } from "./reportTypes";

function ReportPageContent() {
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const functionMap = {
    teamPresence: "dailyTeamPresence",
    attendance: "attendanceTrends",
    earlyLeavers: "getEarlyLeavers",
  };

  const handleGenerateReport = async () => {
    const functionName = functionMap[reportType];
    if (!functionName || typeof ReportService[functionName] !== "function") {
      console.error("Invalid or undefined report function");
      return;
    }

    try {
      const data = await ReportService[functionName]("2025-06-06", "2025-06-11");
      setReportData(data);
    } catch (err) {
      console.error("Failed to fetch report:", err);
    }
  };
  const handleExport = (type) => {
    const config = reportTypes[reportType];
    if (!config || !config.keys) {
      alert("Invalid report configuration");
      return;
    }

    const fileName = `${reportType}_report_${startDate}_to_${endDate}`;

    if (type === "csv") {
      exportToCSV(reportData, config.keys, fileName);
    } else if (type === "pdf") {
      exportToPDF(reportData, config.keys, fileName);
    } else {
      alert("Unsupported export type");
    }
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
