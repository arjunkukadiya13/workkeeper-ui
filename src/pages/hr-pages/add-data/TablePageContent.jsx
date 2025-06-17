import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import TableSelector from "./TableSelector";
import TableData from "./TableData";
import { dataTables } from "./dataTables";

function TablePageContent() {
  const [selectedTable, setSelectedTable] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (selectedTable) {
      const mockData = {
        departments: [
          { departmentName: "HR", departmentDescription: "Human Resources" },
        ],
        leaveType: [
          { leaveName: "Sick Leave", noOfDays: 12, description: "Medical leave" },
        ],
        office: [
          { officeName: "Main HQ", location: "Mumbai" },
        ],
        shift: [
          { shiftName: "Morning", startTime: "09:00", breakDuration: "01:00", endTime: "17:00" },
        ],
      };

      setTableData(mockData[selectedTable] || []);
    }
  }, [selectedTable]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Master Data Management
      </Typography>

      <TableSelector reportType={selectedTable} setReportType={setSelectedTable} />

      <TableData reportType={selectedTable} reportData={tableData} />
    </Box>
  );
}

export default TablePageContent;
