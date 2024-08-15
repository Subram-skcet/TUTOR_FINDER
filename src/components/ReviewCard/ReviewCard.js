import React, { useEffect, useState } from "react";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import './ReviewCard.css'; // Import the CSS file
import DisplayRating from "../DisplayRating";
import { useDataLayerValue } from "../../StateProviders/StateProvider";


const ReviewCard = ({ loginpop, isClickable , id, name, profilepic, rating, review, like, dislike, handleLike }) => {
  const [userReaction, setUserReaction] = useState({
    liked: false,
    disliked: false
});
const [likeCount, setLikeCount] = useState(like.length);
const [dislikeCount, setDislikeCount] = useState(dislike.length);
const [{logged,logged_as},dispatch] = useDataLayerValue();

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

useEffect(()=>{
  console.log(id);
},[])


    return (
        <div className="review-card">
            <div className="header">
                <img src={profilepic} alt="Profile" className="profilePic" />
                <div className="name">{name}</div>
            </div>
            <div className="rating">
               <DisplayRating rating={rating}/>
            </div>
            <div className="review">{review}</div>
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
