import React, { useEffect, useState } from 'react';
import './EmployeeTeamContent.css';
import EmployeeService from '../../../services/employeeService';
import { useSelector } from 'react-redux';

const EmployeeTeamContent = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const userData = useSelector((state)=>state.userData)
  const fetchTeamEmployees = async () => {
    try {
      const data = await EmployeeService.getEmployeeByTeamId(userData.teamId);
      setTeamMembers(data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  useEffect(() => {
    fetchTeamEmployees();
  }, []);

  return (
    <div className="team-container">
      <h2 className="team-heading">My Team Members</h2>
      <div className="team-table-wrapper">
        <table className="team-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Department</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.designation}</td>
                <td>{member.organizationEmail}</td>
                <td>{member.personalMobile}</td>
                <td>{member.departmentName || "N/A"}</td>
                <td>{member.roleName}</td>
                <td>
                  <span className={`status-badge ${member.status.toLowerCase()}`}>
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
            {teamMembers.length === 0 && (
              <tr>
                <td colSpan="7" className="no-data">No team members found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTeamContent;
