import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { MdOutlineStar } from "react-icons/md";


const RatingComponent = forwardRef((props, ref) => {
  const [rating, setRating] = useState(props.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
  };

  const handleHover = (value) => {
    setHoverRating(value);
  };

  const handleMouseOut = () => {
    setHoverRating(0);
  };

  // Use useImperativeHandle to expose a method to the parent
  useImperativeHandle(ref, () => ({
    callRatingInitializer: () => {
      setRating(0); // Method exposed to parent
    },
    returnRating:()=>{
      return rating
    }
  }));

  return (
    <div>
      <div style={{ display: 'flex', gap: '5px' }}>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleClick(value)}
            onMouseOver={()=>handleHover(value)}
            onMouseOut={handleMouseOut}
            style={{
              fontSize: '24px',
              cursor: 'pointer',
              color: value <= rating ? 'gold' : (value <= hoverRating ? 'gold' : 'gray')
            }}
            title={`Rate ${value} star`}
          >
            <MdOutlineStar/>
          </span>
        ))}
      </div>
    </div>
  );
});

export default RatingComponent;
