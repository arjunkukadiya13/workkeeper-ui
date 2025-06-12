import React from "react";
import { Grid, TextField, Autocomplete } from "@mui/material";

const EmployeeSelectField = ({ xs = 4, label, options, value, getOptionLabel, onChange }) => (
  <Grid item xs={xs}>
    <Autocomplete
      options={options}
      getOptionLabel={getOptionLabel}
      value={value}
      onChange={(e, newValue) => onChange(newValue)}
      renderInput={(params) => <TextField {...params} label={label} fullWidth required />}
    />
  </Grid>
);

export default EmployeeSelectField;
