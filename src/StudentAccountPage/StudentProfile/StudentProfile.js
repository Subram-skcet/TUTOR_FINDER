import React, { useState } from 'react';
import './StudentProfile.css';
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';


const StudentProfile = () => {
  const [{ asStudent }, dispatch] = useDataLayerValue();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    profilepic: asStudent.profilepic,
    name: asStudent.name,
  });

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = () => {
       setIsEditing(false)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  return (
    <div className="student-profile-container">
      <div className="student-profile-header">
        <div className="student-profile-picture">
          <img src={profile.profilepic} alt={`${profile.name}'s profile`} />
        </div>
        <div className="student-profile-info">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          ) : (
            <h1>{profile.name}</h1>
          )}
        </div>
      </div>
      <div className="student-profile-footer">
        <p className='student-profile-para'>Welcome to your profile page!</p>
      </div>
      <button className="edit-prof-btn spz" onClick={isEditing ? handleSaveClick : handleEditClick}>
      <div className={`itms-cntr style-links-updated ${isEditing ? 'edit-styl' : 'norm-style'}`} onClick={isEditing ? handleSaveClick : handleEditClick}>
        {isEditing ? <SaveIcon /> : <EditIcon />}
        <p>{isEditing ? 'Save Profile' : 'Edit Profile'}</p>
      </div>
    </button> 
    </div>
  );
};

export default StudentProfile;
