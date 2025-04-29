import React from "react";
import "./InformationWidget.css"

const InformationWidget = ({ infotitle, info, Icon }) => {
  return (
    <div className="info-widget">
      <div className="icon-container">{Icon && <Icon size={24} />}</div>
      <div className="info-content">
        <h3>{infotitle}</h3>
        <h3>{info}</h3>
      </div>
    </div>
  );
};

export default InformationWidget;
