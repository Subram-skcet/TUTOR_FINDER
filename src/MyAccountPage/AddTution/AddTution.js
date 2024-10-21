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

  const [errorText,setErrorText] = useState('Error Text')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const HandleSubjectSelect = (e) => {
    const selectedSubject = e.target.value;
    if (!TutionDetails.Subjects.includes(selectedSubject)) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        Subjects: [...prevDetails.Subjects, selectedSubject],
      }));
    }
  };

  const HandleSubjectRemove = (subjectToRemove) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      Subjects: prevDetails.Subjects.filter((subject) => subject !== subjectToRemove),
    }));
  };

  const HandleBoardSelect = (e) => {
    const selectedBoard = e.target.value;
    if (!TutionDetails.Boards.includes(selectedBoard)) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        Boards: [...prevDetails.Boards, selectedBoard],
      }));
    }
  };

  const HandleBoardRemove = (boardToRemove) => {
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
         setErrorText("PLease choose atleast one board")
         return false
       }

       const srt12 = convertTo12Hour(TutionDetails.startTime)
       const end12 = convertTo12Hour(TutionDetails.endTime)

       console.log(srt12, end12);
       console.log("Fucking HYpocrite");

       return false;
       
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Entered");
    const tuitionValidated = ValidateTuition();

    if(tuitionValidated){
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
  
        if(response.status === 201){
           toast.success('Tuition created successfully')
           navigate('/myaccount/teacherprofile/mytutions');
        }
        
      } catch (error) {
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
              {subjects.map((subject) => (
                <option value={subject.value}>{subject.label}</option>
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
               {boards.map((board) => (
                <option value={board.value}>{board.value}</option>
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

        <div className="create-button">
          <div className="submit-tuition" type="submit">
            <PostAddIcon />
            <p>Create Tuition</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTution;
