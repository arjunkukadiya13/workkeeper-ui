import React, { lazy,Suspense } from "react";

const Header = lazy(() => import("../../components/Header"));
const EmployeeNotificationContent = lazy(() => import("./notification/EmployeeNotificationContent"));
const SideBar = lazy(() => import("../../components/EmployeeSIdeBar"));

const EmployeeNotification = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="app-container">
          <Header />
          <div className="main-layout">
              <SideBar />
                <div className="content">
                  <EmployeeNotificationContent/>
                </div>
          </div>
      </div>
      </Suspense>
  )
}

export default EmployeeNotification