import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import TableSelector from "./TableSelector";
import TableData from "./TableData";
import { dataTables } from "./dataTables";
import DepartmentService from "../../../services/departmentService";
import LeaveService from "../../../services/leaveService";
import OfficeServices from "../../../services/officeServices";
import ShiftService from "../../../services/shiftService";
import AddRecordModal from "./AddRecordModal";

function TablePageContent() {
  const [selectedTable, setSelectedTable] = useState("");
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchTableData = async () => {
    const todayDate = new Date().toISOString().split("T")[0];
    try {
      let data = [];
      switch (selectedTable) {
        case "departments":
          data = await DepartmentService.getDepartment();
          break;
        case "leaveType":
          data = await LeaveService.getLeaveTypes();
          break;
        case "office":
          data = await OfficeServices.getOffices();
          break;
        case "shift":
          data = await ShiftService.getShifts();
          break;
        case "holiday":
          data = await LeaveService.getUpcomingHoliday(todayDate);
          break;
        default:
          data = [];
      }
      setTableData(data);
    } catch (err) {
      console.error(`Error fetching ${selectedTable} data:`, err);
      setTableData([]);
    }
  };

  useEffect(() => {
    if (selectedTable) fetchTableData();
  }, [selectedTable]);

  const handleAddRecord = async (formData) => {
    try {
      switch (selectedTable) {
        case "departments":
          await DepartmentService.addDepartment(formData);
          break;
        case "leaveType":
          await LeaveService.addLeaveType(formData);
          break;
        case "office":
          await OfficeServices.addOffice(formData);
          break;
        case "shift":
          await ShiftService.addShift(formData);
          break;
        case "holiday":
          await LeaveService.addHoliday(formData);
          break;
      }
      setOpenModal(false);
      fetchTableData(); 
    } catch (err) {
      console.error(`Error adding new ${selectedTable}:`, err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Master Data Management
      </Typography>

      <TableSelector reportType={selectedTable} setReportType={setSelectedTable} />

      {selectedTable && (
        <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpenModal(true)}>
          Add New {dataTables[selectedTable]?.label}
        </Button>
      )}

      <TableData reportType={selectedTable} reportData={tableData} />

      <AddRecordModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddRecord}
        tableType={selectedTable}
      />
    </Box>
  );
}

export default TablePageContent;
