import React, { lazy,Suspense } from "react";
import "./Dashboard.css";
import Header from "../../components/Header";
import SideBar from "../../components/HRSideBar";
const UserAttendance = lazy(() => import("./attendance/UserAttendance"));


const AttendancePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="app-container">
           <Header />
          <div className="main-layout">
                <SideBar />
                <div className="content">
                  <UserAttendance />
                </div>
         </div>
    </div>
     </Suspense>
  );
};
export default AttendancePage;