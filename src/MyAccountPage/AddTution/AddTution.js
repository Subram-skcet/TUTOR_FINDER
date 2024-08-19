// src/AddTution.js

import React, { useState } from 'react';
import SelectedSubject from './Subjects';
import './AddTution.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../../StateProviders/StateProvider'; // Import the StateProvider hook
import axios from 'axios';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { subjects } from '../../components/stateExporter';

const AddTution = () => {
  const navigate = useNavigate();
  const [{ asTeacher }] = useDataLayerValue(); // Get createdBy id from StateProvider

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
      // const formattedSubjects = TutionDetails.Subjects.map(subject => subject.toLowerCase());
      // const formattedBoards = TutionDetails.Boards.map(board => board.toLowerCase());
  
      const response = await axios.post('http://localhost:3001/api/v1/tution/', {
        createdBy: asTeacher._id,
        subjects: TutionDetails.Subjects,
        duration: [TutionDetails.startTime, TutionDetails.endTime],
        days: [TutionDetails.startDay, TutionDetails.endDay],
        standard: [TutionDetails.startStd, TutionDetails.endStd],
        fees: TutionDetails.Fees,
        boards: TutionDetails.Boards,
      });
      console.log(response.data);
      navigate('/myaccount/teacherprofile/mytutions');
    } catch (error) {
      console.error('Error posting tuition details:', error);
    }
  };

  return (
    <div className="form-container">
      <h1>Add Tution</h1>
      <form className="add-tution-form">
        <div className="form-group">
          <label>Select Subject</label>
          <select onChange={HandleSubjectSelect}>
            <option value="">Select a subject</option>
            {subjects.map((subject)=>(
              <option value={subject.value}>{subject.label}</option>
            ))}
          </select>
          <div className="selected-items">
            {TutionDetails.Subjects.map((subject) => (
              <SelectedSubject key={subject} Subject={subject} delFunction={HandleSubjectRemove} />
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Board</label>
          <select name="boards" onChange={HandleBoardSelect}>
            <option value="">Select a board</option>
            <option value="CBSE">CBSE</option>
            <option value="State Board">State Board</option>
            <option value="ICSE">ICSE</option>
          </select>
          <div className="selected-items">
            {TutionDetails.Boards.map((board) => (
              <SelectedSubject key={board} Subject={board} delFunction={HandleBoardRemove} />
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Duration</label>
          <div className="time-inputs">
            <div>
              <label>Start Time:</label>
              <input type="time" name="startTime" value={TutionDetails.startTime} onChange={handleChange} />
            </div>
            <div>
              <label>End Time:</label>
              <input type="time" name="endTime" value={TutionDetails.endTime} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Fees:</label>
          <input type="number" name="Fees" value={TutionDetails.Fees} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Days:</label>
          <div className="day-select">
            <div>
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
            <div>
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
          </div>
        </div>

        <div className="form-group">
          <label>Standard:</label>
          <div className="std-select">
            <div>
              <label>Class From:</label>
              <select value={TutionDetails.startStd} name="startStd" onChange={handleChange}>
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
            <div>
              <label>Class To:</label>
              <select value={TutionDetails.endStd} name="endStd" onChange={handleChange}>
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
        </div>
      </form>
        <div className='add-tution-div'>
          {/* <button className='post-tution-btn' onClick={handleSubmit}> */}
            <div className='itms-cntr style-links-updated add-tut-bck' onClick={handleSubmit}>
              <PostAddIcon/>
              <p>Post Tution</p>
            </div>
          {/* </button> */}
        </div>
    </div>
  );
};

export default AddTution;
