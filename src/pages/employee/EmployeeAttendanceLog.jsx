import React, { lazy,Suspense } from "react";

const Header = lazy(() => import("../../components/Header"));
const EmployeeAttendanceLogContent = lazy(() => import("./attendance/EmployeeAttendanceLogContent"));
const SideBar = lazy(() => import("../../components/EmployeeSIdeBar"));

const EmployeeAttendanceLog = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="app-container">
          <Header />
          <div className="main-layout">
              <SideBar />
                <div className="content">
                  <EmployeeAttendanceLogContent/>
                </div>
          </div>
      </div>
      </Suspense>
  )
}

export default EmployeeAttendanceLog