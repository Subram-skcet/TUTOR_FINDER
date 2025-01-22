import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyReview.css';
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import ReviewCard from '../../components/ReviewCard/ReviewCard'
import { ThreeCircles } from 'react-loader-spinner'

const MyReview = () => {
  const [{ asTeacher }] = useDataLayerValue(); // Get teacher ID from state provider
  const [reviews, setReviews] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  
  const fetchReviews = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`/api/v1/review/`,{
        withCredentials: true
       });
      setReviews(response.data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
    finally{
      setIsLoading(false)
    }
  };
  useEffect(() => {

    fetchReviews();
  }, [asTeacher._id]);

  return (
    <div className="account-page-reviews-container">
      <div>
          <h1 className='lato-bold'>Student Reviews</h1>
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
                  <p className='lato-regular mt-rev-p'>
                  Reviews written by students about you will be displayed here.
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
                      isClickable={false}
                    />
                  ))
              }
              </div>
              )
            }
      </>
     }
    </div>
  );
};

export default MyReview;
