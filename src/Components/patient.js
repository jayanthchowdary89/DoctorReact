import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./doctorlog.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
 
 
const PatientDataTable = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const GetPatURl = "http://localhost:5089/api/Patients/GetCurrent";

 
  useEffect(() => {
    getPatients();
  }, []);
 
  async function getPatients() {

    const token = localStorage.getItem("jwtToken")
    try {
      const response = await axios.get(GetPatURl,{
        headers:{
          'Authorization' : `Bearer ${token}`
        }

      });
      console.log(response.data);
      setPatients(response.data);
      console.log(patients.pId);
      console.log(patients.email);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
 
  async function logoutalert() {
    var result = window.confirm("Are you sure you want to log out");
   
    if (result) {
      navigate("/");
    } else {
      navigate("/patientPage");
    }
  }
 
  return (
    <div class="patlogbody">
      {/* {patients.map((patients) => ( */}
        <div class="patlogcontaining">
 
            <div class="patlognavbar">
              {/* <li><a href="#">Home</a></li> */}
              <li><Link to ={"/PatientProfile/" + patients.p_UserId}>My Profile</Link></li>
              <li><Link to={"/myappointmentPat/"+patients.pId}>My Appointments</Link></li>
              <li><Link to={"/history/" + patients.p_UserId}>My medical history</Link></li>
              <li><Link to={"/pupdate/" + patients.pId}>Update</Link></li>
              <li><Link to={"/BookAppointment/" + patients.pId}>Book Appointment</Link></li>
              <li><a onClick={logoutalert}>Log Out</a></li>
            </div>
           
          {/* <div className="patlogcontent">
            <h3><strong>Hello {patients.pName}!</strong></h3><br></br>
            <h5>Age</h5>
            <p>{patients.age}</p><br></br>
            <h5>Gender</h5>
            <p>{patients.gender}</p><br></br>
            <h5>DateofBirth</h5>
            <p>{patients.dob}</p>
 
          </div> */}
 
        </div>
      {/* ))} */}
    </div>
  );
};
 
export default PatientDataTable;