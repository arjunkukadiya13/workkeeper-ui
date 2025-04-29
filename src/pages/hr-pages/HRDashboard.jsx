import React, { lazy,Suspense } from "react";
import "./Dashboard.css";
const Header = lazy(() => import("../../components/Header"));
const SideBar = lazy(() => import("../../components/HRSideBar"));
const UserDashboard = lazy(() => import("./dashboard/HRUserDashboard"));

const HRDashboard = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="app-container">
          <Header />
          <div className="main-layout">
              <SideBar />
                <div className="content">
                  <UserDashboard />
                </div>
          </div>
      </div>
      </Suspense>
  );
};

export default HRDashboard;
