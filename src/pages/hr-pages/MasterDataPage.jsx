import React, { lazy,Suspense } from "react";
import "./Dashboard.css";
const Header = lazy(() => import("../../components/Header"));
const SideBar = lazy(() => import("../../components/HRSideBar"));
const TablePageContent = lazy(() => import("./add-data/TablePageContent"));

const MasterDataPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="app-container">
          <Header />
          <div className="main-layout">
              <SideBar />
                <div className="content">
                  <TablePageContent />
                </div>
          </div>
      </div>
      </Suspense>
  );
};

export default MasterDataPage;
