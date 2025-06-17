import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from "@mui/material";

const formFieldsMap = {
  departments: [
    { name: "departmentName", label: "Department Name" },
    { name: "departmentDescription", label: "Description" },
  ],
  leaveType: [
    { name: "leaveName", label: "Leave Name" },
    { name: "noOfDays", label: "No of Days", type: "number" },
    { name: "description", label: "Description" },
  ],
  office: [
    { name: "officeName", label: "Office Name" },
    { name: "location", label: "Location" },
  ],
  shift: [
    { name: "shiftName", label: "Shift Name" },
    { name: "startTime", label: "Start Time", type: "time" },
    { name: "breakDuration", label: "Break Duration", type: "time" },
    { name: "endTime", label: "End Time", type: "time" },
  ],
};

const AddRecordModal = ({ open, onClose, onSubmit, tableType }) => {
  const fields = formFieldsMap[tableType] || [];
  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({});
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New {tableType}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {fields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              type={field.type || "text"}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              fullWidth
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRecordModal;
