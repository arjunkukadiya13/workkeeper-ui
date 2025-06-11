import React from "react";
import { TextField, Grid } from "@mui/material";

const EmployeeFormField = ({ label, name, value, onChange, required = true, type = "text", xs = 4 }) => (
  <Grid item xs={xs}>
    <TextField
      label={label}
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      fullWidth
      required={required}
    />
  </Grid>
);

export default EmployeeFormField;