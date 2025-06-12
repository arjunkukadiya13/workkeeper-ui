import React from "react";
import { Grid, TextField } from "@mui/material";

const EmployeeFormField = ({ xs = 4, label, name, value, onChange, type = "text", required = true }) => (
  <Grid item xs={xs}>
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      type={type}
      required={required}
    />
  </Grid>
);

export default EmployeeFormField;
