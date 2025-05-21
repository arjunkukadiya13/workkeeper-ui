import React, { lazy,Suspense } from "react";
import "./Dashboard.css";
const Header = lazy(() => import("../../components/Header"));
const SideBar = lazy(() => import("../../components/HRSideBar"));
const NotificationPageContent = lazy(() => import("./notification/NotificationPageContent"));

const NotificationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="app-container">
          <Header />
          <div className="main-layout">
              <SideBar />
                <div className="content">
                  <NotificationPageContent />
                </div>
          </div>
      </div>
      </Suspense>
  );
};

export default NotificationPage;
