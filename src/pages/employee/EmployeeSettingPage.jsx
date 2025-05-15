import React, { lazy,Suspense } from "react";

const Header = lazy(() => import("../../components/Header"));
const EmployeeSIdeBar = lazy(() => import("../../components/EmployeeSIdeBar"));
const SettingPageContent = lazy(() => import("./settings/SettingPageContent"));

const EmployeeSettingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="app-container">
          <Header />
          <div className="main-layout">
              <EmployeeSIdeBar />
                <div className="content">
                  <SettingPageContent />
                </div>
          </div>
      </div>
      </Suspense>
  );
};

export default EmployeeSettingPage;
