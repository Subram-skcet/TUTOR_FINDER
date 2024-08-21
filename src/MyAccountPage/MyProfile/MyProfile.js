import React, { useState, useRef } from 'react';
import './MyProfile.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import axios from 'axios';
import DisplayRating from '../../components/DisplayRating'


const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [{ asTeacher }, dispatch] = useDataLayerValue();
  const [profile, setProfile] = useState({
    profilepic: asTeacher.profilepic || 'https://res.cloudinary.com/diokpb3jz/image/upload/v1722887830/samples/s8yfrhetwq1s4ytzwo39.png',
    name: asTeacher.name || '',
    about: asTeacher.about || '',
    mobileno: asTeacher.mobileno || '',
    numOfReviews: asTeacher.numOfReviews || 0,
    numOfTutions: asTeacher.numOfTutions || 0,
    qualification: asTeacher.qualification || '',
    subjects: asTeacher.subjects.join(', ') || 'Not specified',
    year_of_exp: asTeacher.year_of_exp || 0,
    district: asTeacher.district || '',
    state: asTeacher.state || '',
    averageRating: asTeacher.averageRating,
    email: asTeacher.email || ''
  });
  const [selectedImage, setSelectedImage] = useState({
    url: profile.profilepic,
    file: null
  });
  const fileInputRef = useRef(null);

  const backgroundStyle = {
    backgroundImage: `url(${selectedImage.url})`,
    backgroundSize: 'cover',
    border: '4px solid #0abb77',
    position: 'relative'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage({
        url: URL.createObjectURL(file),
        file: file
      });
    }
  };

  const handleEditClick = () => setIsEditing(!isEditing);

  const handleSaveClick = async () => {
    let updatedProfilePic = profile.profilepic;

    if (selectedImage.file) {
      const formData = new FormData();
      formData.append('image', selectedImage.file);
      try {
        const response = await axios.post('http://localhost:3001/api/v1/student/upload?for=teacher', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        updatedProfilePic = response.data.image;
      } catch (error) {
        console.log(error.message);
      }
    }

    const subjectsArray = Array.isArray(profile.subjects) ? profile.subjects : profile.subjects.split(',').map(subject => subject.trim());

    try {
      const response = await axios.patch(`http://localhost:3001/api/v1/teacher/${asTeacher._id}`, { ...profile, profilepic: updatedProfilePic });
      const updatedProfile = response.data.teacher;
      setProfile(prevProfile => ({ ...prevProfile, ...updatedProfile }));
      dispatch({ type: "SET_TEACHER", payload: updatedProfile });
    } catch (error) {
      console.log(error.message);
    }

    setIsEditing(false);
  };

  const handleIconClick = () => fileInputRef.current.click();

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="account-picture" style={backgroundStyle}>
            <div className={`profile-img-edit ${!isEditing ? 'invis' : ''}`} onClick={handleIconClick}>
              <EditIcon fontSize='large' />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <h1>{profile.name}</h1>
        </div>
        <div className="profile-details">
          {Object.entries({
            Name: 'name',
            'Mobile Number': 'mobileno',
            Qualification: 'qualification',
            'Subjects': 'subjects',
            'Years of Experience': 'year_of_exp',
            District: 'district',
            State: 'state',
            Email: 'email'
          }).map(([label, key]) => (
            <React.Fragment key={key}>
              <div className="label">{label}</div>
              {isEditing ? (
                <input
                  className="value"
                  name={key}
                  value={profile[key]}
                  onChange={handleChange}
                />
              ) : (
                <div className="value">{profile[key]}</div>
              )}
            </React.Fragment>
          ))}
          {Object.entries({
            'Number of Tuitions': 'numOfTutions',
            'Average Rating': 'averageRating',
          }).map(([label, key]) => (
            <React.Fragment key={key}>
              <div className="label">{label}</div>
              <div className="value">
                {label === 'Average Rating' ? (
                  <div className="rating">
                    <DisplayRating rating={profile.averageRating}/>
                    <p>({profile.numOfReviews})</p>
                  </div>
                ) : (
                  <>{profile[key]}</>
                )}
              </div>
            </React.Fragment>
          ))}
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
          <div className={`itms-cntr style-links-updated ${isEditing ? 'edit-styl' : 'norm-style'}`} onClick={isEditing ? handleSaveClick : handleEditClick}>
            {isEditing ? <SaveIcon /> : <EditIcon />}
            <p>{isEditing ? 'Save Profile' : 'Edit Profile'}</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
