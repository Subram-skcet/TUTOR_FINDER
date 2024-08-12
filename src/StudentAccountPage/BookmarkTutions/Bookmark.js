import React,{ useEffect, useState } from 'react'
import { useDataLayerValue } from '../../StateProviders/StateProvider'
import axios from 'axios'


const Bookmark = () => {
  const [favouritetutions,setfavouritetutions ] = useState([])
  const [{asStudent},dispatch] = useDataLayerValue()

  const fetchTutions = async()=>{
    let tutions=[];
    try {
      for(let i=0;i<asStudent.favouriteTutions.length;i++){
        console.log('Executing');
         const response = await axios.get(`http://localhost:3001/api/v1/tution/gettutions/${asStudent.favouriteTutions[i]}`)
         tutions.push(response.data.tution)
      }
      setfavouritetutions(tutions)
      
    } catch (error) {
         console.log(error.message);
    }
  }
  useEffect(()=>{
      fetchTutions();
  },[])

  return (
    <div>
      <div className="search-results">
            {favouritetutions.map((result,index) => (
              <div className="tutor-card" key={index}>
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
  )
}

export default Bookmark