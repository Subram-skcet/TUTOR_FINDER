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
              <img src="https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Profile" 
              />
            </div>
            <div className="card-details">
              <h2>Jake</h2>
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
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBXNuO6PezhC18aYH_2cYtS0I7KbxoKYdwA&shttps://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile" />
            </div>
            <div className="card-details">
              <h2>Peter</h2>
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
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBXNuO6PezhC18aYH_2cYtS0I7KbxoKYdwA&s" alt="Profile" />
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
