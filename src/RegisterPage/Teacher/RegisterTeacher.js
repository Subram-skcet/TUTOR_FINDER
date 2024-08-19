import React, { useState, useEffect } from 'react';
import './RegisterTeacher.css';
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import { useNavigate } from 'react-router-dom';
import SelectedSubject from '../../MyAccountPage/AddTution/Subjects';
import axios from 'axios';
import { stateDistricts,subjects } from '../../components/stateExporter'

const RegisterTeacher = () => {
  const navigate = useNavigate();
  const [{ logged }, dispatch] = useDataLayerValue();
  const [teacherDetails, setDetails] = useState({
    name: '',
    email: '',
    password: '',
    mobileno: '',
    qualification: '',
    subjects:[],
    state: '',
    district: '',
    year_of_exp: 0,
  });

  useEffect(() => {
    console.log("Here you gooooo", logged);
  }, [logged]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let setTeacher;
    try {
      const response = await axios.post('http://localhost:3001/api/v1/auth/registerteacher',teacherDetails );
       setTeacher = response.data.teacher
      console.log("Here the response = " , setTeacher);
    } catch (error) {
      console.error('Error sending data:', error);
    }
    dispatch({ type: 'LOG_USER', logged: true });
    dispatch(
      {
        type:"SET_TEACHER",
        payload:setTeacher
      }
    )
    dispatch(
      {
        type:"LOGGED_USER",
        payload:'teacher'
      }
    )
    
    navigate("/myaccount/myprofile");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setDetails((prevDetails) => ({
      ...prevDetails,
      state: selectedState,
      district: '',
    }));
  };

  const HandleSubjectSelect = (e) => {
    const selectedSubject = e.target.value;
    if (!teacherDetails.subjects.includes(selectedSubject)) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        subjects: [...prevDetails.subjects, selectedSubject],
      }));
    }
  };

  const HandleSubjectRemove = (subjectToRemove) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      subjects: prevDetails.subjects.filter((subject) => subject !== subjectToRemove),
    }));
  };

  const districts = stateDistricts[teacherDetails.state] || [];

  return (
    <div className='teacher-signup-wrap'>
      <div>
        <h1>Create your Teacher account in EduQuest</h1>
      </div>

    <div className='teacher-reg-wrap'>
      <form>
        <div className='space-div'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            id='name'
            value={teacherDetails.name}
            onChange={handleChange}
            required
            />
        </div>
        <div className='space-div'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            name='email'
            id='email'
            value={teacherDetails.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='space-div'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            id='password'
            value={teacherDetails.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='space-div'>
          <label htmlFor='mobileno'>Mobile No:</label>
          <input
            type='tel'
            name='mobileno'
            id='mobileno'
            value={teacherDetails.mobileno}
            onChange={handleChange}
            required
            />
        </div>
        <div className='space-div'>
          <label htmlFor='qualification'>Highest Qualification:</label>
          <select
            name='qualification'
            id='qualification'
            value={teacherDetails.qualification}
            onChange={handleChange}
          >
            <option value=''>Select</option>
            <option value='B.E'>B.E</option>
            <option value='M.E'>M.E</option>
            <option value='B.Sc'>B.Sc</option>
            <option value='M.Sc'>M.Sc</option>
          </select>
        </div>
        <div className='space-div'>
          <label htmlFor='yoexp'>Year Of Experience:</label>
          <input
            type='number'
            name='year_of_exp'
            id='year_of_exp'
            value={teacherDetails.year_of_exp}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-div">
          <label>Select Subjects you teach</label>
          <select onChange={HandleSubjectSelect}>
            <option value="">Select a subject</option>
            {subjects.map((subject)=>
            <option value={subject.value}>{subject.label}</option>
            )}
          </select>
          <div className="selected-items">
            {teacherDetails.subjects.map((subject) => (
              <SelectedSubject key={subject} Subject={subject} delFunction={HandleSubjectRemove} />
            ))}
          </div>
        </div>
        <div className='space-div'>
          <label htmlFor='inputState'>Select State:</label>
          <select
            name='state'
            id='inputState'
            value={teacherDetails.state}
            onChange={handleStateChange}
          >
            <option value=''>Select State</option>
            {Object.keys(stateDistricts).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className='space-div'>
          <label htmlFor='inputDistrict'>Select District:</label>
          <select
            name='district'
            id='inputDistrict'
            value={teacherDetails.district}
            onChange={handleChange}
            disabled={!teacherDetails.state}
            >
            <option value=''>-- select one --</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <div className='submit-btn-div'>
          <button
            type='submit'
            className='submit-btn'
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default RegisterTeacher;
