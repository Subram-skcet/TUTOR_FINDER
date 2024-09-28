import React, { useEffect, useState } from 'react'
import  ReviewCard from '../../components/ReviewCard/ReviewCard'
import axios from 'axios'
import './MyReview.css'
import { useDataLayerValue } from '../../StateProviders/StateProvider'
import { toast } from 'react-toastify'

const MyReview = () => {
  const [reviews,setReviews] = useState([])
  const [{ asStudent }, dispatch] = useDataLayerValue();
  const [isDoable,setDoable] = useState(true)

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
    setDoable(false)
     const req_body = {
       reviewid,
       option
     }
     try {
       await axios.post(`/api/v1/student/likereviews/`,req_body)
     } catch (error) {
        toast.error('Something went wrong please try agin later')
     }
     finally{
      setDoable(true)
     }
 }

const deleteReview = async(id) =>{
  try {
      const response = await axios.delete(`/api/v1/review/${id}`)
      if(response.status === 200){
        toast.success('Review deleted successfully')
        fetchMyReviews()
      }
  } catch (error) {
     toast.succes('Something went wrong try again later')
      console.log(error);
  }
}

  useEffect(()=>{
     fetchMyReviews()
  },[asStudent])
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
                      isLikeable = {isDoable} 
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
