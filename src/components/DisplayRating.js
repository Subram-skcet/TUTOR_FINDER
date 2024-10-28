import React from 'react';

const DisplayRating = ({rating,noOfReviews}) => {
  return (
    <div>
      <div style={{ display: 'flex', gap: '5px' }}>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            style={{
              fontSize: '24px',
              color: value <= rating ? 'gold' : 'gray'
            }}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default DisplayRating;
