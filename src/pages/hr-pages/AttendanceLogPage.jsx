import "./Dashboard.css";
import Header from "../../components/Header";
import SideBar from "../../components/HRSideBar";
import React, { lazy,Suspense } from "react";
const UserAttendanceLog = lazy(() => import("./attendance/UserAttendanceLog"));


const AttendanceLogPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="app-container">
           <Header />
          <div className="main-layout">
                <SideBar />
                <div className="content">
                  <UserAttendanceLog />
                </div>
         </div>
    </div>
     </Suspense>
  );
};
export default AttendanceLogPage;