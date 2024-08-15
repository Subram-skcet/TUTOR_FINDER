import React,{ useEffect, useState } from 'react'
import { useDataLayerValue } from '../../StateProviders/StateProvider'
import axios from 'axios'
import TutionCard from '../../components/TutionCard/TutionCard'
import { useNavigate } from 'react-router-dom'
import './Bookmark.css'

const Bookmark = () => {
  const [favouritetutions,setfavouritetutions ] = useState([])
  const [{asStudent},dispatch] = useDataLayerValue()
  const navigate = useNavigate()

  const fetchTutions = async()=>{
    let tutions=[];
    try {
      for(let i=0;i<asStudent.favouriteTutions.length;i++){
        console.log('Executing');
         const response = await axios.get(`http://localhost:3001/api/v1/tution/gettutions/${asStudent.favouriteTutions[i]}`)
         console.log(response);
         tutions.push(response.data.tution)
      }
      setfavouritetutions(tutions)
      console.log(favouritetutions);
      
    } catch (error) {
         console.log(error.message);
    }
  }
  const handleProfileNavigate = (idx) =>{
    console.log(favouritetutions[idx]);
     const profileDetails = favouritetutions[idx].createdBy;
     navigate('/teacherProfile', {state:{profileDetails}})
  }

  useEffect(()=>{
      fetchTutions();
  },[])

  return (
    <div className='bookmarks-wrap'>
      <div>
         <h1>Your favourite tutions</h1>
      </div>
      <div className="search-results fav-tutions">
          {favouritetutions.length === 0 ? (
            <p>You have no favourite tutions..</p>
             ) : (
            favouritetutions.map((result,index) => (
                <TutionCard tution={result} index={index} profilenavigate={handleProfileNavigate}/>            
              ))
             )}
          </div>

    </div>
  )
}

export default Bookmark