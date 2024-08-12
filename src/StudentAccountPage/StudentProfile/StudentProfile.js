import React from 'react';
import './StudentProfile.css';

const StudentProfile = () => {
  const user = {
    profilepic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB3VlIHqJmoDG-I8ml40GACuxG2dn671rKfw&s',
    name: 'Janavi',
  };

  return (
    <div className="student-profile-container">
      <div className="student-profile-header">
        <div className="student-profile-picture">
          <img src={user.profilepic} alt={`${user.name}'s profile`} />
        </div>
        <div className="student-profile-info">
          <h1>{user.name}</h1>
        </div>
      </div>
      <div className="student-profile-footer">
        <p>Welcome to your profile page!</p>
      </div>
    </div>
  );
};

export default StudentProfile;
