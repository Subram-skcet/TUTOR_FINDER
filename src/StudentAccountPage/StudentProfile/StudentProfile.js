import React, { useState,useRef, useEffect } from 'react';
import './StudentProfile.css';
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentProfile = () => {
  const [{ asStudent }, dispatch] = useDataLayerValue();
  const [isEditing, setIsEditing] = useState(false);
  const [saveBtnLoading,setSaveBtn] = useState(false)
  const [profile, setProfile] = useState({
    profilepic: asStudent.profilepic,
    name: asStudent.name,
  });

  const fileInputRef = useRef(null);

  const [editDetails,setEditDetails] = useState({})

  const [permImage, setPermImage] = useState({
    url: profile.profilepic,
    file: null
  });
  
  const [selectedImage, setSelectedImage] = useState({})

  useEffect(()=>{
      console.log(asStudent);
      setProfile({
        profilepic: asStudent.profilepic,
        name: asStudent.name,
      })
  },[asStudent])

  const handleEditClick = () =>{
    setEditDetails(profile);
    setSelectedImage(permImage)
    setIsEditing(true);
  } 


  const handleSaveClick = async() => {
    setSaveBtn(true)
    let updatedProfilePic = profile.profilepic

    if (selectedImage.file && selectedImage.file!==permImage.file) {
      const formData = new FormData();
      formData.append('image', selectedImage.file);
      try {
        const response = await axios.post('/api/v1/student/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        updatedProfilePic = response.data.image;
        console.log(updatedProfilePic);
        setPermImage(selectedImage)
      } catch (error) {
        console.log(error.message);
      }
    }
    
    try {
      const response = await axios.patch(`/api/v1/student/`,{ ...editDetails, profilepic: updatedProfilePic })
      let updatedDetails = response.data.user
      setProfile(updatedDetails)
      let newStudentDetails = { ...asStudent, ...updatedDetails };
      console.log(newStudentDetails);
      dispatch({
        type:"SET_STUDENT",
        payload:newStudentDetails
      })
      setSaveBtn(false)
      toast.success('Profile saved successfully!!')
    } catch (error) {
      toast.error("Couldn't save profile. Try gain later")
      console.log(error.message);
    }
    finally{
      setIsEditing(false)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditDetails((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleIconClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage({
        url: URL.createObjectURL(file),
        file: file
      });
    }
    console.log(selectedImage);
  };

  const handleCancelClick = () =>{
    setIsEditing(false);
  }

  return (
    <div className="student-profile-container">
      <div className="student-profile-footer">
        <p className='student-profile-para'>Welcome to your profile page!</p>
      </div>
      <div className="student-profile-header">
        <div className="student-profile-picture">
          <img src={isEditing? selectedImage.url:permImage.url} alt={`${profile.name}'s profile`}/>
          <div className={`profile-edit-icon ${isEditing ? ``: `invis`}`} extr onClick={handleIconClick}>
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
        <div className="student-profile-info">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editDetails.name}
              onChange={handleChange}
            />
          ) : (
            <h1>{profile.name}</h1>
          )}
        </div>
      </div>
      {
        isEditing?
        <div className='isedit-btns-div'>
          <button className="edit-prof-btn spz" onClick={handleSaveClick} disabled={saveBtnLoading}>
            <div className={`itms-cntr style-links-updated edit-styl ${saveBtnLoading ? `save-load-btn-style`:``}`}>
              <SaveIcon/>
              <p>Save Profile</p>
            </div>
          </button>
          <button className="edit-prof-btn spz" onClick={handleCancelClick}>
            <div className='itms-cntr style-links-updated cncl-bck' >
              <CloseIcon /> 
              <p>Cancel</p>
            </div>
          </button> 
        </div>
        :
        <button className="edit-prof-btn spz" onClick={handleEditClick}>
          <div className='itms-cntr style-links-updated norm-style' >
              <EditIcon />
            <p>Edit Profile</p>
          </div>
        </button> 
      }
    </div>
  );
};

export default StudentProfile;
