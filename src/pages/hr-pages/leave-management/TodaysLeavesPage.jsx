import React, { lazy,Suspense } from "react";
import ".././Dashboard.css";
import Header from "../../../components/Header";
import SideBar from "../../../components/HRSideBar";
const TodaysLeavesPageContent = lazy(() => import("./today-leaves/TodaysLeavesPageContent"));


const TodaysLeavesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="app-container">
           <Header />
          <div className="main-layout">
                <SideBar />
                <div className="content">
                  <TodaysLeavesPageContent />
                </div>
         </div>
    </div>
     </Suspense>
  );
};
export default TodaysLeavesPage;