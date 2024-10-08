import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyReview.css';
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import ReviewCard from '../../components/ReviewCard/ReviewCard'

const MyReview = () => {
  const [{ asTeacher }] = useDataLayerValue(); // Get teacher ID from state provider
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/v1/review/`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [asTeacher._id]);

  return (
    <div className="account-page-reviews-container">
      <div>
          <h1 className='lato-bold'>Student Reviews</h1>
      </div>
      {reviews.length === 0 ? (
              <div className='student-pg-review-div'>
                <p className='pt-serif-regular'>
                  Reviews written by students about you will have appear here.
                </p>
              </div>
            )
            :(
              <div className="my-reviews-pg-reviews-container">
                {
                 reviews.map(review => (
                  <ReviewCard 
                    review={review}
                    isClickable={false}
                  />
                ))
            }
            </div>
            )
          }
    </div>
  );
};

export default MyReview;
