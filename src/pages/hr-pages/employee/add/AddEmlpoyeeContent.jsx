import React, { useEffect, useState } from "react";
import { Button, Alert, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./AddEmployeeContent.css";

import DepartmentService from "../../../../services/departmentService";
import RoleServices from "../../../../services/roleServices";
import EmployeeService from "../../../../services/employeeService";
import OfficeServices from "../../../../services/officeServices";
import TeamServices from "../../../../services/teamServices";
import ShiftService from "../../../../services/shiftService";

import EmployeeFormField from "../components/EmployeeFormField";
import EmployeeSelectField from "../components/EmployeeSelectField";
import EmployeeDropdownField from "../components/EmployeeDropdownField";

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
        setOffices(await OfficeServices.getOffices());
        setReportingManagers(await EmployeeService.getEmployee());
        setShifts(await ShiftService.getShifts());
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
      console.error("Error adding employee:");
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
            <EmployeeFormField label="Employee Name" name="name" value={formData.name} onChange={handleChange} xs={12} />
            <EmployeeFormField label="Personal Email" name="personalEmail" type="email" value={formData.personalEmail} onChange={handleChange} />
            <EmployeeFormField label="Organizational Email" name="organizationalEmail" type="email" value={formData.organizationalEmail} onChange={handleChange} />
            <EmployeeFormField label="Personal Mobile" name="personalMobile" type="tel" value={formData.personalMobile} onChange={handleChange} />
            <EmployeeFormField label="Alternate Mobile" name="alternateMobile" type="tel" value={formData.alternateMobile} onChange={handleChange} required={false} />

            <EmployeeSelectField
              label="Department"
              options={departments}
              value={departments.find((d) => d.id === formData.departmentId) || null}
              getOptionLabel={(option) => option.departmentName}
              onChange={(val) => setFormData({ ...formData, departmentId: val?.id || "" })}
            />

            <EmployeeSelectField
              label="Role"
              options={roles}
              value={roles.find((r) => r.id === formData.roleId) || null}
              getOptionLabel={(option) => option.roleName}
              onChange={(val) => setFormData({ ...formData, roleId: val?.id || "" })}
            />

            <EmployeeSelectField
              label="Office"
              options={offices}
              value={offices.find((o) => o.id === formData.officeId) || null}
              getOptionLabel={(option) => option.location || "No Location"}
              onChange={(val) => setFormData({ ...formData, officeId: val?.id || "" })}
            />

            <EmployeeSelectField
              label="Team"
              options={teams}
              value={teams.find((t) => t.id === formData.teamId) || null}
              getOptionLabel={(option) => option.teamName}
              onChange={(val) => setFormData({ ...formData, teamId: val?.id || "" })}
            />

            <EmployeeSelectField
              label="Reporting Manager"
              options={reportingManagers}
              value={reportingManagers.find((e) => e.id === formData.reportingEmployeeId) || null}
              getOptionLabel={(option) => option.name}
              onChange={(val) => setFormData({ ...formData, reportingEmployeeId: val?.id || "" })}
            />

            <EmployeeFormField label="Line Manager" name="lineManager" value={formData.lineManager} onChange={handleChange} />
            <EmployeeFormField label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
            <EmployeeFormField label="Experience (Years)" name="yearOfExpTotal" type="number" value={formData.yearOfExpTotal} onChange={handleChange} />
            <EmployeeFormField label="Experience with Organization" name="yearOfExpOrganization" type="number" value={formData.yearOfExpOrganization} onChange={handleChange} />

            <EmployeeDropdownField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={["Active", "Inactive"]}
            />

            <EmployeeSelectField
              label="Shift"
              options={shifts}
              value={shifts.find((s) => s.id === formData.shiftId) || null}
              getOptionLabel={(option) => option.shiftName}
              onChange={(val) => setFormData({ ...formData, shiftId: val?.id || "" })}
            />
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
