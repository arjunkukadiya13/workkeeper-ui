export const reportTypes = {
  attendance: {
    label: "Attendance Trends",
    columns: ["Date", "Present", "Absent"],
    keys: ["date", "present", "absent"],
  },
  leave: {
    label: "Leave Balance & Patterns",
    columns: ["Employee", "Leave Type", "Days Taken"],
    keys: ["employeeName", "leaveType", "daysTaken"],
  },
  workhours: {
    label: "Employee Work Hours",
    columns: ["Employee", "Total Hours", "Overtime Hours"],
    keys: ["employeeName", "totalHours", "overtimeHours"],
  },
  overtime: {
    label: "Overtime",
    columns: ["Employee", "Overtime Hours", "Dates"],
    keys: ["employeeName", "overtimeHours", "dates"],
  },
  missingAttendance: {
    label: "Missing Attendance Entries",
    columns: ["Employee", "Date", "Missing Type"],
    keys: ["employeeName", "date", "missingType"],
  },
  lateComers: {
    label: "Late Comers Report",
    columns: ["Employee", "Date", "In Time", "Late By"],
    keys: ["employeeName", "date", "inTime", "lateBy"],
  },
  earlyLeavers: {
    label: "Early Leavers Report",
    columns: ["Employee", "Date", "Out Time", "Left Early By"],
    keys: ["employeeName", "date", "outTime", "leftEarlyBy"],
  },
  teamPresence: {
    label: "Team Daily Presence",
    columns: ["Team", "Date", "Present", "WFH", "Absent"],
    keys: ["teamName", "date", "present", "wfh", "absent"],
  },
  leaveSummary: {
    label: "Monthly Leave Summary",
    columns: ["Employee", "Month", "Leave Type", "Days Taken"],
    keys: ["employeeName", "month", "leaveType", "daysTaken"],
  },
  overtimeSummary: {
    label: "Monthly Overtime Summary",
    columns: ["Employee", "Month", "Overtime Hours"],
    keys: ["employeeName", "month", "overtimeHours"],
  },
};
