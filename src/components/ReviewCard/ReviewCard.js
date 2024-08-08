import React from "react";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import './ReviewCard.css'; // Import the CSS file

const ReviewCard = ({ name, profilepic, rating, review, like, dislike }) => {
  return (
    <div className="review-card">
      <div className="header">
        <img src={profilepic} alt="Profile" className="profilePic" />
        <div className="name">{name}</div>
      </div>
      <div className="rating">
        {[...Array(5)].map((_, index) => 
          index < rating ? <StarIcon key={index} className="like"/> : <StarOutlineIcon key={index} className="dislike" />
        )}
      </div>
      <div className="review">{review}</div>
      <div className="footer">
        <div className="likeSection">
          <ThumbUpOutlinedIcon /> {like.length}
        </div>
        <div className="dislikeSection">
          <ThumbDownOutlinedIcon /> {dislike.length}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
