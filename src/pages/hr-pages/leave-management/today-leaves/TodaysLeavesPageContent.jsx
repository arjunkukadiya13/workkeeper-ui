import React, { useEffect, useState } from 'react';
import './TodaysLeavesPageContent.css';
import LeaveService from '../../../../services/leaveService';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const TodaysLeavesPageContent = () => {
  const [todayLeave, setTodayLeave] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayLeave = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const leaveData = await LeaveService.getTodaysOnLeaveEmployee(today);
        setTodayLeave(leaveData);
      } catch (error) {
        console.error("Failed to fetch today's leaves", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodayLeave();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Box className="todays-leaves-container">
      <Typography variant="h5" gutterBottom>Today's Leaves</Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : todayLeave.length === 0 ? (
        <Typography>No employees are on leave today.</Typography>
      ) : (
        <TableContainer component={Paper} className="leave-table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>#</strong></TableCell>
                <TableCell><strong>Employee ID</strong></TableCell>
                <TableCell><strong>Leave Type</strong></TableCell>
                <TableCell><strong>Approver</strong></TableCell>
                <TableCell><strong>Start Date</strong></TableCell>
                <TableCell><strong>End Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todayLeave.map((leave, index) => (
                <TableRow key={leave.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{leave.employeeId}</TableCell>
                  <TableCell>{leave.leaveName}</TableCell>
                  <TableCell>{leave.approverName}</TableCell>
                  <TableCell>{formatDate(leave.startDate)}</TableCell>
                  <TableCell>{formatDate(leave.endDate)}</TableCell>
                  <TableCell>{leave.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TodaysLeavesPageContent;
