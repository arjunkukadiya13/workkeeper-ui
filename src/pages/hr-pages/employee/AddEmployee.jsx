import React, { lazy,Suspense } from "react";

const Header = lazy(() => import("../../../components/Header"));
const AddEmlpoyeeContent = lazy(() => import("./add/AddEmlpoyeeContent"));
const SideBar = lazy(() => import("../../../components/HRSideBar"));

const AddEmployee = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="app-container">
          <Header />
          <div className="main-layout">
              <SideBar />
                <div className="content">
                  {/* <AddEmployee /> */}
                  <AddEmlpoyeeContent/>
                </div>
          </div>
      </div>
      </Suspense>
  )
}

export default AddEmployee