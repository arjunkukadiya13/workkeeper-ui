import React, { lazy,Suspense } from "react";
import ".././Dashboard.css";
const Header = lazy(() => import("../../../components/Header"));
const SideBar = lazy(() => import("../../../components/HRSideBar"));
const AttendanceFullLogs = lazy(() => import("./todays-presence/AttendanceFullLogs"));

const TodaysPresence = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="app-container">
          <Header />
          <div className="main-layout">
              <SideBar />
                <div className="content">
                  <AttendanceFullLogs />
                </div>
          </div>
      </div>
      </Suspense>
  );
};

export default TodaysPresence;