import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TeacherProfile.css';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure this is correctly imported
import ReviewCard from '../components/ReviewCard/ReviewCard';

const TeacherProfile = () => {
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState('');
  const location = useLocation();
  let props = location.state.profileDetails;
  // console.log(props);

  const backgroundStyle = {
    backgroundImage: `url(${props.profilepic})`,
    backgroundSize: 'cover',
    border: '4px solid #0abb77',
  };
   
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/review/${props._id}`,{
          params:{
            mode:"teacher"
          }
        });
        console.log(response);
        setReviews(response.data.reviews)
        // Handle response and set reviews if needed
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);


  // Example: props.reviewData could be used to prepopulate reviews if needed

  const handleRatingClick = (reviewId, rating) => {
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        let newLikeCount = review.likeCount;
        let newDislikeCount = review.dislikeCount;

        if (rating === 'like') {
          newLikeCount += 1;
        } else if (rating === 'dislike') {
          newDislikeCount += 1;
        }

        return {
          ...review,
          likeCount: newLikeCount,
          dislikeCount: newDislikeCount,
          activeRating: review.activeRating === rating ? null : rating
        };
      }
      return review;
    }));
  };

  const handleSubmitReview = () => {
    if (newReviewText.trim()) {
      const newReview = {
        id: reviews.length + 1,
        text: newReviewText,
        likeCount: 0,
        dislikeCount: 0,
        activeRating: null
      };
      setReviews([...reviews, newReview]);
      setNewReviewText('');
    }
  };

  return (
    <>
     <div className='top-wst'></div>
    <div className="profile-page" style={{ backgroundImage: `url(${props.backgroundImage || 'https://img.freepik.com/free-vector/circles-background-dark-tones_60389-166.jpg?ga=GA1.1.711888986.1720101620&semt=ais_user'})` }}>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-picture" style={backgroundStyle}>
        
          </div>
          <h1>{props.name}</h1>
        </div>
        <div className="profile-details">
          <div className="label">Name</div>
          <div className="value">{props.name}</div>
          
          <div className="label">Subject Handling</div>
          <div className="value">{props.subjects.join(', ')}</div>
          
          <div className="label">Board</div>
          <div className="value">{props.board || 'Not Specified'}</div>
          
          <div className="label">Teaching Language</div>
          <div className="value">{props.teachingLanguage || 'Not Specified'}</div>
          
          <div className="label">Standard Handling</div>
          <div className="value">{props.standardHandling || 'Not Specified'}</div>
          
          <div className="label">Years of Experience</div>
          <div className="value">{props.year_of_exp}</div>

          <div className="label">Qualification</div>
          <div className="value">{props.qualification}</div>

          <div className="label">State</div>
          <div className="value">{props.state}</div>

          <div className="label">District</div>
          <div className="value">{props.district}</div>

          <div className="label">Email</div>
          <div className="value">{props.email}</div>

          <div className="label">Mobile Number</div>
          <div className="value">{props.mobileno}</div>
        </div>
        <hr className='hr-tag'></hr>
        <div className="about-section">
          <p className="about-heading">About</p>
          <p className="about-content">{props.about}</p>
        </div>
        <hr className='hr-tag'></hr>
        <div className="reviews-container">
          <h3 className="reviews-heading">Student Reviews ({props.numOfReviews})</h3>
          <div className="reviews-section">
            {reviews.map(review => (
                <ReviewCard 
                key={review._id} // Unique key for each review
                name={review.createdBy.name} 
                profilepic={review.createdBy.profilepic} 
                rating={review.rating} 
                review={review.review}
                like={review.like} 
                dislike={review.dislike} 
              />
            ))}
          </div>
          <div className="write-review">
            <textarea 
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              placeholder="Write review..."
              className='profile-page-textarea'
              ></textarea>
            <button className="submit-button" onClick={handleSubmitReview}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default TeacherProfile;
