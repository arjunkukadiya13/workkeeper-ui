import React, { useEffect, useState } from "react";
import "./EmployeeLeaveContent.css";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import LeaveService from "../../../services/leaveService";
import EmployeeService from "../../../services/employeeService";
import { useSelector } from "react-redux";
import LeaveBalanceWidget from "./balance/LeaveBalanceWidget";
import LeaveHistoryData from "./history/LeaveHistoryData";
import ApplyForLeavePage from "./apply/ApplyForLeavePage";
import NotificationService from "../../../services/notificationService";

const EmployeeLeaveContent = () => {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [note, setNote] = useState("");
  const [ccTo, setCcTo] = useState("");

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [ccOptions, setCcOptions] = useState([]);
  const [leaveHistory, setLeaveHistory] = useState([]);

  const userData = useSelector((state) => state.userData);


  const handleApply = async () => {
    const selectedLeaveType = leaveTypes.find((lt) => lt.leaveName === leaveType);
    const selectedApprover = ccOptions.find((emp) => emp.organizationEmail === ccTo);

    const payload = {
      employeeId: userData.id,
      leaveTypeId: selectedLeaveType?.id || 0,
      note: note || "",
      approverId: selectedApprover?.id || 0,
      startDate: new Date(fromDate).toISOString(),
      endDate: new Date(toDate).toISOString(),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await LeaveService.addNewLeave(payload);
      alert("Leave applied successfully");
      const now = new Date().toISOString();

      const notificationPayLoad = {
        employeeId: selectedApprover?.id || 0,
        message: `${userData.name} has applied for ${leaveType} leave.`,
        messageType: "Leave Application",
        sentFrom: userData.id,
        isRead: false,
        readAt: null,
        sentAt: now,
      };
      await NotificationService.newLeaveNotification(notificationPayLoad);

      fetchLeaves();
      setLeaveType("");
      setFromDate("");
      setToDate("");
      setNote("");
      setCcTo("");
    } catch (error) {
      console.error("Failed to apply leave:", error);
    }
  };

  const handleWithdraw = async (id) => {

    const updated = leaveHistory.filter((leave) => leave.id !== id);
    setLeaveHistory(updated);
    alert("Leave withdrawn successfully");
  };

  const fetchLeaveTypes = async () => {
    try {
      const types = await LeaveService.getLeaveTypes();
      setLeaveTypes(types);
    } catch (error) {
      console.error("Error fetching leave types:", error);
    }
  };

  const fetchHRDetails = async () => {
    try {
      const ccList = await EmployeeService.getEmployeeByRole("HR Manager");
      setCcOptions(ccList);
    } catch (error) {
      console.error("Error fetching HR managers:", error);
    }
  };

  const fetchLeaves = async () => {
    try {
      const leavesData = await LeaveService.getEmployeeLeaveById(userData.id);

      const mappedLeaves = leavesData.map((leave, index) => {
        const leaveTypeName = leaveTypes.find((lt) => lt.id === leave.leaveTypeId)?.leaveName || "Unknown";
        const ccToEmail = ccOptions.find((emp) => emp.id === leave.approverId)?.organizationEmail || "";

        return {
          id: leave.id || index + 1,
          leaveType: leaveTypeName,
          fromDate: leave.startDate.split("T")[0],
          toDate: leave.endDate.split("T")[0],
          status: leave.status,
          note: leave.note,
          ccTo: ccToEmail,
        };
      });

      setLeaveHistory(mappedLeaves);
    } catch (error) {
      console.error("Error fetching employee leaves:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchLeaveTypes();
      await fetchHRDetails();
      await fetchLeaves();
    };

    loadData();
  }, []);

  return (
    
    <div className="employee-leave-container">
      <ApplyForLeavePage
        leaveType={leaveType}
        setLeaveType={setLeaveType}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        note={note}
        setNote={setNote}
        ccTo={ccTo}
        setCcTo={setCcTo}
        leaveTypes={leaveTypes}
        ccOptions={ccOptions}
        handleApply={handleApply}
      />

      <LeaveBalanceWidget/>
      <LeaveHistoryData
        leaveHistory={leaveHistory}
        handleWithdraw={handleWithdraw}
      />

    </div>
  );
};

export default EmployeeLeaveContent;
