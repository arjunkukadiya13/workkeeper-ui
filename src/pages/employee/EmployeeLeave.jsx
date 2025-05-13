import React, { lazy,Suspense } from "react";

const Header = lazy(() => import("../../components/Header"));
const EmployeeLeaveContent = lazy(() => import("./leave/EmployeeLeaveContent"));
const SideBar = lazy(() => import("../../components/EmployeeSIdeBar"));

const EmployeeLeave = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="app-container">
          <Header />
          <div className="main-layout">
              <SideBar />
                <div className="content">
                  <EmployeeLeaveContent/>
                </div>
          </div>
      </div>
      </Suspense>
  )
}

export default EmployeeLeave