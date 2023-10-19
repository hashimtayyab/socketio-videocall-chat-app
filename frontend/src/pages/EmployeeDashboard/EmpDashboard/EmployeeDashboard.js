import axios from "axios";
import React, { useEffect, useState } from "react";
// import { decodeToken } from "react-jwt";
import "./EmployeeDashboard.css";
// import { Card } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import SideNavBar from '../Sidebar/Sidebar';


function EmployeeDashboard() {
  const [employee, setEmployee] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const getEmployeeDetail = async () => {
      await axios
        .get(`http://localhost:4000/employee/${userId}/`)
        .then((response) => {
          setEmployee(response.data);
        });
    };
  getEmployeeDetail();
  }, []);


  return (
    <>
      {/* <h1>{employee.username} Dashboard</h1> */}
      <div className="dashboard">
        <div className="side-bar" style={{marginTop:'-5px', height: '91vh'}}>
        <SideNavBar  />
        </div>
      </div>
    </>
  );
}

export default EmployeeDashboard;
