import React, { useEffect, useState } from "react";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import './ReviewCard.css'; // Import the CSS file

const ReviewCard = ({ isClickable , id, name, profilepic, rating, review, like, dislike, handleLike }) => {
  const [userReaction, setUserReaction] = useState({
    liked: false,
    disliked: false
});
const [likeCount, setLikeCount] = useState(like.length);
const [dislikeCount, setDislikeCount] = useState(dislike.length);

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
                {[...Array(5)].map((_, index) => 
                    index < rating ? <StarIcon key={index} className="rated"/> : <StarOutlineIcon key={index} className="not-rated" />
                )}
            </div>
            <div className="review">{review}</div>
            <div className="footer">
                <div className="likeSection" onClick={isClickable ? () => handleLikeClicks('like'): undefined}>
                    <ThumbUpOutlinedIcon color={userReaction.liked ? 'primary' : 'action'} />
                    {likeCount}
                </div>
                <div className="dislikeSection" onClick={isClickable? () => handleLikeClicks('dislike') : undefined}>
                    <ThumbDownOutlinedIcon color={userReaction.disliked ? 'error' : 'action'} />
                    {dislikeCount}
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
