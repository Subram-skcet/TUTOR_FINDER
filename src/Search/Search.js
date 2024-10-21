import React, { useState } from 'react';
import './Search.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { stateDistricts,subjects } from '../components/stateExporter';
import axios from 'axios';

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
          <label>Search By Name:</label>
          <input type="text" name="name" value={searchDetails.name} onChange={handleChange} />
        </div>
        <div>
          <label>Search By Subject:</label>
          <select name='subject' value={searchDetails.subject} onChange={handleChange}>
             <option value=''>All subjects</option>
             {subjects.map((subject)=>(
                <option value={subject.value}>{subject.label}</option>
             ))}
          </select>
        </div>
        <div>
          <label>Search By Board:</label>
          <select name="boards" onChange={handleChange}>
            <option value="">Select a board</option>
            <option value="CBSE">CBSE</option>
            <option value="State Board">State Board</option>
            <option value="ICSE">ICSE</option>
          </select>
        </div>
        <div>
          <label>Select State:</label>
          <select name="state" id="inputState" value={searchDetails.state} onChange={handleStateChange}>
            <option value="">Search By State</option>
            {Object.keys(stateDistricts).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Search By District:</label>
          <select name="district" id="inputDistrict" value={searchDetails.district} onChange={handleChange} disabled={!searchDetails.state}>
            <option value="">-- select district --</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Search By Standard:</label>
          <select value={searchDetails.std} name="std" onChange={handleChange}>
            <option value="">Select Standard</option>
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
      <button onClick={handleSubmit} className="home-srch-btn btn-cntr">Search</button>
    </div>
  );
};

export default Search;
