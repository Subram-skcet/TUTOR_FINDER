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
        const response = await axios.get(`http://localhost:3001/api/v1/review/${asTeacher._id}?mode=teacher`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [asTeacher._id]);

  return (
    <div className="account-page-reviews-container">
      <h3 className="reviews-heading">Student Reviews</h3>
      <div className="reviews-section rev-sec">
        {reviews.map(review => (
            <ReviewCard 
            id={review._id} // Unique key for each review
            name={review.createdBy.name} 
            profilepic={review.createdBy.profilepic} 
            rating={review.rating} 
            review={review.review}
            like={review.like} 
            dislike={review.dislike}
            isClickable={false}
            />
        ))}
      </div>
    </div>
  );
};

export default MyReview;
