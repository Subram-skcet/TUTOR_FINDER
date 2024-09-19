import React, { useEffect, useState } from 'react'
import  ReviewCard from '../../components/ReviewCard/ReviewCard'
import axios from 'axios'
import './MyReview.css'


const MyReview = () => {
  const [reviews,setReviews] = useState([])
  

  const fetchMyReviews = async()=>{
       try {
          const response = await axios.get(`/api/v1/review/`)
          console.log(response);
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
      const response = await axios.post(`/api/v1/student/likereviews/`,req_body)
      console.log(response);
    } catch (error) {
     
    }
}

const deleteReview = async(id) =>{
  try {
      const response = await axios.delete(`/api/v1/review/${id}`)
      console.log(response);
      fetchMyReviews()
  } catch (error) {
      console.log(error);
  }
}

  useEffect(()=>{
     fetchMyReviews()
  },[])
  return (
    <div className='my-reviews-wrap'>
      <div>
         <h1>My Reviews</h1>
      </div>
            {reviews.length === 0 ? (
              <div className='student-pg-review-div'>
                <p>
                  Reviews you have written about teachers will appear here so far you haven't written any reviews
                </p>
              </div>
            )
            :(
              <div className="my-reviews-pg-reviews-container">
                {
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
                      createdFor = {review.createdFor}
                      handleLike = {handleLikeReview}
                      deleteReview = {deleteReview}
                       
                />
              ))
            }
            </div>
            )
          }
    </div>
  )
}

export default MyReview
