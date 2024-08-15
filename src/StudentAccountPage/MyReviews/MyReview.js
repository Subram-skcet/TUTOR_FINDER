import React, { useEffect, useState } from 'react'
import  ReviewCard from '../../components/ReviewCard/ReviewCard'
import axios from 'axios'
import { useDataLayerValue } from '../../StateProviders/StateProvider'
import './MyReview.css'


const MyReview = () => {
  const [reviews,setReviews] = useState([])
  const [{asStudent},dispatch] = useDataLayerValue()
  

  const fetchMyReviews = async()=>{
       try {
          const response = await axios(`http://localhost:3001/api/v1/review/${asStudent._id}?mode=student`)
          setReviews(response.data.reviews)
       } catch (error) {
         console.log(error.message);
       }
  }

  //handle clicking Like
  const handleLikeReview = async(reviewid ,option) =>{
    const req_body = {
      reviewid,
      option
    }
    try {
      const response = await axios.post(`http://localhost:3001/api/v1/student/likereviews/${asStudent._id}`,req_body)
      console.log(response);
    } catch (error) {
     
    }
}

  useEffect(()=>{
     fetchMyReviews()
  },[])
  return (
    <div className='my-reviews-wrap'>
      <div>
         <h1>My Reviews:</h1>
      </div>
       <div className="reviews-section my-reviews">
            {reviews.length === 0 ? (
              <p className='no-review-text'>You haven't written any reviews</p>
            )
            :(
              reviews.map(review => (
                <ReviewCard 
                id={review._id} // Unique key for each review
                name={review.createdBy.name} 
                profilepic={review.createdBy.profilepic} 
                rating={review.rating} 
                review={review.review}
                like={review.like} 
                dislike={review.dislike}
                isClickable={true}
                handleLike = {handleLikeReview} 
                />
              ))
            )
          }
          </div>
    </div>
  )
}

export default MyReview
