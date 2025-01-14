import React, { useState,useRef, useEffect } from 'react';
import './StudentProfile.css';
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import { IoIosSave } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdEdit } from "react-icons/md";
import { MdWarningAmber } from "react-icons/md";
import { ThreeCircles } from 'react-loader-spinner'



const StudentProfile = () => {
  const [{ asStudent }, dispatch] = useDataLayerValue();
  const [isEditing, setIsEditing] = useState(false);
  const [saveBtnLoading,setSaveBtn] = useState(false)
  const [errorText,setErrorText] = useState('')
  const [profile, setProfile] = useState({
    profilepic: asStudent.profilepic || 'https://res.cloudinary.com/diokpb3jz/image/upload/v1722887830/samples/s8yfrhetwq1s4ytzwo39.png',
    name: asStudent.name,
  });
  const [profileLoading,setProfileLoading] = useState(true)
  

  const fileInputRef = useRef(null);

  const [editDetails,setEditDetails] = useState({})

  const [permImage, setPermImage] = useState({
    url: profile.profilepic,
    file: null
  });
  
  const [selectedImage, setSelectedImage] = useState({})

  const loadDetails = async () => {
    try {
      const response = await axios.get('/api/v1/student/')
      setProfile({
        profilepic:response.data.student.profilepic,
        name:response.data.student.name
      })
      setPermImage({
        url:response.data.student.profilepic,
        file: null
      })
    } catch (error) {
      console.log(error);  
    }
    finally{
      setProfileLoading(false)
    }

  };

  useEffect(()=>{
     loadDetails()
  },[])

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

    if(!editDetails || !editDetails.name || !editDetails.name.trim()){
      setErrorText("Please enter a name!")
      return false;
    }

    if(editDetails.name.trim().length < 3){
      setErrorText("Name must contain at least 3 characters.")
      return false
    }

    if(editDetails.name.trim().length > 20){
      setErrorText("Name must not exceed 20 characters!")
      return false;
    }

    return true;
      
  }


  const handleSaveClick = async(e) => {
    e.preventDefault()
    const userValidated = ValidateUser()

    if(userValidated){
      setSaveBtn(true)
      let updatedProfilePic = profile.profilepic
  
      if (selectedImage.file && selectedImage.file!==permImage.file) {

        if(profile.profilepic !== "https://res.cloudinary.com/diokpb3jz/image/upload/v1722887830/samples/s8yfrhetwq1s4ytzwo39.png"){
          await axios.delete(`/api/v1/student/delete-img?url=${encodeURIComponent(profile.profilepic)}`);
        }

        const formData = new FormData();
        formData.append('image', selectedImage.file);
        try {
          const response = await axios.post('/api/v1/student/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          updatedProfilePic = response.data.image;
        } catch (error) {
          toast.error("Error uploading image. Try again later")
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
        dispatch({
          type:"SET_STUDENT",
          payload:newStudentDetails
        })
        toast.success('Profile saved successfully!!')
      } catch (error) {
        toast.error("Couldn't save profile. Try again later")
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
  };

  const handleCancelClick = () =>{
    setIsEditing(false);
  }

  return (
    <>
     {
          profileLoading ? 
          <div className='circle-animation anim-cntr'>
                  <ThreeCircles
                  visible={true}
                  height="100"
                  width="100"
                  color="#3689d6"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  />
                 </div>   
                 :
                 
                 <div className="student-profile-container lato-regular">
      <div className="student-profile-footer">
        <p className='student-profile-para lato-bold'>Welcome to your profile page!</p>
      </div>
      <form onSubmit={handleSaveClick}>

      <div className="student-profile-header">
        <div className="student-profile-picture">
          <div className='profile-picture'>
            <img className='pfp-img' src={isEditing? selectedImage.url:permImage.url} alt={`${profile.name}'s profile`}/>
          </div>
            <div className={`hf-crc ${isEditing ? ``: `invis`}`}></div>
          <div className={`profile-edit-icon ${isEditing ? ``: `invis`}`} onClick={handleIconClick}>
                <MdEdit size="1.45em"/>
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
              className='std-pfp-nm-inp lato-regular'
              onChange={handleChange}
              minLength={3}
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
                            <MdWarningAmber size="1.3em"/> 
                         </div>
                        <p className='errorText'>{errorText}</p>
                    </div>
          }
        <div className='isedit-btns-div'>
          <button className="edit-prof-btn" type='submit' disabled={saveBtnLoading}>
            <div className={`itms-cntr style-links-updated edit-styl lato-regular ${saveBtnLoading ? `save-load-btn-style`:``}`}>
            <IoIosSave size="1.45em"/>
              <p>Save</p>
            </div>
          </button>
          <button className="edit-prof-btn" onClick={handleCancelClick}>
            <div className='itms-cntr style-links-updated cncl-bck lato-regular' >
            <MdCancel  size="1.45em"/>
              <p>Cancel</p>
            </div>
          </button> 
        </div>
        </>
        :
        <button className="edit-prof-btn" onClick={handleEditClick}>
          <div className='itms-cntr style-links-updated norm-style lato-regular' >
              <MdEdit size="1.45em"/>
            <p>Edit</p>
          </div>
        </button> 
      }
      </form>
    </div>
}
  </>
  );
};

export default StudentProfile;
