import React, { lazy, Suspense, useState, useEffect } from "react";
import { CalendarDays, Users, Clock, Info, Briefcase, Home } from "lucide-react";
const InformationWidget = lazy(() => import("../../../components/InformationWidget"));
import "./HRUserDashboard.css";
import LeaveService from "../../../services/leaveService";
import AttendanceService from "../../../services/attendanceService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTodayLeaveData } from "../../../data/leaveData/leaveSlice";

const HRUserDashboard = () => {
  const [holidays, setHoliday] = useState([]);
  const [todayLeaveCount, setTodayLeaveCount] = useState(0);
  const [presenceInfo, setPresenceInfo] = useState("Loading...");
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date().toISOString().split("T")[0]; 
      const holidays = await LeaveService.getUpcomingHoliday(today);
      const logs = await AttendanceService.getLastAttendanceLog(userData.id);
      const leavesData = await LeaveService.getTodaysOnLeaveEmployee(today);
      setHoliday(holidays)
      setTodayLeaveCount(leavesData.length);
      dispatch(setTodayLeaveData(leavesData));
      const todayLogs = logs.filter((log) => log.date === today);

      if (todayLogs.length === 0) {
        // Absent case
        const lastIn = logs.find((log) => log.type === "In");
        const lastOut = logs.find((log) => log.type === "Out");

        if (lastIn && lastOut) {
          setPresenceInfo(
            `Last In: ${formatTime(lastIn.time)} (${lastIn.date}), Last Out: ${formatTime(lastOut.time)} (${lastOut.date})`
          );
        } else if (lastIn) {
          setPresenceInfo(`Last In: ${formatTime(lastIn.time)} (${lastIn.date})`);
        } else if (lastOut) {
          setPresenceInfo(`Last Out: ${formatTime(lastOut.time)} (${lastOut.date})`);
        } else {
          setPresenceInfo("No attendance logs found");
        }
      } else {
        // Present case
        const inLog = todayLogs.find((log) => log.type === "In");
        const outLog = todayLogs.find((log) => log.type === "Out");

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
    const date = new Date(isoDateTimeString);
    return date.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container-border">
        <div className="dashboard-container">
          <div className="widget-row">
            <InformationWidget
              infotitle="Today's Leave"
              info={`${todayLeaveCount} employee${todayLeaveCount === 1 ? "" : "s"} on leave`}
              Icon={CalendarDays}
              onClick={() => {
                navigate(`/hr/leave-management/todays-leaves/`);
              }}
            />
            <InformationWidget
              infotitle="Upcoming Holiday"
              info={
                holidays.length > 0
                  ? `${holidays[0].name} (${new Date(holidays[0].startDate).toLocaleDateString("en-IN")})`
                  : "No upcoming holidays"
              }
              Icon={CalendarDays}
            />
            <InformationWidget infotitle="Your Team" info="Arjun (Lead), Karan, Gopal" Icon={Users} />
            <InformationWidget
              infotitle="Your Presence"
              info={presenceInfo}
              Icon={Clock}
              onClick={() => {
                navigate(`/hr/attendance/`);
              }}
            />
            <InformationWidget
              infotitle="Today's Presence"
              info="5 in Office, 3 Remote"
              Icon={Home}
              onClick={() => {
                navigate(`/hr/attendance/today-presence`);
              }}
            />
            <InformationWidget infotitle="Quick Info" info="Manager: Alice, ID: 1023" Icon={Info} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default HRUserDashboard;
