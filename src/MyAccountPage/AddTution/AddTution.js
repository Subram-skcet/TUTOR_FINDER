// src/AddTution.js

import React, { useEffect, useState } from 'react';
import SelectedSubject from './Subjects';
import './AddTution.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../../StateProviders/StateProvider'; // Import the StateProvider hook
import axios from 'axios';
import {daysOfWeek,boards,standards } from '../../components/stateExporter';
import { toast } from 'react-toastify';
import { FaArrowLeft } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import Modal from '../../components/Modal/Modal';
import MapComponent from '../../components/TeacherMap/AMapSample';
import { isTimeAfter } from '../../utils/isTimeAfter';
import { isRomanAfter } from '../../utils/isRomanAfter';
import { BiCurrentLocation } from "react-icons/bi";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdWarningAmber } from "react-icons/md";



const AddTution = () => {
  const navigate = useNavigate();
  const [{ asTeacher }, dispatch] = useDataLayerValue(); // Get createdBy id from StateProvider

  const [TutionDetails, setDetails] = useState({
    Subjects: [],
    startTime: '',
    endTime: '',
    startStd: 'I',
    endStd: 'I',
    startDay: 'Monday',
    endDay: 'Monday',
    Fees: 0,
    Boards: []
  });

  const [errorText,setErrorText] = useState('')
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [isMapOpen,setMapOpen] = useState(false)

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setErrorText('');
        },
        (err) => {
          setErrorText(err.message);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setErrorText("Geolocation is not supported by this browser.");
    }
  };

  useEffect(()=>{
       console.log(location.lat , location.lng);
       
  },[location])

  const handleChange = (e) => {
    if(errorText)
       setErrorText('')
    const { name, value } = e.target;
    let sanitizedValue = value;

    if (name === "Fees") {
        sanitizedValue = value.replace(/[^0-9]/g, ""); // Sanitize input for 'fees'
    }

    setDetails((prevDetails) => ({
        ...prevDetails,
        [name]: sanitizedValue, // Use sanitized value
    }));
};

  const HandleSubjectSelect = (e) => {
    if(errorText){
      setErrorText('')
    }
    const selectedSubject = e.target.value;
    if (selectedSubject.length > 0 && !TutionDetails.Subjects.includes(selectedSubject)) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        Subjects: [...prevDetails.Subjects, selectedSubject],
      }));
    }
  };

  const HandleSubjectRemove = (subjectToRemove) => {
    if(errorText){
      setErrorText('')
    }
    setDetails((prevDetails) => ({
      ...prevDetails,
      Subjects: prevDetails.Subjects.filter((subject) => subject !== subjectToRemove),
    }));
  };

  const HandleBoardSelect = (e) => {
    if(errorText){
      setErrorText('')
    }
    const selectedBoard = e.target.value;
    if (selectedBoard.length>0 && !TutionDetails.Boards.includes(selectedBoard)) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        Boards: [...prevDetails.Boards, selectedBoard],
      }));
    }
  };

  const HandleBoardRemove = (boardToRemove) => {
    if(errorText){
      setErrorText('')
    }
    setDetails((prevDetails) => ({
      ...prevDetails,
      Boards: prevDetails.Boards.filter((board) => board !== boardToRemove),
    }));
  };

  const setLatLngfromChd = (lat,lng) =>{
    setLocation({
      lat,lng
    })
  }


const navigateBack = () =>{
    navigate('/myaccount/teacherprofile/mytutions')
}

  const ValidateTuition = () =>{
      if(TutionDetails.startTime.length === 0 || TutionDetails.endTime.length === 0 || !TutionDetails.Fees || !location.lat  || !location.lng){
        setErrorText("Please fill in all the fields.")
        return false;
      }

       if(TutionDetails.Subjects.length === 0){
         setErrorText("Select at least one subject from the list.")
         return false
       }

       if(TutionDetails.Boards.length === 0){
         setErrorText("Choose at least one board from the list.")
         return false
       }


       if(!isTimeAfter(TutionDetails.endTime,TutionDetails.startTime)){
         setErrorText("End time must be greater than the start time.")
         return false
       }

       if(!isRomanAfter(TutionDetails.startStd,TutionDetails.endStd)){
         setErrorText("End standard must not precede the start standard.")
         return false
       }

       if(TutionDetails.Fees < 0){
        setErrorText("Tuition Fees cannot be less than zero")
        return false
       }
       return true;   
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Entered");
    const tuitionValidated = ValidateTuition();

    if(tuitionValidated){

      console.log(TutionDetails);
      try {
        const response = await axios.post('/api/v1/tution/', {
          createdBy: asTeacher._id,
          subjects: TutionDetails.Subjects,
          duration: [TutionDetails.startTime, TutionDetails.endTime],
          days: [TutionDetails.startDay, TutionDetails.endDay],
          standard: [TutionDetails.startStd, TutionDetails.endStd],
          fees: TutionDetails.Fees,
          boards: TutionDetails.Boards,
          location:[location.lat,location.lng]
        });
        console.log(response);
        
  
        if(response.status === 201){
           toast.success('Tuition created successfully')
           navigate('/myaccount/teacherprofile/mytutions');
        }
        
      } catch (error) {
        if(error.response && error.response.data.message)
            toast.error(error.response.data.message)
        else
          toast.error('Error creating tuition ,try again later')
      }
    }
  };

  return (
    <>
      <Modal childrenWidth={400}  isopen={isMapOpen} onClose={()=>setMapOpen(false)}>
        <MapComponent setLatLng = {setLatLngfromChd}/>
      </Modal>
    <div className="create-tuition-container lato-regular">
      <div className='arrow-nav' onClick={navigateBack}>
        <FaArrowLeft size="1.8em"/>
      </div>
      <div>
         <h1 className='lato-bold'>Create Tuition</h1>
      </div>
      <form className="create-tuition-form" onSubmit={handleSubmit}>
        
        <div className="list-container">
          <div className='list-header-flx'>
            <label className="lato-bold">Select Subjects:</label>
            <div className='select-container crt-tut-sl-cntr'>
            <select onChange={HandleSubjectSelect} className='create-tuition-select select-box lato-regular'>
              <option value="">Select</option>
              {asTeacher.subjects.map((subject,index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
            <div className='drp-icon'>
              <IoMdArrowDropdown size="1.6em"/>
            </div>
              </div>
          </div>
          {
            TutionDetails.Subjects.length !== 0 ? 
            <div className="selected-items at-gp">
            {TutionDetails.Subjects.map((subject) => (
              <SelectedSubject key={subject} Subject={subject} delFunction={HandleSubjectRemove} />
            ))}
          </div>
            :
            <></>
          }
        </div>

        <div className="list-container">
          <div className='list-header-flx'>
            <label className="lato-bold">Select Boards:</label>
            <div className='select-container crt-tut-sl-cntr'>
            <select onChange={HandleBoardSelect} className='create-tuition-select select-box lato-regular' aria-placeholder='Select boards '>
              <option value=''>Select</option>
               {boards.map((board,index) => (
                 <option key={index} value={board}>{board}</option>
                ))}
            </select>
            <div className='drp-icon'>
              <IoMdArrowDropdown size="1.6em"/>
            </div>
            </div>
          </div>
          {
            TutionDetails.Boards.length !== 0 ?
            <div className="selected-items at-gp">
              {TutionDetails.Boards.map((board) => (
                <SelectedSubject key={board} Subject={board} delFunction={HandleBoardRemove} />
              ))}
            </div>
            :
            <></>
          }
        </div>
        <div className='grid-columns'>

            <div>
              <label className="lato-bold">Duration:</label>
            </div>
            <div className='header-flx'>
              <label>Start Time:</label>
              <input 
                 type="time"
                 name="startTime"
                 value={TutionDetails.startTime}
                 onChange={handleChange}
                 required
                 className='time-tg-styl lato-regular'
                 />
            </div>
            <div className='header-flx'>
              <label>End Time:</label>
              <input type="time" name="endTime" className='time-tg-styl lato-regular' value={TutionDetails.endTime} onChange={handleChange} required />
            </div>

            <div>
              <label className="lato-bold">Days:</label>
            </div>
            <div className='header-flx'>
              <label>From:</label>
              <div className='select-container dys-slt-cntr'>

              <select value={TutionDetails.startDay} name="startDay" onChange={handleChange} className='select-box lato-regular'>
              {daysOfWeek.map((day) => (
                <option value={day}>{day}</option>
              ))}
              </select>
              <div className='drp-icon dt-drp'>
              <IoMdArrowDropdown size="1.6em"/>
              </div>
              </div>
            </div>
            <div className='header-flx'>
              <label>To:</label>
              <div className='select-container dys-slt-cntr'>

              <select value={TutionDetails.endDay} name="endDay" onChange={handleChange} className='select-box lato-regular'>
                {daysOfWeek.map((day) => (
                  <option value={day}>{day}</option>
                ))}
              </select>
              <div className='drp-icon dt-drp'>
              <IoMdArrowDropdown size="1.6em"/>
              </div>
                </div>
            </div>

            <div>
              <label className="lato-bold">Standard:</label>
            </div>
          <div className='header-flx'>
            <label>Start Class:</label>
            <div className='select-container std-select-tag'>

            <select 
            value={TutionDetails.startStd}
            name="startStd" 
            onChange={handleChange}
            className=' select-box lato-regular std-slt-cntr'
            required
            >
              {standards.map((std) => (
                <option value={std}>{std}</option>
              ))}
            </select>
            <div className='drp-icon std-drp'>
              <IoMdArrowDropdown size="1.6em"/>
              </div>
              </div>
          </div>
          <div className='header-flx'>
            <label>End Class:</label>
            <div className='select-container std-select-tag'>

            <select value={TutionDetails.endStd} name="endStd" onChange={handleChange} className=' select-box lato-regular std-slt-cntr'>
              {standards.map((std) => (
                <option value={std}>{std}</option>
              ))}
            </select>
              <div className='drp-icon std-drp'>
                <IoMdArrowDropdown size="1.6em"/>
              </div>
              </div>
          </div>

        </div>
        
        <div className='nrm-header-flx'>
           <label className="lato-bold">Fees:</label>
           <div className='fee-inp-div'>
                <FaRupeeSign/>
                <input type="text" name="Fees" value={TutionDetails.Fees} onChange={handleChange} className='fees-input-styl lato-regular' required/>
           </div>
        </div>

        <div className='nrm-header-flx crt-tut-loc-div'>
              <label className="lato-bold">Location:</label>
              {
                (!location.lat || !location.lng)?
                  <div className='location-choose-btn'>
                             <button className="see-loc-btn lato-bold loc-clr" onClick={getLocation}>
                               <div className='see-loc-div'>
                                 <BiCurrentLocation size="1.3em"/>
                                 <p>Set Current location</p>
                               </div> 
                               </button>
                             or
                             <button className="see-loc-btn lato-bold loc-clr" onClick={()=> setMapOpen(true)}>
                               <div className='see-loc-div'>
                                 <FaMapLocationDot size="1.3em"/>
                                 <p>Choose on Map</p>
                               </div> 
                               
                               </button>
                           </div>
                :
                <div className='loc-ad-div'>
                    <div className='loc-ad-ic'>
                        <IoMdCheckmarkCircle size="1.3em"/>
                    </div>
                        <p>Location added</p>
                     <button className='lato-bold chg-btn' onClick={()=>{ setLocation({ lat: null, lng: null});}}>Change</button>
                </div>
              }
        </div>

        {errorText && 
                    <div className='error-para-div er-streg'>
                         <div className='amber-icon'>
                             <MdWarningAmber size="1.3em"/>
                         </div>
                        <p className='errorText'>{errorText}</p>
                    </div>
        }

      <button className='edit-prof-btn spz tut-crt-btn' type='submit'>
          <div className='itms-cntr style-links-updated ed-bck lato-regular'>
             <MdOutlinePostAdd size="1.45em"/>
                  <p>Create</p>
          </div>
      </button>
      </form>
    </div>
        </>
  );
};

export default AddTution;
