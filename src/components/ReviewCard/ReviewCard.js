import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import './ReviewCard.css'; // Import the CSS file
import DisplayRating from "../DisplayRating";
import { useDataLayerValue } from "../../StateProviders/StateProvider";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { MdEdit } from "react-icons/md";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '../Rating/Rating'
import { toast } from "react-toastify";
import { extractDateFields } from "../../utils/getCreatedAt";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { IoClose } from "react-icons/io5";


const ReviewCard = ({ review, deleteReview, loginpop, isClickable , isLikeable , handleLike}) => {
        const [{logged,logged_as,asStudent},dispatch] = useDataLayerValue();
        const [userReaction, setUserReaction] = useState({
            liked: asStudent.likedReviews.includes(review._id),
            disliked: asStudent.dislikedReviews.includes(review._id)
        });
        const [likeCount, setLikeCount] = useState(review.like.length);
        const [dislikeCount, setDislikeCount] = useState(review.dislike.length);
        const location = useLocation();
        const [isEditing,setIsEditing] = useState(false)
        const [permDetails,setPermDetails] = useState({
            permreview:review.review,
            permrating:review.rating,
        })
        const [editDetails,seteditDetails] = useState({
            editreview:'',
            editrating:'',
        });
        const childRef = useRef(); //Access child class Rating function from parent 
        const textareaRef = useRef(null)
        const [errorText,setErrorText] = useState('');

    useEffect(() => {
        if (isEditing && textareaRef.current) {
                console.log("Focusing on textarea");
                textareaRef.current.focus();
        }
    }, [isEditing]);

const updateReaction = (reactionType) => {
    const { liked, disliked } = userReaction;

    if (reactionType === 'like') {
        setDislikeCount(disliked? dislikeCount -1 : dislikeCount+0)
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
        setUserReaction({ liked: !liked, disliked: false });
    } else if (reactionType === 'dislike') {
       setLikeCount(liked? likeCount-1 : likeCount+0)
      setDislikeCount(disliked ? dislikeCount - 1 : dislikeCount + 1);
        setUserReaction({ liked: false, disliked: !disliked });
    }
  };

const handleLikeClicks = (reactionType) => {
    if(!logged){
         return loginpop()
    }
    if(logged_as === 'teacher'){
       toast.warn("Only students can like or dislike a review")
       return
    }
    updateReaction(reactionType);
    handleLike(review._id, reactionType);
};

const handleChange = (e) =>{
    if(errorText){
        setErrorText('')
    }
  const {name,value} = e.target
  seteditDetails((prevDetails)=>({
    ...prevDetails,
    [name]:value
  }
  ))
}


const HandleEditClick = () =>{
    
    if(errorText){
        setErrorText('')
    }
    seteditDetails({
        editreview:permDetails.permreview,
        editrating:permDetails.permrating
    })
    setIsEditing(true)
}

const handleSaveClick = async() =>{
    let rating;
    if(childRef.current)
        rating = childRef.current.returnRating() //get rating from the ReviewCard component method 

    if(rating === 0){
        setErrorText('Rating cannot be zero')
        return;
    }

    if(!editDetails.editreview.trim()){
        setErrorText('Review cannot be empty!')
        return;
    }

    try {
        const response = await axios.patch(`/api/v1/review/${review._id}`,{
            rating,
            review:editDetails.editreview
        })
        console.log(response);
        if(response.status === 200){
            toast.success('Review saved successfully')
            setPermDetails({
                permrating:rating,
                permreview:editDetails.editreview
            })
        }
        } catch (error) {
            toast.error("Couldn't save the review try again later")
        }
        finally{
            setIsEditing(false)
        }
}

    return (
        <div className="review-card">
           <div className="my-reviews-page-flex-div">
                <div className="header">
                    <div className="pfp-pg-img-div">
                      <img src={review.createdBy.profilepic} alt="Profile" className="profilePic" />
                    </div>
                    <div className="name">{review.createdBy.name}</div>
                </div>
                {location.pathname === '/myaccount/studentprofile/myreviews' ? 
                <>
                    <div className="reviews-page-options-icons">
                             {isEditing ?
                                <>
                                <div className="review-save" onClick={handleSaveClick} title="Save">
                                    <IoIosSave size="1.5em"/>
                                </div>
                                <div className="review-cancel" onClick={()=>setIsEditing(false)} title="Cancel">
                                    <IoClose size="1.65em"/>
                                </div>
                                </>
                            :
                            <>
                                <div className="review-edit" onClick={HandleEditClick} title="Edit">
                                    <MdEdit size="1.5em"/>
                                </div>
                                <div  className="review-delete" onClick={()=>deleteReview(review._id)} title="Delete">
                                    <MdDelete size="1.5em"/>
                                </div>
                            </>
                            }
                    </div>
                    <div>
                        <ArrowRightAltIcon fontSize="large"/>
                    </div>
                    <div className="header">
                    <div className="pfp-pg-img-div">
                        <img src={review.createdFor.profilepic} alt="Profile" className="profilePic" />
                    </div>
                        <div className="name">{review.createdFor.name}</div>
                    </div>
                </>
                :
                 <></>
                 }
           </div>
             {
                isEditing ?
                <>
                <div className="rating">
                    <Rating rating={0} ref={childRef}/>
                </div>
                <div>
                    <textarea 
                      ref={textareaRef}
                      name="editreview" 
                      value={editDetails.editreview} 
                      onChange={handleChange}
                      className="review-pg-txtarea"
                      >
                    </textarea>
                </div>
                {errorText && 
                <p className="error-p">{errorText}</p>
                }
                </>
                :
                <>
                 <div className="rating">
                   <DisplayRating rating={permDetails.permrating}/>
                 </div>
                <div className="review-div">{permDetails.permreview}</div>
                </>
             }
             <div className="review-card-footer">
                <div className="user-actions">
                    <div className={`likeSection icon-cntr ${isLikeable? '':'disabled-like'}`} onClick={isClickable ? () => handleLikeClicks('like'): undefined}>
                        <div className="like-dislike-icon tooltip" data-tooltip="Like">
                            <div className={`${userReaction.liked? 'liked':''}`}>
                              <BiSolidLike size="1.2em"/>
                            </div>
                        </div>
                        <p>{likeCount}</p>
                    </div>
                    <div className={`dislikeSection icon-cntr ${isLikeable? '':'disabled-like'}`} onClick={isClickable? () => handleLikeClicks('dislike') : undefined}>
                    <div className="like-dislike-icon tooltip" data-tooltip="Dislike">
                           <div className={`${userReaction.disliked? 'disliked':''}`}>
                              <BiSolidDislike size="1.2em"/>
                            </div>
                    </div>
                        <p>{dislikeCount}</p>
                    </div>
                </div>
             </div>
                <div className="review-createdat"><p className='createdAt-p'>{extractDateFields(review.createdAt)}</p></div>
        </div>
    );
};

export default ReviewCard;
