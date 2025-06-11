import React from "react";
import { Grid, Button } from "@mui/material";
import EmployeeFormField from "./EmployeeFormField";
import EmployeeAutocompleteField from "./EmployeeAutocompleteField";
import EmployeeSelectField from "./EmployeeSelectField";

const EmployeeForm = ({
  formData,
  setFormData,
  departments,
  roles,
  offices,
  teams,
  reportingManagers,
  shifts,
  handleChange,
  handleSubmit,
}) => {
  const handleAutoChange = (field) => (newValue) =>
    setFormData({ ...formData, [field]: newValue?.id || "" });

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <EmployeeFormField label="Employee Name" name="name" value={formData.name} onChange={handleChange} xs={12} />
        <EmployeeFormField label="Personal Email" name="personalEmail" value={formData.personalEmail} onChange={handleChange} type="email" />
        <EmployeeFormField label="Organizational Email" name="organizationEmail" value={formData.organizationEmail} onChange={handleChange} type="email" />
        <EmployeeFormField label="Personal Mobile" name="personalMobile" value={formData.personalMobile} onChange={handleChange} type="tel" />
        <EmployeeFormField label="Alternate Mobile" name="alternateMobile" value={formData.alternateMobile} onChange={handleChange} type="tel" />

        <EmployeeAutocompleteField
          label="Department"
          options={departments}
          getOptionLabel={(option) => option.departmentName}
          value={departments.find((d) => d.id === formData.departmentId) || null}
          onChange={handleAutoChange("departmentId")}
        />
        <EmployeeAutocompleteField
          label="Role"
          options={roles}
          getOptionLabel={(option) => option.roleName}
          value={roles.find((r) => r.id === formData.roleId) || null}
          onChange={handleAutoChange("roleId")}
        />
        <EmployeeAutocompleteField
          label="Office"
          options={offices}
          getOptionLabel={(option) => option.location}
          value={offices.find((o) => o.id === formData.officeId) || null}
          onChange={handleAutoChange("officeId")}
        />
        <EmployeeAutocompleteField
          label="Team"
          options={teams}
          getOptionLabel={(option) => option.teamName}
          value={teams.find((t) => t.id === formData.teamId) || null}
          onChange={handleAutoChange("teamId")}
        />
        <EmployeeAutocompleteField
          label="Reporting Manager"
          options={reportingManagers}
          getOptionLabel={(option) => option.name}
          value={reportingManagers.find((e) => e.id === formData.reportingEmployeeId) || null}
          onChange={handleAutoChange("reportingEmployeeId")}
        />
        <EmployeeAutocompleteField
          label="Line Manager"
          options={reportingManagers}
          getOptionLabel={(option) => option.name}
          value={reportingManagers.find((e) => e.id === formData.lineManagerId) || null}
          onChange={handleAutoChange("lineManagerId")}
        />

        <EmployeeFormField label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
        <EmployeeFormField label="Experience (Years)" name="yearOfExpTotal" value={formData.yearOfExpTotal} onChange={handleChange} type="number" />
        <EmployeeFormField label="Experience with Organization" name="yearOfExpOrganization" value={formData.yearOfExpOrganization} onChange={handleChange} type="number" />

        <EmployeeSelectField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
          ]}
        />

        <EmployeeAutocompleteField
          label="Shift"
          options={shifts}
          getOptionLabel={(option) => option.shiftName}
          value={shifts.find((s) => s.id === formData.shiftId) || null}
          onChange={handleAutoChange("shiftId")}
        />

        {/* Update Button */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth className="MuiButton-root">
            Update Employee
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EmployeeForm;
