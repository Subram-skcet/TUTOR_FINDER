import React from 'react';
import './ImageSlider.css';
import sliderImg1 from '../../assets/slider-img1.webp';
import sliderImg2 from '../../assets/slider-img2.jpg';
import sliderImg3 from '../../assets/slider-img3.jpg';
import sliderImg4 from '../../assets/slider-img4.avif';


const ImageSlider = () => {
  return (
    <div className='slider-container'>
      <div className='img-wrapper'>
        <img
          src={sliderImg1}
          alt="Student at university"
        />
        <img
          src={sliderImg2}
          alt="Student teaching"
        />
        <img
          src={sliderImg3}
          alt="Classroom with students"
        />
        <img
          src={sliderImg4}
          alt="Teacher in classroom"
        />
      </div>
    </div>
  );
};

export default ImageSlider;
