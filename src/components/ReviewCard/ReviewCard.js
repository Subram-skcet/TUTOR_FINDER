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

const ReviewCard = ({ loginpop, isClickable , id, name, profilepic, rating, review, like, dislike, handleLike,createdFor , deleteReview}) => {
        const [userReaction, setUserReaction] = useState({
            liked: false,
            disliked: false
        });
        const [likeCount, setLikeCount] = useState(like.length);
        const [dislikeCount, setDislikeCount] = useState(dislike.length);
        const [{logged,logged_as},dispatch] = useDataLayerValue();
        const location = useLocation();
        const [isEditing,setIsEditing] = useState(false)
        const [permDetails,setPermDetails] = useState({
            permreview:review,
            permrating:rating,
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
    handleLike(id, reactionType);
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
  console.log(id);
},[])

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
        const response = await axios.patch(`/api/v1/review/${id}`,{
            rating,
            review:editDetails.editreview
        })
        console.log(response);
        setPermDetails({
            permrating:rating,
            permreview:editDetails.editreview
        })
        setIsEditing(false)
    } catch (error) {
        
    }
}

    return (
        <div className="review-card">
           <div className="my-reviews-page-flex-div">
                <div className="header">
                    <img src={profilepic} alt="Profile" className="profilePic" />
                    <div className="name">{name}</div>
                </div>
                {location.pathname === '/myaccount/studentprofile/myreviews' ? 
                <>
                    <div className="reviews-page-options-icons">
                             {isEditing ?
                                <>
                                <div className="save" onClick={handleSaveClick}>
                                    <SaveIcon/>
                                </div>
                                <div className="cancel" onClick={()=>setIsEditing(false)}>
                                    <CloseIcon/>
                                </div>
                                </>
                            :
                            <>
                                <div className="blue" onClick={HandleEditClick}>
                                    <EditIcon/>
                                </div>
                                <div className="red" onClick={()=>deleteReview(id)}>
                                    <DeleteIcon/>
                                </div>
                            </>
                            }
                    </div>
                    <div>
                        <ArrowRightAltIcon fontSize="large"/>
                    </div>
                    <div className="header">
                        <img src={createdFor.profilepic} alt="Profile" className="profilePic" />
                        <div className="name">{createdFor.name}</div>
                    </div>
                </>
                :
                 <></>
                 }
           </div>
            {/* <div className="rating">
               <DisplayRating rating={rating}/>
            </div> */}
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
            <div className="footer">
                <div className="likeSection icon-cntr" onClick={isClickable ? () => handleLikeClicks('like'): undefined}>
                    <ThumbUpOutlinedIcon color={userReaction.liked ? 'primary' : 'action'} />
                    <p>{likeCount}</p>
                </div>
                <div className="dislikeSection icon-cntr" onClick={isClickable? () => handleLikeClicks('dislike') : undefined}>
                    <ThumbDownOutlinedIcon color={userReaction.disliked ? 'error' : 'action'} />
                    <p>{dislikeCount}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
