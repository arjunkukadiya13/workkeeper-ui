import React, { useState, useEffect } from "react";
import { Button, Alert } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import "./EditEmployeeContent.css"

import EmployeeService from "../../../../services/employeeService";
import DepartmentService from "../../../../services/departmentService";
import RoleServices from "../../../../services/roleServices";
import TeamServices from "../../../../services/teamServices";
import OfficeServices from "../../../../services/officeServices";
import ShiftService from "../../../../services/shiftService";
import EmployeeForm from "../components/EmployeeForm";

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
    shiftId: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [teams, setTeams] = useState([]);
  const [offices, setOffices] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [reportingManagers, setReportingManagers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          departmentsRes,
          rolesRes,
          teamsRes,
          reportingRes,
          officesRes,
          shiftsRes,
        ] = await Promise.all([
          DepartmentService.getDepartment(),
          RoleServices.getRoles(),
          TeamServices.getTeams(),
          EmployeeService.getEmployee(),
          OfficeServices.getOffices(),
          ShiftService.getShifts(),
        ]);
        setDepartments(departmentsRes);
        setRoles(rolesRes);
        setTeams(teamsRes);
        setReportingManagers(reportingRes);
        setOffices(officesRes);
        setShifts(shiftsRes);
      } catch (err) {
        console.error("Failed to fetch dropdown data", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
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
          shiftId: response.shiftId || "",
        });
      } catch (err) {
        console.error("Failed to fetch employee", err);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      updatedAt: new Date().toISOString(),
    };
    try {
      await EmployeeService.updateEmployee(updatedData, id);
      setSuccessMessage("Employee updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      navigate(-1);
    } catch (error) {
      console.error("Error updating employee:", error);
      setSuccessMessage("Failed to update employee.");
    }
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

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <EmployeeForm
          formData={formData}
          setFormData={setFormData}
          departments={departments}
          roles={roles}
          offices={offices}
          teams={teams}
          reportingManagers={reportingManagers}
          shifts={shifts}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default EditEmployeeContent;
