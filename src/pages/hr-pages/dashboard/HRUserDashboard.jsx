import React, { lazy,Suspense } from "react";
import { CalendarDays, Users, Clock, Info, Briefcase, Home } from "lucide-react"; 
const InformationWidget = lazy(() => import("../../../components/InformationWidget"));
import "./HRUserDashboard.css";


const HRUserDashboard = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="container-border">
      <div className="dashboard-container">
        
        <div className="widget-row">
          <InformationWidget infotitle="Today's Leave" info="Arjun, on leave" Icon={CalendarDays} />
          <InformationWidget infotitle="Upcoming Leaves" info="15th March" Icon={CalendarDays} />
          <InformationWidget infotitle="Your Team" info="Arjun (Lead), Karan, Gopal" Icon={Users} />
          <InformationWidget infotitle="Your Presence" info="In: 9:00 AM, Out: 6:00 PM" Icon={Clock} />
          <InformationWidget infotitle="Today's Presence" info="5 in Office, 3 Remote" Icon={Home} />
          <InformationWidget infotitle="Quick Info" info="Manager: Alice, ID: 1023" Icon={Info} />
      </div>
       
      </div>
    </div>
    </Suspense>
  );
};

export default HRUserDashboard;
