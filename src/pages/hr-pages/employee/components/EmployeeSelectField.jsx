import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

const EmployeeSelectField = ({ label, name, value, onChange, options, xs = 4 }) => (
  <Grid item xs={xs}>
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
);

export default EmployeeSelectField;