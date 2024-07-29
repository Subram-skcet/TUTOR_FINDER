import React, { useState } from 'react';
import './Main.css';
import Search from '../Search/Search';
import TeacherProfile from '../TeacherProfile/TeacherProfile';
import { useNavigate } from 'react-router-dom';
const Main = () => {
   const navigate = useNavigate();
  return (
    <>
    <div className='top-wst'></div>
    <div className="container">
      <div className='search-prt'>
        <h1 className='main-pg-h1'>Filter Your Search</h1>
        <Search/>
      </div>
      <div className='results-prt'>
      <h1>Your Search Results</h1>
      <div className="search-results">
        {/* Search results will be displayed here */}
        <div className="tutor-card" onClick={()=>navigate('/teacherProfile')}>
            <div className="profile-pic">
              <img src="https://www.shutterstock.com/image-photo/young-asian-teacher-man-teaching-260nw-1928551622.jpg" 
              alt="Profile" 
              />
            </div>
            <div className="card-details">
              <h2>John Doe</h2>
              <div className="rating">
                <span>⭐⭐⭐⭐⭐</span> <span className="reviews">(535)</span>
              </div>
              <p><strong>Subjects:</strong> Maths, Science</p>
              <p><strong>Time:</strong> 8:30 AM - 9:30 AM</p>
              <p><strong>Day:</strong> Tuesday - Saturday</p>
              <p><strong>Board:</strong> CSE, ICSE</p>
              <p><strong>Fees:</strong> ₹500</p>
            </div>
       </div>
       <div className="tutor-card">
            <div className="profile-pic">
              <img src="https://t3.ftcdn.net/jpg/02/65/18/30/360_F_265183061_NkulfPZgRxbNg3rvYSNGGwi0iD7qbmOp.jpg" alt="Profile" />
            </div>
            <div className="card-details">
              <h2>Mary</h2>
              <div className="rating">
                <span>⭐⭐⭐⭐⭐</span> <span className="reviews">(535)</span>
              </div>
              <p><strong>Subjects:</strong> Maths, Science</p>
              <p><strong>Time:</strong> 8:30 AM - 9:30 AM</p>
              <p><strong>Day:</strong> Tuesday - Saturday</p>
              <p><strong>Board:</strong> CSE, ICSE</p>
              <p><strong>Fees:</strong> ₹500</p>
            </div>
       </div>
       <div className="tutor-card">
            <div className="profile-pic">
              <img src="data:image/jpeg;base64,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" alt="Profile" />
            </div>
            <div className="card-details">
              <h2>Williams</h2>
              <div className="rating">
                <span>⭐⭐⭐⭐⭐</span> <span className="reviews">(535)</span>
              </div>
              <p><strong>Subjects:</strong> Maths, Science</p>
              <p><strong>Time:</strong> 8:30 AM - 9:30 AM</p>
              <p><strong>Day:</strong> Tuesday - Saturday</p>
              <p><strong>Board:</strong> CSE, ICSE</p>
              <p><strong>Fees:</strong> ₹500</p>
            </div>
       </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default Main;
