import React, { useState, useEffect, Profiler } from 'react';
import './Main.css';
import Search from '../Search/Search';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

const Main = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleProfileNavigate = (idx) =>{
     const profileDetails = results[idx].createdBy;
     navigate('/teacherProfile', {state:{profileDetails}})
  }

  const fetchData = async (searchParams) => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/tution/', { params: searchParams });
      console.log(response);
      setResults(response.data.ResultSet);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    setResults(location.state.resultset || [])
  }, []);

  return (
    <>
      <div className='top-wst'></div>
      <div className="container">
        <div className='search-prt'>
          <h1 className='main-pg-h1'>Filter Your Search</h1>
          <Search onSearch={fetchData} />
        </div>
        <div className='results-prt'>
          <h1>Your Search Results</h1>
          <div className="search-results">
            {results.map((result,index) => (
              <div className="tutor-card" key={index} onClick={()=>handleProfileNavigate(index)}>
                <div className="profile-pic">
                  <img src={result.createdBy.profilepic} alt="Profile" />
                </div>
                <div className="card-details">
                  <h2>{result.createdBy.name}</h2>
                  <div className="rating">
                    <span>⭐⭐⭐⭐⭐</span> <span className="reviews">({result.reviews || 0})</span>
                  </div>
                  <p><strong>Subjects:</strong> {result.subjects.join(', ')}</p>
                  <p><strong>Time:</strong> {result.duration.join(' - ')}</p>
                  <p><strong>Day:</strong> {result.days.join(' - ')}</p>
                  <p><strong>Standard:</strong> {result.standard.join(' - ')}</p>
                  <p><strong>Board:</strong> {result.boards.join(', ')}</p>
                  <p><strong>Fees:</strong> ₹{result.fees}</p>
                  <p><strong>Location:</strong> {result.createdBy.district} , {result.createdBy.state}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
