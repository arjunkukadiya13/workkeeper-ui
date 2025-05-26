import React, { lazy,Suspense } from "react";

const EmployeeFullAttendance = lazy(() => import("./view-attendance/EmployeeFullAttendance"));
const HRSideBar = lazy(() => import("../../../../components/HRSideBar"));
const Header = lazy(() => import("../../../../components/Header"));

const EmployeeAttendacnePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="app-container">
          <Header />
          <div className="main-layout">
              <HRSideBar />
                <div className="content">
                  <EmployeeFullAttendance/>
                </div>
          </div>
      </div>
      </Suspense>
  )
}

export default EmployeeAttendacnePage