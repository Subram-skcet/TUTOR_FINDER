import React,{ useEffect, useState } from 'react'
import { useDataLayerValue } from '../../StateProviders/StateProvider'
import axios from 'axios'
import TutionCard from '../../components/TutionCard/TutionCard'
import { useNavigate } from 'react-router-dom'
import './Bookmark.css'
import SearchIcon from '@mui/icons-material/Search';
import { ThreeCircles } from 'react-loader-spinner'

const Bookmark = () => {
  const [favouritetutions,setfavouritetutions ] = useState([])
  const [{asStudent},dispatch] = useDataLayerValue()
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(true)

  const fetchTutions = async()=>{
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
    <div className='bookmarks-wrap'>
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
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
       </div>
        :
        <>
          {favouritetutions.length === 0 ? (
            <div className='bookmark-empty-content'>
              <p className='pt-serif-regular bookmark-p'>Tutions you have added into your favourite list will appear here. Currently you have no favourite tutions</p>
              <div className='bookmark-pg-explr-div' onClick={()=>navigate('/searchtutor')}>
                <SearchIcon/>
                <p>Explore tutions</p>
              </div>
            </div>
             ) : (
              <>
                <div className="search-results fav-tutions">{
                  favouritetutions.map((result,index) => (
                    <TutionCard tution={result} index={index} profilenavigate={handleProfileNavigate}/>            
                  ))
                }
                </div> 
                <button onClick={()=>navigate('/searchtutor')} className='bookmark-pg-btn'>Find more tutions</button>
                </>
             )}
        </>
      }

    </div>
  )
}

export default Bookmark