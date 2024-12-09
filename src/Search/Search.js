import React, { useState } from 'react';
import './Search.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { stateDistricts,subjects,boards,standards } from '../components/stateExporter';
import axios from 'axios';
import { IoMdArrowDropdown } from "react-icons/io";

const Search = ({ onSearch }) => {
  const [searchDetails, setDetails] = useState({
    name: '',
    subject: '',
    boards: '',
    state: '',
    district: '',
    std: ''
  });
  const [results, setResults] = useState([]);

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

  const location = useLocation();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = {};
    if (searchDetails.name) params.name = searchDetails.name;
    if (searchDetails.subject) params.subjects = searchDetails.subject;
    if (searchDetails.boards) params.boards = searchDetails.boards;
    if (searchDetails.state) params.state = searchDetails.state;
    if (searchDetails.district) params.district = searchDetails.district;
    if (searchDetails.std) params.standard = searchDetails.std;

    if (location.pathname === '/') {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/tution/', { params });
        console.log(response);
        setResults(response.data.ResultSet);
        navigate('/searchtutor', { state: { resultset: response.data.ResultSet } });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally set an error state here and display an error message
      }
    } else {
      onSearch(params);
    }
  };

  const districts = stateDistricts[searchDetails.state] || [];
  return (
    <div className='search-container'>
      <div className='search-space'>

      <div className="search-bar">
        <div>
          <label className="pt-serif-regular">
            <strong>Search By Name:</strong>
            </label>
          <input 
            type="text" 
            name="name" 
            value={searchDetails.name} 
            onChange={handleChange} 
            placeholder="Eg.Julie"
            className="pt-serif-regular nm-input"
            />
        </div>
        <div>
          <label className="pt-serif-regular">
            <strong>Search By Subject:</strong>
            </label>
            <div className='select-container req-bx-slct-cntr'>
          <select 
             name='subject' 
             value={searchDetails.subject} 
             onChange={handleChange}
             className="pt-serif-regular select-box req-bx-slct"
          >
             <option value=''>All subjects</option>
             {subjects.map((subject,index)=>(
                <option key={index} value={subject}>{subject}</option>
             ))}
          </select>
           <div className='drp-icon'>
              <IoMdArrowDropdown size="1.6em"/>
            </div>
             </div>
        </div>
        <div>
          <label className="pt-serif-regular">
            <strong>Search By Board:</strong>
            </label>
            <div className='select-container req-bx-slct-cntr'>
            <select name="boards" onChange={handleChange} className="pt-serif-regular req-bx-slct select-box">
              <option value="">Any boards</option>
              {boards.map((board,index)=>(
                <option key={index} value={board}>{board}</option>
              ))}
            </select>
            <div className='drp-icon'>
              <IoMdArrowDropdown size="1.6em"/>
            </div>
            </div>
        </div>
        <div>
          <label className="pt-serif-regular">
            <strong>Select State:</strong>
            </label>
            <div className='select-container req-bx-slct-cntr'>

          <select name="state" id="inputState" value={searchDetails.state} onChange={handleStateChange} className="pt-serif-regular req-bx-slct select-box">
            <option value="">Any State</option>
            {Object.keys(stateDistricts).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
            <div className='drp-icon'>
              <IoMdArrowDropdown size="1.6em"/>
            </div>
            </div>
        </div>
        <div>
          <label className="pt-serif-regular">
            <strong>Search By District:</strong>
          </label>
          <div className='select-container req-bx-slct-cntr'>
          <select name="district" id="inputDistrict" value={searchDetails.district} onChange={handleChange} disabled={!searchDetails.state} className="pt-serif-regular req-bx-slct select-box">
            <option value="">Any districts</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
            <div className='drp-icon'>
              <IoMdArrowDropdown size="1.6em"/>
            </div>
          </div>
        </div>
        <div>
          <label className="pt-serif-regular">
            <strong>Search By Standard:</strong>
            </label>
            <div className='select-container req-bx-slct-cntr'>
            <select value={searchDetails.std} name="std" onChange={handleChange} className="pt-serif-regular req-bx-slct select-box">
              <option value="">All Standards</option>
              {
                standards.map((std,index)=>(
                  <option key={index} value={std}>{std}</option>
                ))
              }
            </select>
            <div className='drp-icon'>
              <IoMdArrowDropdown size="1.6em"/>
            </div>
            </div>
        </div>
      </div>
      </div>
      <button onClick={handleSubmit} className="req-srch-btn btn-cntr poppins-font">Search</button>
    </div>
  );
};

export default Search;
