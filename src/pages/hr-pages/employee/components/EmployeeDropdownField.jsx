import React from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const EmployeeDropdownField = ({ xs = 4, label, name, value, onChange, options }) => (
  <Grid item xs={xs}>
    <FormControl fullWidth required>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} label={label} onChange={onChange}>
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
);

export default EmployeeDropdownField;
