import React, {  useState } from "react";
import {
  Typography,
} from "@mui/material";
import "./LeaveBalanceWidget.css"

const LeaveBalanceWidget = () => {
    const [leaveBalance, setLeaveBalance] = useState({
    "Privilege Leave": 10,
    "Optional Leave": 1,
    "Paternity Leave": 3,
    "Maternity Leave": 180,
    "Bereavement Leave": 3,
    "Compensation Leave": 2,
    "Loss of Pay": 0,
  });
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
  )
}

export default LeaveBalanceWidget