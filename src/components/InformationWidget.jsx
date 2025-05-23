import React from "react";
import "./InformationWidget.css";

const InformationWidget = ({ infotitle, info, Icon, onClick }) => {
  return (
    <div 
      className="info-widget" 
      onClick={onClick} 
      role="button" 
      tabIndex={0} 
      onKeyDown={(e) => { if (e.key === "Enter") onClick?.(); }}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="icon-container">{Icon && <Icon size={24} />}</div>
      <div className="info-content">
        <h3>{infotitle}</h3>
        <h3>{info}</h3>
      </div>
    </div>
  );
};

export default InformationWidget;
