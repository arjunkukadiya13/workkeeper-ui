import React, { lazy,Suspense } from "react";
import "./Dashboard.css";
const Header = lazy(() => import("../../components/Header"));
const SideBar = lazy(() => import("../../components/HRSideBar"));
const SettingPageContent = lazy(() => import("./setting/SettingPageContent"));

const SettingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="app-container">
          <Header />
          <div className="main-layout">
              <SideBar />
                <div className="content">
                  <SettingPageContent />
                </div>
          </div>
      </div>
      </Suspense>
  );
};

export default SettingPage;
