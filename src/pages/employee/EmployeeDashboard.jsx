import React, { lazy,Suspense } from "react";

const Header = lazy(() => import("../../components/Header"));
const EmployeeDashboardContent = lazy(() => import("./dashboard/EmployeeDashboardContent"));
const SideBar = lazy(() => import("../../components/EmployeeSIdeBar"));

const EmployeeDashboard = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="app-container">
          <Header />
          <div className="main-layout">
              <SideBar />
                <div className="content">
                  <EmployeeDashboardContent/>
                </div>
          </div>
      </div>
      </Suspense>
  )
}

export default EmployeeDashboard