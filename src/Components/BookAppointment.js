import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './BookAppointment.css'

export default function BookAppointment() {
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedTimeSlot, setTimeslot] = useState('');
    const [doctors,setDoctors]=useState(''); 
    const [appdate,setappdate] = useState('');
    const [fee,setfee] = useState(500);
    const param = useParams();

    const GetDocURl = "http://localhost:5089/api/Doctors/GetDoctorBySpecialization/";
    const appUrl = "http://localhost:5089/api/Appointments/create";
    var dept = '';

    // Array of departments (you can fetch this from an API or other source)
    const departments = ['Dental care', 'Cardiology', 'Gyneacology', 'Neurology','Physiotherapy','ENT','General Surgey'];
    const timeslot = ['9:30-10:30','10:30-11:30','2:30-3:30','3:30-4:30']
  
    // Event handler for dropdown change
    const handleDepartmentChange = (e) => {
      setSelectedDepartment(e.target.value);
      dept = e.target.value;
      getDoctors();
    };

    const timeSlothandle = (e) => {
        setTimeslot(e.target.value);
    }

    const setdate = (e) => {
        setappdate(e.target.value);
    }


  const getDoctors=async ()=>{
  try{
   const response = await axios.get(GetDocURl+dept );
      setDoctors(response.data);
      console.log(response.data);
      // getDoctors();
    }catch(error){
        console.log(error);
        console.log(GetDocURl+selectedDepartment); 
  }
    }


    const Postbookeddata = async () =>{

        try{
            const response = await axios.post(appUrl,{
                appointmentdate : appdate,
                doctorId : doctors.dId,
                patientId : param.id,
                time_slot: selectedTimeSlot,
                appointment_Fee : fee

            });
               setDoctors(response.data);
               console.log(response.data);
               // getDoctors();
             }catch(error){
                 console.log(error);
                 console.log(GetDocURl+selectedDepartment); 
           }
    }
  return (
    <div>



<div className="container">
  <label className="form-label" htmlFor="department">Select Department:</label>
  <select className="form-input" id="department" value={selectedDepartment} onChange={handleDepartmentChange}>
    <option value="">Select...</option>
    {departments.map((department) => (
      <option key={department} value={department}>
        {department}
      </option>
    ))}
  </select>

  {/* Display the selected department */}
  {selectedDepartment && (
    <div className="appointment-details">
      <form onSubmit={Postbookeddata}>
        <ul className="appointment-info">
          <li>{doctors.dName}</li>
          <li>{doctors.age}</li>
          <li>{doctors.specialization}</li>
          <li>
            <label className="form-label" htmlFor="timeSlot">Select Slot:</label>
            <select className="form-input" id="timeSlot" value={selectedTimeSlot} required onChange={timeSlothandle}>
              <option value="">Select...</option>
              {timeslot.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </li>
          <li>
            <label className="form-label" htmlFor="fee">Fee:</label>{"        "}
            <input className="form-input" type="text" value={fee} readOnly />
          </li>
          <li>
            <label className="form-label" htmlFor="appDate">Select Date:</label>
            <input className="form-input" type="date" required value={appdate} onChange={setdate} />
          </li>
        </ul>
        <button className="form-button" type="submit">Book</button>
      </form>
    </div>
  )}
</div>

      


      {/* <div>
      <label htmlFor="department">Select Department:</label>
      <select id="department" value={selectedDepartment} onChange={handleDepartmentChange}>
        <option value="">Select...</option>
        {departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
      

     
      {selectedDepartment && <div>

        <form onSubmit={Postbookeddata}>
        <ul>
            <li>{doctors.dName}</li>
            <li>{doctors.age}</li>
            <li>{doctors.specialization}</li>
            <li>
            <label htmlFor="department">Select Slot:</label>
            <select id="department" value={selectedTimeSlot} required onChange={timeSlothandle}>
            <option value="">Select...</option>
            {timeslot.map((time) => (
            <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
            </li>
            <label htmlFor="department">Fee:</label>{"        "}
            <input type = 'text' value = {fee} ></input><br></br>

            <label htmlFor="department">Select Date:</label>

            <li>
                <input type = 'date' required value = {appdate} onChange={setdate}></input>
            </li>
        </ul>
        <button type = 'submit'> Book</button>
        </form>
        </div>}
       
    </div> */}

    </div>
  );
}
