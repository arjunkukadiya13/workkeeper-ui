import React from "react";
import { Typography } from "@mui/material";
import "./LeaveBalanceWidget.css";

const LeaveBalanceWidget = ({ leaveBalance }) => {
  return (
    <div>
      <Typography variant="h6" sx={{ marginTop: 4 }}>
        Leave Balance
      </Typography>
      <ul>
        {Object.entries(leaveBalance).map(([type, days]) => (
          <li key={type}>
            {type}: {days} days
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveBalanceWidget;
