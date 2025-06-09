export const reportTypes = {
  attendance: {
    label: "Attendance Trends",
    columns: ["Date", "Present", "Absent"],
  },
  leave: {
    label: "Leave Balance & Patterns",
    columns: ["Employee", "Leave Type", "Days Taken"],
  },
  workhours: {
    label: "Employee Work Hours",
    columns: ["Employee", "Total Hours", "Overtime Hours"],
  },
  overtime: {
    label: "Overtime",
    columns: ["Employee", "Overtime Hours", "Dates"],
  },
  missingAttendance: {
    label: "Missing Attendance Entries",
    columns: ["Employee", "Date", "Missing Type"],
  },
  lateComers: {
    label: "Late Comers Report",
    columns: ["Employee", "Date", "In Time", "Late By"],
  },
  earlyLeavers: {
    label: "Early Leavers Report",
    columns: ["Employee", "Date", "Out Time", "Left Early By"],
  },
  teamPresence: {
    label: "Team Daily Presence",
    columns: ["Team", "Date", "Present", "WFH", "Absent"],
  },
  leaveSummary: {
    label: "Monthly Leave Summary",
    columns: ["Employee", "Month", "Leave Type", "Days Taken"],
  },
  overtimeSummary: {
    label: "Monthly Overtime Summary",
    columns: ["Employee", "Month", "Overtime Hours"],
  },
};
