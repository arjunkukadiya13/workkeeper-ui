import React, { lazy,Suspense } from "react";

const Header = lazy(() => import("../../../components/Header"));
const ViewEmployeePage = lazy(() => import("./view/ViewEmployeePage"));
const SideBar = lazy(() => import("../../../components/HRSideBar"));

const ViewEmployee = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="app-container">
          <Header />
          <div className="main-layout">
              <SideBar />
                <div className="content">
                  <ViewEmployeePage/>
                </div>
          </div>
      </div>
      </Suspense>
  )
}

export default ViewEmployee