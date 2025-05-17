import { useSelector } from "react-redux";
import "./EmployeeInformationWidget.css"

const EmployeeInformationWidget = () => {
    const userData = useSelector((state) => state.userData);
  return (
    <div className="attendance-details">
        <div className="attendance-row">
          <div className="attendance-detail">
            <label>Employee Name: </label>
            <span>{userData.name}</span>
          </div>
          <div className="attendance-detail">
            <label>Department: </label>
            <span>{userData.departmentName}</span>
          </div>
        </div>

        <div className="attendance-row">
          <div className="attendance-detail">
            <label>Office: </label>
            <span>{userData.officeName}</span>
          </div>
          <div className="attendance-detail">
            <label>Designation: </label>
            <span>{userData.designation}</span>
          </div>
        </div>
      </div>
  )
}

export default EmployeeInformationWidget