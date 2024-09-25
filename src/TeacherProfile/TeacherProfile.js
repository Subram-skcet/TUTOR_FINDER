import React, { useState,useEffect,useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './TeacherProfile.css';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure this is correctly imported
import ReviewCard from '../components/ReviewCard/ReviewCard';
import Rating from '../components/Rating/Rating'
import { useDataLayerValue } from '../StateProviders/StateProvider';
import Modal from '../components/Modal/Modal';
import LoginModal from '../components/LoginModal/LoginModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { ThreeCircles } from 'react-loader-spinner'

const TeacherProfile = () => {
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState('');
  const location = useLocation();
  const [showRating,setShowRating] = useState(false)
  const textareaRef = useRef(null)
  const [{asStudent,logged,logged_as},dispatch] =  useDataLayerValue()
  const [isLoginModalOpen,setLoginModelOpen] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  let props = location.state.profileDetails;
  // console.log(props);

  const backgroundStyle = {
    backgroundImage: `url(${props.profilepic})`,
    backgroundSize: 'cover',
    border: '4px solid #0abb77',
  };

  const fetchReviews = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`/api/v1/review/teacher-reviews/${props._id}`);
      console.log(response);
      setReviews(response.data.reviews)
      // Handle response and set reviews if needed
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
    finally{
      setIsLoading(false)
    }
  };
  
  useEffect(() => {
    fetchReviews();
  }, []);


  // Example: props.reviewData could be used to prepopulate reviews if needed

  const ReviewExists = () =>{
    console.log(reviews);
     return reviews.some(review => review.createdBy._id === asStudent._id)
  }

  const childRef = useRef();

  const openLoginModel = () =>{
      setLoginModelOpen(true)  
  }

  const handleSubmitReview = async() => {
    if(!logged || !logged_as==='student'){
       return openLoginModel()
    }
    if(ReviewExists()){
      console.log('Executing');
      toast.error('Review alredy exists!!')
      return
    }
    let rating;
    if(childRef.current){
      rating = childRef.current.returnRating()
    }
    let req_body = {
          createdBy:asStudent._id,
          review:newReviewText,
          createdFor:props._id,
          rating:rating
    }
    console.log(req_body);
    try {
      const response = await axios.post('/api/v1/review/',req_body)
      console.log(response);
      toast.success('Review posted successfully')
      await fetchReviews();
    } catch (error) {
      console.log(error.message);
    }

  };
    
   const handleFocus =()=>{
      setShowRating(true);
   }

   const handleBlur =()=>{
      setShowRating(false);
      if(childRef.current){
        childRef.current.callRatingInitializer()
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

  return (
    <>
     <div className='top-wst'></div>
    <div className="profile-page">
      <Modal isopen={isLoginModalOpen} onClose={()=>setLoginModelOpen(false)}>
        <LoginModal/>
      </Modal>
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
          <h3 className="reviews-heading">Student Reviews ({reviews.length})</h3>
          {isLoading ?
              <ThreeCircles
              visible={true}
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />
          :
          <></>
          }
          <div className="reviews-section">
          
            {!isLoading && reviews.length === 0 ? (
              <p className='no-review-text'>No reviews for this teacher..</p>
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
                loginpop = {openLoginModel} 
                />
              ))
            )
          }
          </div>
        </div>
        <hr className='hr-tag'></hr>
          <div className="write-review">
            <p>Already studied in his tution? Leave a review to help others student 
            </p>
              <div onClick={handleFocus} className='rating-div'>
                <Rating ref={childRef}/>
              </div>
            { showRating && 
              <div className='user-review-space'>
                <div className='review-textarea'>
                  <textarea 
                    value={newReviewText}
                    ref={textareaRef}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Write review..."
                    className='profile-page-textarea'
                    ></textarea>
                  </div>
                  <div className='review-box-btns'>
                      <button className="post-submit" onClick={handleSubmitReview}>Submit</button>
                      <button className='post-cancel' onClick={handleBlur}>Cancel</button>
                  </div>
                </div>
            }
          </div>
      </div>
    </div>
  </>
  );
};

export default TeacherProfile;
