import React, { useState, useEffect, Profiler } from 'react';
import './Main.css';
import Search from '../Search/Search';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import TutionCard from '../components/TutionCard/TutionCard'


const Main = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleProfileNavigate = (idx) =>{
    console.log(results[idx]);
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
    if(location.state && location.state.resultset)
      setResults(location.state.resultset)
    else
      fetchData({});
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
          <div>
             <h1>Your Search Results</h1>
          </div>
          <div className="search-results">
          {results.length === 0 ? (
            <div className='teachers-not-found-para'>
              <p>No Teachers available for the specified conditions..</p>
            </div>
             ) : (
            results.map((result,index) => (
                <TutionCard tution={result} index={index} profilenavigate={handleProfileNavigate}/>            
              ))
             )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
