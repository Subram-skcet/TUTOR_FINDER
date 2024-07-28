import React,{useState} from 'react'
import './MyReview.css'
const MyReview = () => {
    const initialReviews = [
        { id: 1, text: 'This teacher is amazing!', likeCount: 0, dislikeCount: 0, activeRating: null },
        { id: 2, text: 'Great teaching methods.', likeCount: 0, dislikeCount: 0, activeRating: null },
        { id: 1, text: 'This teacher is amazing!', likeCount: 0, dislikeCount: 0, activeRating: null },
        { id: 2, text: 'Great teaching methods.', likeCount: 0, dislikeCount: 0, activeRating: null },
        { id: 1, text: 'This teacher is amazing!', likeCount: 0, dislikeCount: 0, activeRating: null },
        { id: 2, text: 'Great teaching methods.', likeCount: 0, dislikeCount: 0, activeRating: null },
        { id: 1, text: 'This teacher is amazing!', likeCount: 0, dislikeCount: 0, activeRating: null },
        { id: 2, text: 'Great teaching methods.', likeCount: 0, dislikeCount: 0, activeRating: null },
        { id: 1, text: 'This teacher is amazing!', likeCount: 0, dislikeCount: 0, activeRating: null },
        { id: 2, text: 'Great teaching methods.', likeCount: 0, dislikeCount: 0, activeRating: null },
        { id: 1, text: 'This teacher is amazing!', likeCount: 0, dislikeCount: 0, activeRating: null },
        { id: 2, text: 'Great teaching methods.', likeCount: 0, dislikeCount: 0, activeRating: null },
        { id: 1, text: 'This teacher is amazing!', likeCount: 0, dislikeCount: 0, activeRating: null },
        { id: 2, text: 'Great teaching methods.', likeCount: 0, dislikeCount: 0, activeRating: null },
        { id: 1, text: 'This teacher is amazing!', likeCount: 0, dislikeCount: 0, activeRating: null },
        { id: 2, text: 'Great teaching methods.', likeCount: 0, dislikeCount: 0, activeRating: null }
    ];
    const [reviews, setReviews] = useState(initialReviews);
      
  return (
    <div className="account-page-reviews-container">
          <h3 className="reviews-heading">Student Reviews</h3>
          <div className="reviews-section rev-sec">
            {reviews.map(review => (
              <div className="review" key={review.id}>
                <div className="review-picture">
                  {/* Add reviewer picture here */}
                </div>
                <div className="review-text">
                  <p>{review.text}</p>
                  <div className="rating">
                    <div 
                      className={`like ${review.activeRating === 'like' ? 'active' : ''}`} 
                    >
                      <i className="fas fa-thumbs-up fa-3x"></i>
                      <span className="count">{review.likeCount}</span>
                    </div>
                    <div 
                      className={`dislike ${review.activeRating === 'dislike' ? 'active' : ''}`} 
                    >
                      <i className="fas fa-thumbs-down fa-3x"></i>
                      <span className="count">{review.dislikeCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default MyReview