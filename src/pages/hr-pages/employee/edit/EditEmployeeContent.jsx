import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Grid, Autocomplete, Alert } from "@mui/material";
import "./EditEmployeeContent.css";
import { useParams, useNavigate } from "react-router-dom";
// import employeeService from "../../../../services/employeeService";
// import addEmployeeService from "../../../../services/addEmployeeService"; 
import EmployeeService from "../../../../services/employeeService";
import DepartmentService from "../../../../services/departmentService";
import RoleServices from "../../../../services/roleServices";
import TeamServices from "../../../../services/teamServices";
import OfficeServices from "../../../../services/officeServices";

const EditEmployeeContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    personalEmail: "",
    organizationEmail: "",
    personalMobile: "",
    alternateMobile: "",
    departmentId: "",
    roleId: "",
    officeId: "",
    teamId: "",
    reportingEmployeeId: "",
    lineManagerId: "",
    designation: "",
    yearOfExpTotal: "",
    yearOfExpOrganization: "",
    status: "Active",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [teams, setTeams] = useState([]);
  const [offices, setOffices] = useState([]);
  const [reportingManagers, setReportingManagers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      
        
        // const departmentsData = await DepartmentService.getDepartment();
        // const rolesData = await RoleServices.getRoles();
        // const teamsData = await TeamServices.getTeams();
        // const reportingManagersData = await  EmployeeService.getEmployee();
        // const offices = await OfficeServices.getOffices();
        setDepartments(await DepartmentService.getDepartment());
        setRoles(await RoleServices.getRoles());
        setTeams(await TeamServices.getTeams());
        setReportingManagers(await  EmployeeService.getEmployee());
        setOffices(await OfficeServices.getOffices());
      
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      
        const response = await EmployeeService.getEmployeeById(id);
        setFormData({
          name: response.name || "",
          personalEmail: response.personalEmail || "",
          organizationEmail: response.organizationEmail || "",
          personalMobile: response.personalMobile || "",
          alternateMobile: response.alternateMobile || "",
          departmentId: response.departmentId || "",
          roleId: response.roleId || "",
          officeId: response.officeId || "",
          teamId: response.teamId || "",
          reportingEmployeeId: response.reportingEmployeeId || "",
          lineManagerId: response.lineManagerId || "",
          designation: response.designation || "",
          yearOfExpTotal: response.yearOfExpTotal ?? "",
          yearOfExpOrganization: response.yearOfExpOrganization ?? "",
          status: response.status || "Active",
        });
       
    };

    fetchEmployeeData();
  }, [id]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateEmployee = async (updatedEmployeeData) => {
    console.log(updatedEmployeeData)
    try {
      await EmployeeService.updateEmployee(updatedEmployeeData, id);
      setSuccessMessage("Employee updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Clear the success message after 3 seconds
      navigate(-1); // Go back to the previous page after update
    } catch (error) {
      console.error("Error updating employee:", error);
      setSuccessMessage("Failed to update employee.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    const updatedEmployeeData = {
      ...formData,
      updatedAt: new Date().toISOString(), 
    };

    updateEmployee(updatedEmployeeData); 
  };

  return (
    <>
      <Button 
        variant="outlined" 
        color="secondary" 
        sx={{ marginBottom: 2 }} 
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <div className="edit-employee-container">
        <h2>Edit Employee</h2>

        {/* Success Message */}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="employee-form">
          <Grid container spacing={2}>
            {/* Employee Name */}
            <Grid item xs={12}>
              <TextField label="Employee Name" name="name" value={formData.name} fullWidth required onChange={handleChange} />
            </Grid>

            {/* First Row */}
            <Grid item xs={4}>
              <TextField label="Personal Email" name="personalEmail" value={formData.personalEmail} type="email" fullWidth required onChange={handleChange} />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Organizational Email" name="organizationEmail" value={formData.organizationEmail} type="email" fullWidth required onChange={handleChange} />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Personal Mobile" name="personalMobile" value={formData.personalMobile} type="tel" fullWidth required onChange={handleChange} />
            </Grid>

            {/* Second Row */}
            <Grid item xs={4}>
              <TextField label="Alternate Mobile" name="alternateMobile" value={formData.alternateMobile} type="tel" fullWidth onChange={handleChange} />
            </Grid>

            {/* Department, Role, and Office Autocomplete Fields */}
            <Grid item xs={4}>
              <Autocomplete
                options={departments}
                getOptionLabel={(option) => option.departmentName}
                onChange={(event, newValue) => setFormData({ ...formData, departmentId: newValue?.id || "" })}
                value={departments.find((d) => d.id === formData.departmentId) || null}
                renderInput={(params) => <TextField {...params} label="Department" fullWidth required />}
              />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                options={roles}
                getOptionLabel={(option) => option.roleName}
                onChange={(event, newValue) => setFormData({ ...formData, roleId: newValue?.id || "" })}
                value={roles.find((r) => r.id === formData.roleId) || null}
                renderInput={(params) => <TextField {...params} label="Role" fullWidth required />}
              />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                options={offices}
                getOptionLabel={(option) => option?.location || 'No Location'}
                onChange={(event, newValue) => setFormData({ ...formData, officeId: newValue?.id || "" })}
                value={offices.find((o) => o.id === formData.officeId) || null}
                renderInput={(params) => <TextField {...params} label="Office" fullWidth required />}
              />
            </Grid>

            {/* Team and Reporting Manager Autocomplete Fields */}
            <Grid item xs={4}>
              <Autocomplete
                options={teams}
                getOptionLabel={(option) => option.teamName}
                onChange={(event, newValue) => setFormData({ ...formData, teamId: newValue?.id || "" })}
                value={teams.find((t) => t.id === formData.teamId) || null}
                renderInput={(params) => <TextField {...params} label="Team" fullWidth required />}
              />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                options={reportingManagers}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => setFormData({ ...formData, reportingEmployeeId: newValue?.id || "" })}
                value={reportingManagers.find((e) => e.id === formData.reportingEmployeeId) || null}
                renderInput={(params) => <TextField {...params} label="Reporting Manager" fullWidth required />}
              />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                options={reportingManagers}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => setFormData({ ...formData, lineManagerId: newValue?.id || "" })}
                value={reportingManagers.find((l) => l.id === formData.lineManagerId) || null}
                renderInput={(params) => <TextField {...params} label="Line Manager" fullWidth required />}
              />
            </Grid>

            {/* Other fields */}
            {/* <Grid item xs={4}>
              <TextField label="Line Manager" name="lineManager" value={formData.lineManager} fullWidth required onChange={handleChange} />
            </Grid> */}
            <Grid item xs={4}>
              <TextField label="Designation" name="designation" value={formData.designation} fullWidth required onChange={handleChange} />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Experience (Years)" name="yearOfExpTotal" value={formData.yearOfExpTotal} type="number" fullWidth required onChange={handleChange} />
            </Grid>

            {/* Fifth Row */}
            <Grid item xs={6}>
              <TextField label="Experience with Organization" name="yearOfExpOrganization" value={formData.yearOfExpOrganization} type="number" fullWidth required onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={formData.status} onChange={handleChange}>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Update Employee
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditEmployeeContent;
