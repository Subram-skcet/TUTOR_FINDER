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


const convertTo12Hour = (time24) => {
  let [hours, minutes] = time24.split(':'); 

  hours = parseInt(hours);

  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; 

  const time12 = `${hours}:${minutes} ${ampm}`;
  return time12;
}

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
      const startTime12Hour = convertTo12Hour(TutionDetails.startTime);
      const endTime12Hour = convertTo12Hour(TutionDetails.endTime);

      console.log(startTime12Hour,endTime12Hour);

      console.log(TutionDetails);
      try {
        const response = await axios.post('/api/v1/tution/', {
          createdBy: asTeacher._id,
          subjects: TutionDetails.Subjects,
          duration: [startTime12Hour, endTime12Hour],
          days: [TutionDetails.startDay, TutionDetails.endDay],
          standard: [TutionDetails.startStd, TutionDetails.endStd],
          fees: TutionDetails.Fees,
          boards: TutionDetails.Boards,
        });
  
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
      <div>
         <h1 className='lato-bold'>Create Tuition</h1>
      </div>
      <form className="create-tuition-form" onSubmit={handleSubmit}>
        
        <div className="list-container">
          <div className='list-header-flx'>
            <label className="poppins-font">Select Subject</label>
            <select onChange={HandleSubjectSelect} className='create-tuition-select'>
              <option value="">Select a subject</option>
              {asTeacher.subjects.map((subject,index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
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
            <select onChange={HandleBoardSelect} className='create-tuition-select' aria-placeholder='Select boards '>
              <option value=''>Select boards</option>
               {boards.map((board,index) => (
                <option key={index} value={board.value}>{board.value}</option>
              ))}
            </select>
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
              <select value={TutionDetails.startDay} name="startDay" onChange={handleChange}>
              {daysOfWeek.map((day) => (
                <option value={day.value}>{day.value}</option>
              ))}
              </select>
            </div>
            <div className='header-flx'>
              <label>To:</label>
              <select value={TutionDetails.endDay} name="endDay" onChange={handleChange}>
                {daysOfWeek.map((day) => (
                  <option value={day.value}>{day.value}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="poppins-font">Standard:</label>
            </div>
          <div className='header-flx'>
            <label>Start Class:</label>
            <select 
            value={TutionDetails.startStd}
             name="startStd" 
             onChange={handleChange}
             className='create-tuition-select'
             required
             >
              {standards.map((std) => (
                <option value={std.value}>{std.value}</option>
              ))}
            </select>
          </div>
          <div className='header-flx'>
            <label>End Class:</label>
            <select value={TutionDetails.endStd} name="endStd" onChange={handleChange} className='create-tuition-select'>
              {standards.map((std) => (
                <option value={std.value}>{std.value}</option>
              ))}
            </select>
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

        <button className="create-button" type="submit">
          <div className="submit-tuition">
            <PostAddIcon />
            <p>Create Tuition</p>
          </div>
        </button>
      </form>
    </div>
  );
};

export default AddTution;
