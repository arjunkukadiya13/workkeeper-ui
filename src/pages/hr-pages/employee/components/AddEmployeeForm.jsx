import { Grid, Button } from "@mui/material";
import EmployeeFormField from "./EmployeeFormField";
import EmployeeAutocompleteField from "./EmployeeAutocompleteField";
import EmployeeSelectField from "./EmployeeSelectField";

const AddEmployeeForm = ({
  formData,
  onChange,
  onAutoChange,
  onSubmit,
  isEdit = false,
  departments,
  roles,
  offices,
  teams,
  shifts,
  reportingManagers,
  isSubmitting = false,
}) => {
  return (
    <form onSubmit={onSubmit} className="employee-form">
      <Grid container spacing={2}>
        <EmployeeFormField label="Employee Name" name="name" value={formData.name} onChange={onChange} />
        <EmployeeFormField label="Personal Email" name="personalEmail" value={formData.personalEmail} onChange={onChange} type="email" />
        <EmployeeFormField label="Organizational Email" name="organizationalEmail" value={formData.organizationalEmail} onChange={onChange} type="email" />
        <EmployeeFormField label="Personal Mobile" name="personalMobile" value={formData.personalMobile} onChange={onChange} type="tel" />
        <EmployeeFormField label="Alternate Mobile" name="alternateMobile" value={formData.alternateMobile} onChange={onChange} type="tel" />

        <EmployeeAutocompleteField label="Department" options={departments} getOptionLabel={(o) => o.departmentName} value={departments.find((d) => d.id === formData.departmentId) || null} onChange={onAutoChange("departmentId")} />
        <EmployeeAutocompleteField label="Role" options={roles} getOptionLabel={(o) => o.roleName} value={roles.find((r) => r.id === formData.roleId) || null} onChange={onAutoChange("roleId")} />
        <EmployeeAutocompleteField label="Office" options={offices} getOptionLabel={(o) => o.location} value={offices.find((o) => o.id === formData.officeId) || null} onChange={onAutoChange("officeId")} />
        <EmployeeAutocompleteField label="Team" options={teams} getOptionLabel={(o) => o.teamName} value={teams.find((t) => t.id === formData.teamId) || null} onChange={onAutoChange("teamId")} />
        <EmployeeAutocompleteField label="Reporting Manager" options={reportingManagers} getOptionLabel={(o) => o.name} value={reportingManagers.find((e) => e.id === formData.reportingEmployeeId) || null} onChange={onAutoChange("reportingEmployeeId")} />

        <EmployeeFormField label="Line Manager" name="lineManager" value={formData.lineManager} onChange={onChange} />
        <EmployeeFormField label="Designation" name="designation" value={formData.designation} onChange={onChange} />
        <EmployeeFormField label="Experience (Years)" name="yearOfExpTotal" value={formData.yearOfExpTotal} onChange={onChange} type="number" />
        <EmployeeFormField label="Experience with Organization" name="yearOfExpOrganization" value={formData.yearOfExpOrganization} onChange={onChange} type="number" />

        <EmployeeSelectField
          label="Status"
          name="status"
          value={formData.status}
          onChange={onChange}
          options={[
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
          ]}
        />

        <EmployeeAutocompleteField label="Shift" options={shifts} getOptionLabel={(o) => o.shiftName} value={shifts.find((s) => s.id === formData.shiftId) || null} onChange={onAutoChange("shiftId")} />
      </Grid>

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={isSubmitting}>
        {isEdit ? "Update" : "Add"} Employee
      </Button>
    </form>
  );
};

export default AddEmployeeForm;
