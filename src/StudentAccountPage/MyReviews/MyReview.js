import React, { useEffect, useState } from 'react'
import  ReviewCard from '../../components/ReviewCard/ReviewCard'
import axios from 'axios'
import './MyReview.css'
import { useDataLayerValue } from '../../StateProviders/StateProvider'
import { toast } from 'react-toastify'
import { ThreeCircles } from 'react-loader-spinner'

const MyReview = () => {
  const [reviews,setReviews] = useState([])
  const [{ asStudent }, dispatch] = useDataLayerValue();
  const [isDoable,setDoable] = useState(true)
  const [isLoading,setIsLoading] = useState(false)

  const fetchMyReviews = async()=>{
    setIsLoading(true)
       try {
          const response = await axios.get(`https://find-my-tuition.onrender.com/api/v1/review/`,
            {
              withCredentials:true
            }
          )
          setReviews(response.data.reviews)
        } catch (error) {
         toast.error("Error fetching reviews. Try again later")
       }
       finally{
         setIsLoading(false)
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
       const response = await axios.post(`https://find-my-tuition.onrender.com/api/v1/student/likereviews/`,req_body)
       if(response.status === 200){
        const StudentDetails = {...asStudent}
        StudentDetails.likedReviews = response.data.likedReviews
        StudentDetails.dislikedReviews = response.data.dislikedReviews
        dispatch({
          type:'SET_STUDENT',
          payload:StudentDetails
        })
       }
     } catch (error) {
        toast.error('Something went wrong please try agin later')
     }
     finally{
      setDoable(true)
     }
 }

const deleteReview = async(id) =>{
  try {
      const response = await axios.delete(`https://find-my-tuition.onrender.com/api/v1/review/${id}`)
      if(response.status === 200){
        toast.success('Review deleted successfully')
        fetchMyReviews()
      }
  } catch (error) {
     toast.error('Something went wrong try again later')
  }
}

  useEffect(()=>{
     fetchMyReviews()
  },[asStudent])
  return (
    <div className='my-reviews-wrap'>
      <div>
         <h1 className='lato-bold'>My Reviews</h1>
      </div>
      {isLoading?
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
            {reviews.length === 0 ? (
              <div className='student-pg-review-div'>
                <p className='lato-regular std-pg-review-p'>
                  Reviews you have written about teachers will show here so far you haven't written any reviews
                </p>
              </div>
            )
            :(
              <div className="my-reviews-pg-reviews-container">
                {
                  reviews.map(review => (
                    <ReviewCard 
                       key={review._id}
                      review={review}
                      isClickable={true}
                      handleLike = {handleLikeReview}
                      deleteReview = {deleteReview}
                      isLikeable = {isDoable}
                />
              ))
            }
            </div>
            )
          }
          </>
        }
    </div>
  )
}

export default MyReview
