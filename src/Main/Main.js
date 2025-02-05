import React, { useState, useEffect } from 'react';
import './Main.css';
import Search from '../Search/Search';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import TutionCard from '../components/TutionCard/TutionCard'
import { ThreeCircles } from 'react-loader-spinner'

const Main = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [isAnyModalOpen,setModalOpen] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate();

  const handleProfileNavigate = (idx) =>{
     const profileDetails = results[idx].createdBy;
     navigate('/teacherProfile', {state:{profileDetails}})
  }

  const fetchData = async (searchParams) => {
    setIsLoading(true)
    try {
      const response = await axios.get('/api/v1/tution/', { params: searchParams });
      setResults(response.data.ResultSet);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if(location.state && location.state.resultset)
      setResults(location.state.resultset)
    else
      fetchData({});
    window.scrollTo(0,0)
  }, [location.state]);


  return (
    <>
      <div className='top-wst'></div>
      <div className={`container ${isAnyModalOpen ? 'stator' : ''}`}>
        <div className='search-prt'>
          <h1 className='main-pg-h1 lato-bold'>Filter Your Search</h1>
          <Search onSearch={fetchData} />
        </div>
        <div className='results-prt'>
          <div>
             <h1 className='search-rst-hd lato-bold'>Your Search Results</h1>
          </div>
          {isLoading ?
            <div className='circle-animation'>
              <ThreeCircles
              visible={true}
              height="100"
              width="100"
             color="#3689d6"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />
             </div>
             : results.length === 0 ? (
              <div className='teachers-not-found-para lato-regular'>
                <p className='pt-serif-regular tchr-not-fnd-p'>No Tuitions available for the specified conditions..</p>
              </div>
             )
             :
             <div className="search-results">
              {  results.map((result,index) => (
                  <TutionCard key={result._id} tution={result} index={index} profilenavigate={handleProfileNavigate} setModalOpen={setModalOpen}/>            
                ))
              }
             </div>
          }
        </div>
      </div>
    </>
  );
};

export default Main;
