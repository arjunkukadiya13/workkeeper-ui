import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate(); 
  const userData = useSelector((state)=>state.userData);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  const handleLogout = () => {

    navigate("/"); 
  };

  return (
    <div className="profile-container" ref={menuRef}>

      <div onClick={() => setIsOpen(!isOpen)} className="profile-icon">
        <FaUserCircle />
      </div>

      <div className={`profile-dropdown ${isOpen ? "show" : ""}`}>
        <h3 className="text-lg font-semibold">{userData.name}</h3>
        <p className="text-sm text-gray-600">{userData.personalEmail}</p>
        <hr className="my-2" />
        <button 
          onClick={handleLogout}
          className="w-full bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
