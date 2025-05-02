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
import employeeService from "../../../../services/employeeService";

const EmployeeData = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const navigate = useNavigate();

  const fetchEmployeeData = async () => {
    const userData = await employeeService.getEmployee();
    setEmployees(userData);
    setFilteredEmployees(userData);
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const handleNavigateToAdd = () => {
    navigate("/hr/employee/add-employee");
  };

  const handleNavigateToEdit = (employeeId) => {
    navigate(`/hr/employee/edit-employee/${employeeId}`);
  };

  // Filter Logic
  useEffect(() => {
    let updatedEmployees = employees;

    if (searchName) {
      updatedEmployees = updatedEmployees.filter((emp) =>
        emp.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (filterDepartment) {
      updatedEmployees = updatedEmployees.filter(
        (emp) => emp.departmentName === filterDepartment
      );
    }

    if (filterStatus) {
      updatedEmployees = updatedEmployees.filter(
        (emp) => emp.status === filterStatus
      );
    }

    if (filterRole) {
      updatedEmployees = updatedEmployees.filter(
        (emp) => emp.roleName === filterRole
      );
    }

    setFilteredEmployees(updatedEmployees);
    setPage(1); // Reset to page 1 when filters change
  }, [searchName, filterDepartment, filterStatus, filterRole, employees]);

  const departments = [...new Set(employees.map((emp) => emp.departmentName))];
  const roles = [...new Set(employees.map((emp) => emp.roleName))];

  // Calculate paginated data
  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const pageCount = Math.ceil(filteredEmployees.length / rowsPerPage);

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

      {/* Filters */}
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
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
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
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Employee Table */}
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
              {paginatedEmployees.map((employee) => (
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
