import React, { useState, useImperativeHandle, forwardRef } from 'react';

const RatingComponent = forwardRef((props, ref) => {
  const [rating, setRating] = useState(props.rating || 0);

  const handleClick = (value) => {
    setRating(value);
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
            style={{
              fontSize: '24px',
              cursor: 'pointer',
              color: value <= rating ? 'gold' : 'gray'
            }}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
});

export default RatingComponent;
