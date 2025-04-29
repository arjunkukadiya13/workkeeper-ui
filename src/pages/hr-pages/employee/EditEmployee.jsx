import React, { lazy,Suspense } from "react";

const Header = lazy(() => import("../../../components/Header"));
const EditEmployeeContent = lazy(() => import("./edit/EditEmployeeContent"));
const SideBar = lazy(() => import("../../../components/HRSideBar"));

const EditEmployee = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="app-container">
          <Header />
          <div className="main-layout">
              <SideBar />
                <div className="content">
                  {/* <AddEmployee /> */}
                  <EditEmployeeContent/>
                </div>
          </div>
      </div>
      </Suspense>
  )
}

export default EditEmployee