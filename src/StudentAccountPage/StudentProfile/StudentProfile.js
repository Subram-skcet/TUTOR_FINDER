import React, { useState,useRef, useEffect } from 'react';
import './StudentProfile.css';
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import EditIcon from '@mui/icons-material/Edit';
import { IoIosSave } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { MdEdit } from "react-icons/md";

const StudentProfile = () => {
  const [{ asStudent }, dispatch] = useDataLayerValue();
  const [isEditing, setIsEditing] = useState(false);
  const [saveBtnLoading,setSaveBtn] = useState(false)
  const [errorText,setErrorText] = useState('')
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
    const { name } = profile
    setEditDetails({name});
    setSelectedImage(permImage)
    if(errorText){
      setErrorText('')
    }
    setIsEditing(true);
  } 

  const ValidateUser = ()=>{
    console.log(editDetails.name);
    if(!editDetails || !editDetails.name || !editDetails.name.trim()){
      setErrorText("Name cannot be empty!")
      return false;
    }

    if(editDetails.name.length < 20){
      setErrorText("Name cannot be more than 20 charaters")
      return false;
    }

    return true;
      
  }


  const handleSaveClick = async(e) => {
    e.preventDefault()
    const userValidated = ValidateUser()

    console.log("Validate" , userValidated);

    console.log(editDetails);

    if(userValidated){
    console.log("means Validated");
      setSaveBtn(true)
      let updatedProfilePic = profile.profilepic
  
      if (selectedImage.file && selectedImage.file!==permImage.file) {

        if(profile.profilepic !== "https://res.cloudinary.com/diokpb3jz/image/upload/v1722887830/samples/s8yfrhetwq1s4ytzwo39.png"){
          const response = await axios.delete(`/api/v1/student/delete-img?url=${encodeURIComponent(profile.profilepic)}`);
           if(response.status === 200)
              console.log("Image deleted");
        }

        const formData = new FormData();
        formData.append('image', selectedImage.file);
        try {
          const response = await axios.post('/api/v1/student/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          updatedProfilePic = response.data.image;
          console.log(updatedProfilePic);
        } catch (error) {
          console.log(error.message);
        }
      }
      
      try {
        const response = await axios.patch(`/api/v1/student/`, { 
          ...editDetails,
          ...(updatedProfilePic !== profile.profilepic && { profilepic: updatedProfilePic })
        });
        let updatedDetails = response.data.user
        setProfile(updatedDetails)
        setPermImage(selectedImage)
        let newStudentDetails = { ...asStudent, ...updatedDetails };
        console.log(newStudentDetails);
        dispatch({
          type:"SET_STUDENT",
          payload:newStudentDetails
        })
        toast.success('Profile saved successfully!!')
      } catch (error) {
        toast.error("Couldn't save profile. Try again later")
        console.log(error.message);
      }
      finally{
        setIsEditing(false)
        setSaveBtn(false)
      }

    }
  };

  const handleChange = (e) => {
    if(errorText){
      setErrorText('');
   }
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
        <p className='student-profile-para poppins-font'>Welcome to your profile page!</p>
      </div>
      <form onSubmit={handleSaveClick}>

      <div className="student-profile-header">
        <div className="student-profile-picture">
          <div className='profile-picture'>
            <img className='pfp-img' src={isEditing? selectedImage.url:permImage.url} alt={`${profile.name}'s profile`}/>
          </div>
            <div className={`hf-crc ${isEditing ? ``: `invis`}`}></div>
          <div className={`profile-edit-icon ${isEditing ? ``: `invis`}`} extr onClick={handleIconClick}>
              <EditIcon fontSize='medium' />
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
              className='std-pfp-nm-inp'
              value={editDetails.name}
              onChange={handleChange}
              minLength={5}
              maxLength={20}
            />
          ) : (
            <h1>{profile.name}</h1>
          )}
        </div>
      </div>
      {
        isEditing?
        <>
         {errorText && 
                    <div className='error-para-div er-streg'>
                         <div className='amber-icon'>
                             <WarningAmberIcon/>
                         </div>
                        <p className='errorText'>{errorText}</p>
                    </div>
          }
        <div className='isedit-btns-div'>
          <button className="edit-prof-btn" type='submit' disabled={saveBtnLoading}>
            <div className={`itms-cntr style-links-updated edit-styl ${saveBtnLoading ? `save-load-btn-style`:``}`}>
            <IoIosSave size="1.45em"/>
              <p>Save Profile</p>
            </div>
          </button>
          <button className="edit-prof-btn" onClick={handleCancelClick}>
            <div className='itms-cntr style-links-updated cncl-bck' >
            <MdCancel  size="1.45em"/>
              <p>Cancel</p>
            </div>
          </button> 
        </div>
        </>
        :
        <button className="edit-prof-btn" onClick={handleEditClick}>
          <div className='itms-cntr style-links-updated norm-style' >
              <MdEdit size="1.45em"/>
            <p>Edit Profile</p>
          </div>
        </button> 
      }
      </form>
    </div>
  );
};

export default StudentProfile;
