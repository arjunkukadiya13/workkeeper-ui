import React, { lazy,Suspense } from "react";

const Header = lazy(() => import("../../components/Header"));
const EmployeeTeamContent = lazy(() => import("./your-team/EmployeeTeamContent"));
const SideBar = lazy(() => import("../../components/EmployeeSIdeBar"));

const EmployeeTeam = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="app-container">
          <Header />
          <div className="main-layout">
              <SideBar />
                <div className="content">
                  <EmployeeTeamContent/>
                </div>
          </div>
      </div>
      </Suspense>
  )
}

export default EmployeeTeam