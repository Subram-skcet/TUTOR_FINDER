import React from 'react';
import './ImageSlider.css';

const ImageSlider = () => {
  return (
    <div className='slider-container'>
      <div className='img-wrapper'>
        <img
          src="https://www.brunel.ac.uk/news-and-events/news/images/tuition-920.jpg?q=70&f=webp"
          alt="Student at university"
        />
        <img
          src='https://res.cloudinary.com/highereducation/images/f_auto,q_auto/v1659634197/BestColleges.com/BC_What-Is-Student-Teaching_247733fd61/BC_What-Is-Student-Teaching_247733fd61.jpg'
          alt="Student teaching"
        />
        <img
          src='https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?cs=srgb&dl=pexels-max-fischer-5212345.jpg&fm=jpg'
          alt="Classroom with students"
        />
        <img
          src='https://www.totaljobs.com/advice/wp-content/uploads/Teacher-job-description-1-1024x576.jpg'
          alt="Teacher in classroom"
        />
      </div>
    </div>
  );
};

export default ImageSlider;
