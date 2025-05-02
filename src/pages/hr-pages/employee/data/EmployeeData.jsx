import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import "./EmployeeData.css";
import EmployeeService from "../../../../services/employeeService";

const EmployeeData = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const rowsPerPage = 5;

  const [searchName, setSearchName] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRole, setFilterRole] = useState("");

  const navigate = useNavigate();

  const fetchEmployeeData = async () => {
    try {
      const data = await EmployeeService.getEmployeesPaginated(page, rowsPerPage);
      setEmployees(data.employees);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [page]);

  const handleNavigateToAdd = () => {
    navigate("/hr/employee/add-employee");
  };

  const handleNavigateToEdit = (employeeId) => {
    navigate(`/hr/employee/edit-employee/${employeeId}`);
  };

  const handleFilter = () => {
    // Add logic here to apply the filters based on the selected values
    console.log("Filters applied:", {
      searchName,
      filterDepartment,
      filterStatus,
      filterRole,
    });
    // You can call the API to fetch filtered data here if required
  };

  const pageCount = Math.ceil(totalCount / rowsPerPage);

  return (
    <div className="employee-table-container">
      <div className="header-row">
        <h2 className="employee-heading">Employee Details</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "5px 15px",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "14px",
            position: "absolute",
            right: "20px",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
          onClick={handleNavigateToAdd}
        >
          Add Employee
        </Button>
      </div>

      {/* Filters UI */}
      <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          size="small"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            label="Department"
          >
            <MenuItem value="">All</MenuItem>
            {/* Add department options here dynamically */}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            label="Role"
          >
            <MenuItem value="">All</MenuItem>
            {/* Add role options here dynamically */}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
          sx={{
            padding: "6px 16px",
            fontWeight: "bold",
            fontSize: "14px",
            height: "fit-content",
            alignSelf: "flex-end",
          }}
        >
          Apply Filters
        </Button>
      </div>

      <div className="table-wrapper">
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <TableCell>Employee ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Personal Email</TableCell>
                <TableCell>Organization Email</TableCell>
                <TableCell>Personal Mobile</TableCell>
                <TableCell>Alternate Mobile</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Office</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id} className="table-row">
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.personalEmail}</TableCell>
                  <TableCell>{employee.organizationEmail}</TableCell>
                  <TableCell>{employee.personalMobile}</TableCell>
                  <TableCell>{employee.alternateMobile}</TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>{employee.departmentName}</TableCell>
                  <TableCell>{employee.officeName}</TableCell>
                  <TableCell>{employee.status}</TableCell>
                  <TableCell>{employee.roleName}</TableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        style={{
                          backgroundColor: "#1976d2",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          padding: "4px 10px",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        View
                      </button>
                      <button
                        style={{
                          backgroundColor: "#9c27b0",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          padding: "4px 10px",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleNavigateToEdit(employee.id)}
                      >
                        Edit
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </div>
    </div>
  );
};

export default EmployeeData;
