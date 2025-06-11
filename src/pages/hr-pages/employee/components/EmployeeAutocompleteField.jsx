import React from "react";
import { Autocomplete, TextField, Grid } from "@mui/material";

const EmployeeAutocompleteField = ({
  label,
  options,
  value,
  getOptionLabel,
  onChange,
  xs = 4
}) => (
  <Grid item xs={xs}>
    <Autocomplete
      options={options}
      getOptionLabel={getOptionLabel}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      renderInput={(params) => <TextField {...params} label={label} fullWidth required />}
    />
  </Grid>
);

export default EmployeeAutocompleteField;