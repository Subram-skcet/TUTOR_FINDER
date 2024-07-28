import React, { useState, useEffect } from 'react';
import './RegisterTeacher.css';
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import { useNavigate } from 'react-router-dom';

const stateDistricts = {
  // ... (Your existing stateDistricts data)
};

const RegisterTeacher = () => {
  const navigate = useNavigate();
  const [{ logged }, dispatch] = useDataLayerValue();
  const [teacherDetails, setDetails] = useState({
    name: '',
    email: '',
    password: '',
    mobileno: '',
    qualification: '',
    state: '',
    city: '',
    yoexp: 0,
  });

  useEffect(() => {
    console.log("Here you gooooo", logged);
  }, [logged]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'LOG_USER', logged: true });
    console.log(teacherDetails);
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
      city: '',
    }));
  };

  const districts = stateDistricts[teacherDetails.state] || [];

  return (
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
            name='yoexp'
            id='yoexp'
            value={teacherDetails.yoexp}
            onChange={handleChange}
            required
          />
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
            name='city'
            id='inputDistrict'
            value={teacherDetails.city}
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
  );
};

export default RegisterTeacher;
