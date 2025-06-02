import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  CalendarDays,
  Users,
  Clock,
  Info,
  Home,
} from "lucide-react";
const InformationWidget = lazy(() => import("../../../components/InformationWidget"));
import "./EmployeeDashboardContent.css";
import LeaveService from "../../../services/leaveService";
import AttendanceService from "../../../services/attendanceService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EmployeeDashboardContent = () => {
  const [holidays, setHoliday] = useState([]);
  const [attendanceLog, setAttendanceLog] = useState([]);
  const [presenceInfo, setPresenceInfo] = useState("Loading...");
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const holidays = await LeaveService.getUpcomingHoliday("2025-05-15");
      setHoliday(holidays);

      const logs = await AttendanceService.getLastAttendanceLog(userData.id);
      setAttendanceLog(logs);

      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const todayLogs = logs.filter(log => log.date === today);

      if (todayLogs.length === 0) {
        // Absent case
        const lastIn = logs.find(log => log.type === "In");
        const lastOut = logs.find(log => log.type === "Out");

        if (lastIn && lastOut) {
          setPresenceInfo(`Last In: ${formatTime(lastIn.time)} (${lastIn.date}), Last Out: ${formatTime(lastOut.time)} (${lastOut.date})`);
        } else if (lastIn) {
          setPresenceInfo(`Last In: ${formatTime(lastIn.time)} (${lastIn.date})`);
        } else if (lastOut) {
          setPresenceInfo(`Last Out: ${formatTime(lastOut.time)} (${lastOut.date})`);
        } else {
          setPresenceInfo("No attendance logs found");
        }
      } else {
        // Present case
        const inLog = todayLogs.find(log => log.type === "In");
        const outLog = todayLogs.find(log => log.type === "Out");

        if (inLog && outLog) {
          setPresenceInfo(`In: ${formatTime(inLog.time)}, Out: ${formatTime(outLog.time)}`);
        } else if (inLog) {
          setPresenceInfo(`In: ${formatTime(inLog.time)}`);
        } else {
          setPresenceInfo("No valid IN entry today");
        }
      }
    };

    fetchData();
  }, [userData.id]);

  const formatTime = (isoDateTimeString) => {
    const [, timeWithOffset] = isoDateTimeString.split("T"); 
    const [time] = timeWithOffset.split("+"); 
    const [hours, minutes] = time.split(":");

    const h = parseInt(hours, 10);
    const suffix = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 === 0 ? 12 : h % 12;

    return `${formattedHour}:${minutes} ${suffix}`;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container-border">
        <div className="dashboard-container">
          <div className="widget-row">
            <InformationWidget infotitle="Today's Leave" info="Arjun, on leave" Icon={CalendarDays} />
            <InformationWidget
              infotitle="Upcoming Holiday"
              info={
                holidays.length > 0
                  ? `${holidays[0].name} (${new Date(holidays[0].startDate).toLocaleDateString()})`
                  : "No upcoming holidays"
              }
              Icon={CalendarDays}
            />
            <InformationWidget infotitle="Your Team" info={userData.teamName} Icon={Users} 
              onClick={()=>{navigate("/employee/team")}}
            />
            <InformationWidget infotitle="Your Presence" info={presenceInfo} Icon={Clock} />
            <InformationWidget infotitle="Quick Info" info={`Manager: Alice, ID: ${userData.id}`} Icon={Info} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default EmployeeDashboardContent;
