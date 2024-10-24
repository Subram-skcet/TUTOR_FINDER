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
import DisplayRating from '../components/DisplayRating';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const TeacherProfile = () => {
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState('');
  const location = useLocation();
  const [showRating,setShowRating] = useState(false)
  const textareaRef = useRef(null)
  const [{asStudent,logged,logged_as},dispatch] =  useDataLayerValue()
  const [isLoginModalOpen,setLoginModelOpen] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [isDoable,setDoable] = useState(true)
  const [errorText,setErrorText] = useState('')

  let props = location.state.profileDetails

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

  const validateReview = (rating)=>{
      if(rating === 0){
        toast.error('Please rate a teacher from 1 to 5 by clicking the star')
        return false
      }
      if(newReviewText.trim().length === 0){
        toast.error("Review cannot be empty")
        return false
      }

      return true
  }

  const handleSubmitReview = async(e) => {
    e.preventDefault();
    if(!logged){
        openLoginModel()
        return false
    }
    if(logged_as === 'teacher'){
      toast.info('Only students can review about a teacher')
      return
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

    const validated = validateReview(rating)

    if(validated){
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
        setErrorText('')
        await fetchReviews();
      } catch (error) {
        toast.error("Couldn't post a review try again later")
      }

    }


  };
    
   const handleFocus =()=>{
      setErrorText('')
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
      setDoable(false)
       const req_body = {
         reviewid,
         option
       }
       try {
         const response = await axios.post(`/api/v1/student/likereviews/`,req_body)
         console.log(response);
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
        <div className="teacher-profile-details">
          <div className="label">Name</div>
          <div className="value">{props.name}</div>
          
          <div className="label">Subject Handling</div>
          <div className="value">{props.subjects.join(', ')}</div>
          
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

          <div className="label">Number of Tuitions created:</div>
          <div className="value">{props.numOfTutions}</div>

          <div className='label'>Average Rating:</div>
          <div className="rating">
                    <DisplayRating rating={props.averageRating}/>
                    <p>({props.numOfReviews})</p>
          </div>
        </div>
        <hr className='hr-tag'></hr>
        <div className="about-section">
          <p className="about-heading">About</p>
          <p className="about-content-div">{props.about}</p>
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
          <div className="reviews-section">
            {reviews.length === 0 ? (
              <p className='no-review-text'>No reviews for this teacher..</p>
            )
            :(
              reviews.map(review => (
                <ReviewCard 
                review={review} 
                isClickable={true}
                handleLike = {handleLikeReview}
                loginpop = {openLoginModel}
                isLikeable = {isDoable}
                />
              ))
            )
          }
          </div>
          }
        </div>
        <hr className='hr-tag'></hr>
          <div className="write-review">
            <p>Already studied in his tution? Leave a review to help others student 
            </p>
              <div onClick={handleFocus} className='rating-div'>
                <Rating ref={childRef}/>
              </div>
            { showRating && 
                <form onSubmit={handleSubmitReview}>
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
                    minLength={1}
                    required
                    ></textarea>
                  </div>
                  {errorText && 
                   
                   <div className='error-para-div'>
                      <div className='amber-icon'>
                         <WarningAmberIcon/>
                      </div>
                      <p className='errorText'>{errorText}</p>
                    </div>}
                  <div className='review-box-btns'>
                      <button type="submit" className="post-submit">Submit</button>
                      <button className='post-cancel' onClick={handleBlur}>Cancel</button>
                  </div>
                </div>
                  </form>
            }
          </div>
      </div>
    </div>
  </>
  );
};

export default TeacherProfile;
