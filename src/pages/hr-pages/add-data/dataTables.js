import { keys } from "@mui/system";

export const dataTables = {
  shift: {
    label: "Shift",
    columns: ["Date", "Present", "Absent"],
    keys: ["date", "present", "absent"],
  },
  departments: {
    label: "Department",
    columns: ["Department Name", "Description" ],
    keys: ["departmentName", "departmentDescription"],
  },
  leaveType:{
    label:"Leave Type",
    columns:["Leave Name","No of Days","Description"],
    keys:["leaveName","noOfDays","description"]
  },
  office:{
    label:"Office",
    columns:["Office Name","Location"],
    keys:["officeName","location"]
  },
  shift:{
    label:"Shift",
    columns:["Shift Name","Start Time","Break Duration","End Time"],
    keys:["shiftName","startTime","breakDuration","endTime"]
  },
};
