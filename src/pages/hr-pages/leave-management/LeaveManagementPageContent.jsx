import React, { useEffect, useState } from "react";
import "./LeaveManagementPageContent.css";
import LeaveService from "../../../services/leaveService";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography
} from "@mui/material";
import { useSelector } from "react-redux";
import NotificationService from "../../../services/notificationService";

const LeaveManagementPageContent = () => {
  const [leaves, setLeaves] = useState([]);
  const userData = useSelector((state)=>state.userData)
  const fetchLeaves = async () => {
    try {
      const data = await LeaveService.getLeavesData();
      setLeaves(data);
    } catch (error) {
      console.error("Failed to fetch leaves:", error);
    }
  };

 const handleStatusChange = async (leaveId, newStatus) => {
  try {
    const leaveToUpdate = leaves.find(l => l.id === leaveId);
    if (!leaveToUpdate) return;

    const updatedLeave = {
      ...leaveToUpdate,
      status: newStatus
    };

    await LeaveService.updateLeaveStatus(leaveId, updatedLeave);
    const now = new Date().toISOString();
    const notificationPayload = {
      employeeId: updatedLeave.employeeId,
      message: `Your ${updatedLeave.leaveName} leave request has been ${newStatus.toLowerCase()}.`,
      messageType: "Leave Update",
      sentFrom: userData.id,
      isRead: false,
      readAt: null,
      sentAt: now,
    };
    await NotificationService.newLeaveNotification(notificationPayload)

    fetchLeaves(); 
  } catch (error) {
    console.error(`Failed to ${newStatus.toLowerCase()} leave:`, error);
  }
};


  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="leave-page-container">
      <Typography variant="h4" gutterBottom>
        Leave Requests
      </Typography>
      <TableContainer component={Paper}>
        <Table className="leave-table">
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>{leave.employeeId}</TableCell>
                <TableCell>{leave.leaveName}</TableCell>
                <TableCell>{new Date(leave.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(leave.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{leave.note}</TableCell>
                <TableCell>
                  <strong className={`status-${leave.status.toLowerCase()}`}>
                    {leave.status}
                  </strong>
                </TableCell>
                <TableCell>
                  {leave.status === "Pending" ? (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleStatusChange(leave.id, "Approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        style={{ marginLeft: 8 }}
                        onClick={() => handleStatusChange(leave.id, "Rejected")}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      {leave.status}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {leaves.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No leave requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LeaveManagementPageContent;
