import React, { lazy,Suspense } from "react";

const Header = lazy(() => import("../../../../components/Header"));

const EmployeeLeavesPageContent = lazy(() => import("./view-leaves/EmployeeLeavesPageContent"));
const SideBar = lazy(() => import("../../../../components/HRSideBar"));

const EmployeeLeavesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="app-container">
          <Header />
          <div className="main-layout">
              <SideBar />
                <div className="content">
                  <EmployeeLeavesPageContent/>
                </div>
          </div>
      </div>
      </Suspense>
  )
}

export default EmployeeLeavesPage