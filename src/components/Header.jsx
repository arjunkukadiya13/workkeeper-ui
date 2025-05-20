import { useSelector } from "react-redux";
import "./Header.css";
import React, { lazy,Suspense,useState, useEffect } from "react";
const ProfileMenu = lazy(() => import("./ProfileMenu"));

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const userData = useSelector((state)=>state.userData);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Updates time every second
    return () => clearInterval(interval);
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="header">
      <h1>Workkeeper</h1>
      <div className="header-center">
          <p className="current-time">
            {currentTime.toLocaleDateString()} | {currentTime.toLocaleTimeString()}
          </p>
        </div>
      <div className="profile-container">
      <h3 >{userData.name}</h3>
        <ProfileMenu />
      </div>
    </div>
    </Suspense>
  );
};

export default Header;
