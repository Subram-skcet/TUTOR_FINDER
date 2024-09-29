import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import './ReviewCard.css'; // Import the CSS file
import DisplayRating from "../DisplayRating";
import { useDataLayerValue } from "../../StateProviders/StateProvider";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '../Rating/Rating'
import { toast } from "react-toastify";
import { extractDateFields } from "../../utils/getCreatedAt";

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

const updateReaction = (reactionType) => {
    const { liked, disliked } = userReaction;

    if (reactionType === 'like') {
        if(!logged || !logged_as==='student'){
            return loginpop()
         }
        setDislikeCount(disliked? dislikeCount -1 : dislikeCount+0)
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
        setUserReaction({ liked: !liked, disliked: false });
    } else if (reactionType === 'dislike') {
        if(!logged || !logged_as==='student'){
            return loginpop()
         }
       setLikeCount(liked? likeCount-1 : likeCount+0)
      setDislikeCount(disliked ? dislikeCount - 1 : dislikeCount + 1);
        setUserReaction({ liked: false, disliked: !disliked });
    }
  };

const handleLikeClicks = (reactionType) => {
    updateReaction(reactionType);
    handleLike(review._id, reactionType);
};

const handleChange = (e) =>{
  const {name,value} = e.target
  seteditDetails((prevDetails)=>({
    ...prevDetails,
    [name]:value
  }
  ))
}

useEffect(()=>{
  console.log(asStudent);
},[asStudent])

const HandleEditClick = () =>{
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
                    <img src={review.createdBy.profilepic} alt="Profile" className="profilePic" />
                    <div className="name">{review.createdBy.name}</div>
                </div>
                {location.pathname === '/myaccount/studentprofile/myreviews' ? 
                <>
                    <div className="reviews-page-options-icons">
                             {isEditing ?
                                <>
                                <div className="review-save tooltip" onClick={handleSaveClick} data-tooltip="Save">
                                    <SaveIcon/>
                                </div>
                                <div className="review-cancel tooltip" onClick={()=>setIsEditing(false)} data-tooltip="Cancel">
                                    <CloseIcon/>
                                </div>
                                </>
                            :
                            <>
                                <div className="review-edit tooltip" onClick={HandleEditClick} data-tooltip="Edit">
                                    <EditIcon/>
                                </div>
                                <div className="review-delete tooltip" onClick={()=>deleteReview(review._id)} data-tooltip="Delete">
                                    <DeleteIcon/>
                                </div>
                            </>
                            }
                    </div>
                    <div>
                        <ArrowRightAltIcon fontSize="large"/>
                    </div>
                    <div className="header">
                        <img src={review.createdFor.profilepic} alt="Profile" className="profilePic" />
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
                <div>
                    <Rating rating={editDetails.editrating} ref={childRef}/>
                </div>
                <div>
                    <input type="text" name="editreview" value={editDetails.editreview} onChange={handleChange}/>
                </div>
                </>
                :
                <>
                 <div className="rating">
                   <DisplayRating rating={permDetails.permrating}/>
                 </div>
                <div className="review">{permDetails.permreview}</div>
                </>
             }
             <div className="review-card-footer">
                <div className="user-actions">
                    <div className={`likeSection icon-cntr ${isLikeable? '':'disabled-like'}`} onClick={isClickable ? () => handleLikeClicks('like'): undefined}>
                        <div className="like-dislike-icon tooltip" data-tooltip="Like">
                           <ThumbUpOutlinedIcon color={userReaction.liked ? 'primary' : 'action'} />
                        </div>
                        <p>{likeCount}</p>
                    </div>
                    <div className={`dislikeSection icon-cntr ${isLikeable? '':'disabled-like'}`} onClick={isClickable? () => handleLikeClicks('dislike') : undefined}>
                    <div className="like-dislike-icon tooltip" data-tooltip="Dislike">
                        <ThumbDownOutlinedIcon color={userReaction.disliked ? 'error' : 'action'} />
                    </div>
                        <p>{dislikeCount}</p>
                    </div>
                </div>
                <div><p>{extractDateFields(review.createdAt)}</p></div>
             </div>
        </div>
    );
};

export default ReviewCard;
