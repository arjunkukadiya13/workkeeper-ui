import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Grid, Autocomplete, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./AddEmployeeContent.css";
import DepartmentService from "../../../../services/departmentService";
import RoleServices from "../../../../services/roleServices";
import EmployeeService from "../../../../services/employeeService";
import OfficeServices from "../../../../services/officeServices";
import TeamServices from "../../../../services/teamServices";
import ShiftService from "../../../../services/shiftService";

const AddEmployeeContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    personalEmail: "",
    organizationalEmail: "",
    personalMobile: "",
    alternateMobile: "",
    departmentId: "",
    roleId: "",
    officeId: "",
    teamId: "",
    reportingEmployeeId: "",
    lineManager: "",
    designation: "",
    yearOfExpTotal: "",
    yearOfExpOrganization: "",
    shiftId: "",
    status: "Active",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [teams, setTeams] = useState([]);
  const [offices, setOffices] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [reportingManagers, setReportingManagers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDepartments(await DepartmentService.getDepartment());
        setRoles(await RoleServices.getRoles());
        setTeams(await TeamServices.getTeams());
        setReportingManagers(await EmployeeService.getEmployee());
        setOffices(await OfficeServices.getOffices());
        const shiftData = await ShiftService.getShifts();
        setShifts(shiftData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      personalEmail: "",
      organizationalEmail: "",
      personalMobile: "",
      alternateMobile: "",
      departmentId: "",
      roleId: "",
      officeId: "",
      teamId: "",
      reportingEmployeeId: "",
      lineManager: "",
      designation: "",
      yearOfExpTotal: "",
      yearOfExpOrganization: "",
      shiftId: "",
      status: "Active",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      name: formData.name?.trim() || "",
      personalMobile: formData.personalMobile,
      alternateMobile: formData.alternateMobile,
      personalEmail: formData.personalEmail,
      organizationEmail: formData.organizationalEmail,
      departmentId: formData.departmentId,
      officeId: formData.officeId,
      designation: formData.designation,
      yearOfExpTotal: parseInt(formData.yearOfExpTotal, 10),
      yearOfExpOrganization: parseInt(formData.yearOfExpOrganization, 10),
      reportingEmployeeId: formData.reportingEmployeeId,
      lineManagerId: 1,
      status: formData.status,
      roleId: formData.roleId,
      shiftId: formData.shiftId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await EmployeeService.addEmployee(formattedData);
      
      setSuccessMessage("Employee added successfully!");
      resetForm();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <>
      <Button variant="outlined" color="secondary" sx={{ mb: 2 }} onClick={() => navigate(-1)}>
        Back
      </Button>

      <div className="add-employee-container">
        <h2>Add Employee</h2>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="employee-form">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Employee Name" name="name" value={formData.name} fullWidth required onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <TextField label="Personal Email" name="personalEmail" type="email" value={formData.personalEmail} fullWidth required onChange={handleChange} />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Organizational Email" name="organizationalEmail" type="email" value={formData.organizationalEmail} fullWidth required onChange={handleChange} />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Personal Mobile" name="personalMobile" type="tel" value={formData.personalMobile} fullWidth required onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <TextField label="Alternate Mobile" name="alternateMobile" type="tel" value={formData.alternateMobile} fullWidth onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                options={departments}
                getOptionLabel={(option) => option.departmentName}
                onChange={(e, newValue) => setFormData({ ...formData, departmentId: newValue?.id || "" })}
                value={departments.find((d) => d.id === formData.departmentId) || null}
                renderInput={(params) => <TextField {...params} label="Department" fullWidth required />}
              />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                options={roles}
                getOptionLabel={(option) => option.roleName}
                onChange={(e, newValue) => setFormData({ ...formData, roleId: newValue?.id || "" })}
                value={roles.find((r) => r.id === formData.roleId) || null}
                renderInput={(params) => <TextField {...params} label="Role" fullWidth required />}
              />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                options={offices}
                getOptionLabel={(option) => option?.location || "No Location"}
                onChange={(e, newValue) => setFormData({ ...formData, officeId: newValue?.id || "" })}
                value={offices.find((o) => o.id === formData.officeId) || null}
                renderInput={(params) => <TextField {...params} label="Office" fullWidth required />}
              />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                options={teams}
                getOptionLabel={(option) => option.teamName}
                onChange={(e, newValue) => setFormData({ ...formData, teamId: newValue?.id || "" })}
                value={teams.find((t) => t.id === formData.teamId) || null}
                renderInput={(params) => <TextField {...params} label="Team" fullWidth required />}
              />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                options={reportingManagers}
                getOptionLabel={(option) => option.name}
                onChange={(e, newValue) => setFormData({ ...formData, reportingEmployeeId: newValue?.id || "" })}
                value={reportingManagers.find((e) => e.id === formData.reportingEmployeeId) || null}
                renderInput={(params) => <TextField {...params} label="Reporting Manager" fullWidth required />}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField label="Line Manager" name="lineManager" value={formData.lineManager} fullWidth required onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <TextField label="Designation" name="designation" value={formData.designation} fullWidth required onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <TextField label="Experience (Years)" name="yearOfExpTotal" type="number" value={formData.yearOfExpTotal} fullWidth required onChange={handleChange} />
            </Grid>

            {/* Final Row with 3 Fields */}
            <Grid item xs={4}>
              <TextField
                label="Experience with Organization"
                name="yearOfExpOrganization"
                type="number"
                value={formData.yearOfExpOrganization}
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={formData.status} onChange={handleChange}>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                options={shifts}
                getOptionLabel={(option) => option.shiftName}
                onChange={(e, newValue) => setFormData({ ...formData, shiftId: newValue?.id || "" })}
                value={shifts.find((s) => s.id === formData.shiftId) || null}
                renderInput={(params) => <TextField {...params} label="Shift" fullWidth required />}
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Add Employee
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddEmployeeContent;
