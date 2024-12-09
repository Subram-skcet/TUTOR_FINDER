// src/AddTution.js

import React, { useState } from 'react';
import SelectedSubject from './Subjects';
import './AddTution.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../../StateProviders/StateProvider'; // Import the StateProvider hook
import axios from 'axios';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { subjects,daysOfWeek,boards,standards } from '../../components/stateExporter';
import { toast } from 'react-toastify';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { FaArrowLeft } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";



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
    Fees: '',
    Boards: [],
  });

  const [errorText,setErrorText] = useState('')

  const handleChange = (e) => {
    if(errorText){
      setErrorText('')
    }
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const HandleSubjectSelect = (e) => {
    if(errorText){
      setErrorText('')
    }
    const selectedSubject = e.target.value;
    if (!TutionDetails.Subjects.includes(selectedSubject)) {
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
    if (!TutionDetails.Boards.includes(selectedBoard)) {
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


function isTimeAfter(time1, time2) {
  const today = new Date().toISOString().slice(0, 10);
  const date1 = new Date(`${today}T${time1}`);
  const date2 = new Date(`${today}T${time2}`);

  return date1 > date2; // Compare if time1 is after time2
}

function isRomanAfter(roman1, roman2) {
  const romanToInt = {
    I: 1,
    II: 2,
    III: 3,
    IV: 4,
    V: 5,
    VI: 6,
    VII: 7,
    VIII: 8,
    IX: 9,
    X: 10,
    XI: 11,
    XII: 12
  };

  return romanToInt[roman1] <= romanToInt[roman2]; // Compare if roman1 is after roman2
}


const navigateBack = () =>{
    navigate('/myaccount/teacherprofile/mytutions')
}

  const ValidateTuition = () =>{
      if(TutionDetails.startTime.length === 0 || TutionDetails.endTime.length === 0 || !TutionDetails.Fees.trim()){
        setErrorText("Please fill all fields")
        return false;
      }

       if(TutionDetails.Subjects.length === 0){
         setErrorText("Please choose atleast one subjects")
         return false
       }

       if(TutionDetails.Boards.length === 0){
         setErrorText("Please choose atleast one board")
         return false
       }

       if(!isTimeAfter(TutionDetails.endTime,TutionDetails.startTime)){
         setErrorText("End Time cannot be less than or equal to start Time")
         return false
       }

       if(!isRomanAfter(TutionDetails.startStd,TutionDetails.endStd)){
         setErrorText("End Standard cannnot come between Start Standard")
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
    <div className="create-tuition-container">
      <div className='arrow-nav' onClick={navigateBack}>
        <FaArrowLeft size="1.8em"/>
      </div>
      <div>
         <h1 className='lato-bold'>Create Tuition</h1>
      </div>
      <form className="create-tuition-form" onSubmit={handleSubmit}>
        
        <div className="list-container">
          <div className='list-header-flx'>
            <label className="poppins-font">Select Subject</label>
            <div className='select-container crt-tut-sl-cntr'>
            <select onChange={HandleSubjectSelect} className='create-tuition-select select-box'>
              <option value="">Subjects</option>
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
            <label className="poppins-font">Select Boards</label>
            <div className='select-container'>
            <select onChange={HandleBoardSelect} className='create-tuition-select select-box' aria-placeholder='Select boards '>
              <option value=''>Boards</option>
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
              <label className="poppins-font">Duration:</label>
            </div>
            <div className='header-flx'>
              <label>Start Time:</label>
              <input 
                 type="time"
                 name="startTime"
                 value={TutionDetails.startTime}
                 onChange={handleChange}
                 required
              />
            </div>
            <div className='header-flx'>
              <label>End Time:</label>
              <input type="time" name="endTime" value={TutionDetails.endTime} onChange={handleChange} required />
            </div>

            <div>
              <label className="poppins-font">Days:</label>
            </div>
            <div className='header-flx'>
              <label>From:</label>
              <div className='select-container'>

              <select value={TutionDetails.startDay} name="startDay" onChange={handleChange} className='select-box'>
              {daysOfWeek.map((day) => (
                <option value={day}>{day}</option>
              ))}
              </select>
              <div className='drp-icon'>
              <IoMdArrowDropdown size="1.6em"/>
              </div>
              </div>
            </div>
            <div className='header-flx'>
              <label>To:</label>
              <div className='select-container'>

              <select value={TutionDetails.endDay} name="endDay" onChange={handleChange} className='select-box'>
                {daysOfWeek.map((day) => (
                  <option value={day}>{day}</option>
                ))}
              </select>
              <div className='drp-icon'>
              <IoMdArrowDropdown size="1.6em"/>
              </div>
                </div>
            </div>

            <div>
              <label className="poppins-font">Standard:</label>
            </div>
          <div className='header-flx'>
            <label>Start Class:</label>
            <div className='select-container'>

            <select 
            value={TutionDetails.startStd}
            name="startStd" 
            onChange={handleChange}
            className='create-tuition-select select-box'
            required
            >
              {standards.map((std) => (
                <option value={std}>{std}</option>
              ))}
            </select>
            <div className='drp-icon'>
              <IoMdArrowDropdown size="1.6em"/>
              </div>
              </div>
          </div>
          <div className='header-flx'>
            <label>End Class:</label>
            <div className='select-container'>

            <select value={TutionDetails.endStd} name="endStd" onChange={handleChange} className='create-tuition-select select-box'>
              {standards.map((std) => (
                <option value={std}>{std}</option>
              ))}
            </select>
              <div className='drp-icon'>
                <IoMdArrowDropdown size="1.6em"/>
              </div>
              </div>
          </div>

        </div>
        <div className='header-flx'>
           <label className="poppins-font">Fees:</label>
                <input type="number" name="Fees" value={TutionDetails.Fees} onChange={handleChange} className='fees-input' required/>
        </div>

        {errorText && 
                    <div className='error-para-div er-streg'>
                         <div className='amber-icon'>
                             <WarningAmberIcon/>
                         </div>
                        <p className='errorText'>{errorText}</p>
                    </div>
        }
      <button style={{all:"unset"}}>

        <div className="create-button" type="submit">
          <div className="submit-tuition">
            <PostAddIcon />
            <p>Create</p>
          </div>
        </div>
      </button>
      </form>
    </div>
  );
};

export default AddTution;
