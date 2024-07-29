import React, { useState } from 'react';
import './MyProfile.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure this is correctly imported
import EditIcon from '@mui/icons-material/Edit';
import SidebarItem from '../Sidebar/Sidebar-items/SidebarItem';
import SaveIcon from '@mui/icons-material/Save';



const backgroundImage = 'https://img.freepik.com/free-vector/circles-background-dark-tones_60389-166.jpg?ga=GA1.1.711888986.1720101620&semt=ais_user'; // Example background image URL



const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Smith',
    subjectHandling: 'Cyber Security',
    board: 'CBSE, TNSB, KRSB, etc.',
    teachingLanguage: 'Tamil, English',
    standardHandling: 'For All',
    experience: '5',
    about: 'Security Researcher | Bug Bounty Hunter | THM Top 2% |🏅Secured Microsoft, NASA, United Nations, U.S Department of Homeland Security, Indian Government +21 More Companies🌟'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    // Add save logic here
    setIsEditing(false);
  };

  return (
    <div className="profile-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-picture">
            
            {/* Add profile picture here */}
          </div>
          <h1>{profile.name}</h1>
        </div>
        <div className="profile-details">
          <div className="label">Name</div>
          {isEditing ? (
            <input
              className="value"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          ) : (
            <div className="value">{profile.name}</div>
          )}

          <div className="label">Subject Handling</div>
          {isEditing ? (
            <input
              className="value"
              name="subjectHandling"
              value={profile.subjectHandling}
              onChange={handleChange}
            />
          ) : (
            <div className="value">{profile.subjectHandling}</div>
          )}

          <div className="label">Board</div>
          {isEditing ? (
            <input
              className="value"
              name="board"
              value={profile.board}
              onChange={handleChange}
            />
          ) : (
            <div className="value">{profile.board}</div>
          )}

          <div className="label">Teaching Language</div>
          {isEditing ? (
            <input
              className="value"
              name="teachingLanguage"
              value={profile.teachingLanguage}
              onChange={handleChange}
            />
          ) : (
            <div className="value">{profile.teachingLanguage}</div>
          )}

          <div className="label">Standard Handling</div>
          {isEditing ? (
            <input
              className="value"
              name="standardHandling"
              value={profile.standardHandling}
              onChange={handleChange}
            />
          ) : (
            <div className="value">{profile.standardHandling}</div>
          )}

          <div className="label">Years of Experience</div>
          {isEditing ? (
            <input
              className="value"
              name="experience"
              value={profile.experience}
              onChange={handleChange}
            />
          ) : (
            <div className="value">{profile.experience}</div>
          )}
        </div>
        <div className="about-section">
          <p className="about-heading">About</p>
          {isEditing ? (
            <textarea
              className="about-content"
              name="about"
              value={profile.about}
              onChange={handleChange}
            />
          ) : (
            <p className="about-content">{profile.about}</p>
          )}
        </div>
        <button className="edit-prof-btn spz" onClick={isEditing ? handleSaveClick : handleEditClick}>
        <div className={`itms-cntr style-links ${isEditing? 'edit-styl':'norm-style'}`} onClick={isEditing ? handleSaveClick : handleEditClick}>
          {isEditing?<SaveIcon/>: <EditIcon />}
            <p className='icon-para'>{isEditing ? 'Save Profile' : 'Edit Profile'}</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
