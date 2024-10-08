// src/AddTution.js

import React, { useState } from 'react';
import SelectedSubject from './Subjects';
import './AddTution.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../../StateProviders/StateProvider'; // Import the StateProvider hook
import axios from 'axios';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { subjects } from '../../components/stateExporter';
import { toast } from 'react-toastify';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="create-tuition-container">
      <div>
         <h1 className='lato-bold'>Create Tuition</h1>
      </div>
      <form className="create-tuition-form">
        
        <div className="list-container">
          <div className='header-flx'>
            <label className="poppins-font">Select Subject</label>
            <select onChange={HandleSubjectSelect} className='create-tuition-select'>
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option value={subject.value}>{subject.label}</option>
              ))}
            </select>
          </div>
          <div className="selected-items">
            {TutionDetails.Subjects.map((subject) => (
              <SelectedSubject key={subject} Subject={subject} delFunction={HandleSubjectRemove} />
            ))}
          </div>
        </div>

        <div className="list-container">
          <div className='header-flx'>
            <label className="poppins-font">Select Boards</label>
            <select onChange={HandleBoardSelect} className='create-tuition-select'>
              <option value="">Select a board</option>
              <option value="CBSE">CBSE</option>
              <option value="State Board">State Board</option>
              <option value="ICSE">ICSE</option>
            </select>
          </div>
          <div className="selected-items">
            {TutionDetails.Boards.map((board) => (
              <SelectedSubject key={board} Subject={board} delFunction={HandleBoardRemove} />
            ))}
          </div>
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
              />
            </div>
            <div className='header-flx'>
              <label>End Time:</label>
              <input type="time" name="endTime" value={TutionDetails.endTime} onChange={handleChange} />
            </div>

            <div>
              <label className="poppins-font">Days:</label>
            </div>
            <div className='header-flx'>
              <label>From:</label>
              <select value={TutionDetails.startDay} name="startDay" onChange={handleChange}>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div className='header-flx'>
              <label>To:</label>
              <select value={TutionDetails.endDay} name="endDay" onChange={handleChange}>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
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
             >
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
              <option value="VII">VII</option>
              <option value="VIII">VIII</option>
              <option value="IX">IX</option>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
            </select>
          </div>
          <div className='header-flx'>
            <label>End Class:</label>
            <select value={TutionDetails.endStd} name="endStd" onChange={handleChange} className='create-tuition-select'>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
              <option value="VII">VII</option>
              <option value="VIII">VIII</option>
              <option value="IX">IX</option>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
            </select>
          </div>

        </div>
        <div className='header-flx'>
           <label className="poppins-font">Fees:</label>

                <input type="number" name="Fees" value={TutionDetails.Fees} onChange={handleChange} className='fees-input'/>
        </div>

      </form>
      <div className="create-button">
        <div className="submit-tuition" onClick={handleSubmit}>
          <PostAddIcon />
          <p>Create Tuition</p>
        </div>
      </div>
    </div>
  );
};

export default AddTution;
