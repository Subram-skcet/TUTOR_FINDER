import React,{ useEffect, useState } from 'react'
import { useDataLayerValue } from '../../StateProviders/StateProvider'
import axios from 'axios'
import TutionCard from '../../components/TutionCard/TutionCard'
import { useNavigate } from 'react-router-dom'
import './Bookmark.css'
import SearchIcon from '@mui/icons-material/Search';
import { ThreeCircles } from 'react-loader-spinner'
import { FaSearch } from "react-icons/fa";

const Bookmark = () => {
  const [favouritetutions,setfavouritetutions ] = useState([])
  const [{asStudent},dispatch] = useDataLayerValue()
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(true)
  const [isAnyModalOpen,setModalOpen] = useState(false)

  const fetchTutions = async()=>{
    console.log(asStudent.favouriteTutions)
    
    setIsLoading(true)
    let tutions=[];
    try {
      for(let i=0;i<asStudent.favouriteTutions.length;i++){
        console.log('Executing');
         const response = await axios.get(`/api/v1/tution/gettution/${asStudent.favouriteTutions[i]}`)
         console.log(response);
         tutions.push(response.data.tution)
      }
      setfavouritetutions(tutions)
      console.log(favouritetutions);
      
    } catch (error) {
         console.log(error.message);
    }
    finally{
      setIsLoading(false)
    }
  }
  const handleProfileNavigate = (idx) =>{
    console.log(favouritetutions[idx]);
     const profileDetails = favouritetutions[idx].createdBy;
     navigate('/myaccount/studentprofile/teacherProfile', {state:{profileDetails}})
  }

  useEffect(()=>{
      fetchTutions();
  },[asStudent])

  return (
    <div className={`bookmarks-wrap ${isAnyModalOpen ? 'stator' : ''}`}>
      <div>
         <h1 className='lato-bold'>Your favourite tuitions</h1>
      </div>
      {
        isLoading ? 
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
        :
        <>
          {favouritetutions.length === 0 ? (
            <div className='bookmark-empty-content'>
              <p className='lato-regular bookmark-p'>Tuitions you have added into your favourite list will show here. Currently you have no favourite tuitions</p>
              <div className='bookmark-pg-explr-div itms-cntr style-links-updated lato-regular' onClick={()=>navigate('/searchtutor')}>
                <FaSearch/>
                <p>Explore tuitions</p>
              </div>
            </div>
             ) : (
              <>
                <div className="search-results fav-tutions">{
                  favouritetutions.map((result,index) => (
                    <TutionCard tution={result} index={index} profilenavigate={handleProfileNavigate} setModalOpen={setModalOpen}/>            
                  ))
                }
                </div> 
                <button onClick={()=>navigate('/searchtutor')} className='bookmark-pg-btn style-links-updated lato-regular'>
                  <p>Find more</p>
                  </button>
                </>
             )}
        </>
      }

    </div>
  )
}

export default Bookmark