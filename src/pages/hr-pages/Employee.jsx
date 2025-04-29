import React, { lazy,Suspense } from "react";

const Header = lazy(() => import("../../components/Header"));
const EmployeeData = lazy(() => import("./employee/data/EmployeeData"));
const SideBar = lazy(() => import("../../components/HRSideBar"));

const Employee = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="app-container">
          <Header />
          <div className="main-layout">
              <SideBar />
                <div className="content">
                  {/* <AddEmployee /> */}
                  <EmployeeData/>
                </div>
          </div>
      </div>
      </Suspense>
  )
}

export default Employee