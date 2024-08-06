import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyReview.css';
import { useDataLayerValue } from '../../StateProviders/StateProvider';

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
          <div className="review" key={review._id}>
            <div className="review-picture">
              {/* Add reviewer picture here */}
            </div>
            <div className="review-text">
              <p>{review.review}</p>
              <div className="rating">
                <div className={`like ${review.activeRating === 'like' ? 'active' : ''}`}>
                  <i className="fas fa-thumbs-up fa-3x"></i>
                  <span className="count">{review.like.length}</span>
                </div>
                <div className={`dislike ${review.activeRating === 'dislike' ? 'active' : ''}`}>
                  <i className="fas fa-thumbs-down fa-3x"></i>
                  <span className="count">{review.dislike.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReview;
