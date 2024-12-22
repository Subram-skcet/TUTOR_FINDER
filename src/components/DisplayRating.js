import React from 'react';
import { IoMdStar } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";

const DisplayRating = ({rating}) => {
  return (
    <div style={{height:'max-content'}}>
      <div style={{ display: 'flex', columnGap: '5px',  height:'18px'}}>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            style={{
              color: value <= rating ? 'gold' : '#434343'
            }}
          >
            <MdOutlineStar size="1.2em"/>
          </span>
        ))}
      </div>
    </div>
  );
};

export default DisplayRating;
