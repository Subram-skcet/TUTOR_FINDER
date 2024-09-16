import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to install axios using npm or yarn
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import './RegisterStudent.css'


const RegisterStudent = () => {
  const [{ logged,asStudent,logged_as }, dispatch] = useDataLayerValue();
  const regbtnstyle = {
    width: 'max-content',
    display: 'block',
    marginInline: 'auto'
  };
  useEffect(()=>{
      console.log("State updated successfully", logged_as);
  },[logged_as])

  const [userDetails, setDetails] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/auth/registerstudent', userDetails);
      console.log('User registered successfully:', response.data);

      const studentDetails = response.data.student;
      // Optionally, clear form or redirect after successful registration
      dispatch({
        type: "LOG_USER",
        payload: true
      });

      dispatch({
        type: "SET_STUDENT",
        payload: studentDetails
      });

      dispatch(
        {
          type:"LOGGED_USER",
          payload:'student'
        }
      )
      
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className='student-signp-wrap'>
    <div>
        <h1>Sign up to your EduQuest account</h1>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <div className='space-div'>
          <label>Name:</label>
          <input type='text' name='name' id='name' value={userDetails.name} onChange={handleChange} required />
        </div>
        <div className='space-div'>
          <label>Email:</label>
          <input type='email' name='email' id='email' value={userDetails.email} onChange={handleChange} required />
        </div>
        <div className='space-div'>
          <label>Password:</label>
          <input type='password' name='password' id='password' value={userDetails.password} onChange={handleChange} required />
        </div>
        <div className='submit-btn-div'>
          <button type='submit' className='submit-btn' style={regbtnstyle}>Register</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default RegisterStudent;
