import React, { useState, useRef,useEffect, Profiler } from 'react';
import './MyProfile.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import axios from 'axios';
import DisplayRating from '../../components/DisplayRating'
import CloseIcon from '@mui/icons-material/Close';
import { subjects,qualifications,stateDistricts } from '../../components/stateExporter';
import SelectedSubject from '../AddTution/Subjects';
import { toast } from 'react-toastify';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [{ asTeacher }, dispatch] = useDataLayerValue();
  const [saveBtnLoading,setSaveBtn] = useState(false)

  const [profile, setProfile] = useState({
    profilepic: asTeacher.profilepic || 'https://res.cloudinary.com/diokpb3jz/image/upload/v1722887830/samples/s8yfrhetwq1s4ytzwo39.png',
    name: asTeacher.name || '',
    about: asTeacher.about || '',
    mobileno: asTeacher.mobileno || '',
    numOfReviews: asTeacher.numOfReviews || 0,
    numOfTutions: asTeacher.numOfTutions || 0,
    qualification: asTeacher.qualification || '',
    subjects: asTeacher.subjects || 'Not specified',
    year_of_exp: asTeacher.year_of_exp || 0,
    district: asTeacher.district || '',
    state: asTeacher.state || '',
    averageRating: asTeacher.averageRating,
  });

  const [editDetails,setEditDetails] = useState({})
  const [errorText,setErrorText] = useState('Error Text')

  
  const [selectedImage, setSelectedImage] = useState({
    url: profile.profilepic,
    file: null
  });
  
  const [permImage, setPermImage] = useState(selectedImage)

  const fileInputRef = useRef(null);

  const districts = stateDistricts[editDetails.state] || [];

  const fetchTutionCountAndRating = async () => {
    try {
      const response = await axios.get(`/api/v1/teacher/`);
      const updatedDetails = {
        ...asTeacher,
        numOfTutions: response.data.teacher.numOfTutions,
        numOfReviews: response.data.teacher.numOfReviews
      };
  
      // Update global state
      dispatch({
        type: "SET_TEACHER",
        payload: updatedDetails
      });
  
      // Update local profile state
      setProfile(prevProfile => ({
        ...prevProfile,
        numOfTutions: response.data.teacher.numOfTutions,
        numOfReviews: response.data.teacher.numOfReviews
      }))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
      fetchTutionCountAndRating()
  },[])

  const HandleSubjectSelect = (e) => {
    const selectedSubject = e.target.value;
    if (!editDetails.subjects.includes(selectedSubject)) {
      setEditDetails((prevDetails) => ({
        ...prevDetails,
        subjects: [...prevDetails.subjects, selectedSubject],
      }));
    }
  };

  const HandleSubjectRemove = (subjectToRemove) => {
    setEditDetails((prevDetails) => ({
      ...prevDetails,
      subjects: prevDetails.subjects.filter((subject) => subject !== subjectToRemove),
    }));
  }; 

   

  const backgroundStyle = {
    backgroundImage: isEditing? `url(${selectedImage.url})`: `url(${permImage.url})`,
    backgroundSize: 'cover',
    border: '4px solid #0abb77',
    position: 'relative'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditDetails(prevProfile => ({ ...prevProfile, [name]: value }));
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

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setEditDetails((prevDetails) => ({
      ...prevDetails,
      state: selectedState,
      district: '',
    }));
  };

  const handleEditClick = () =>{
    const {profilepic,numOfReviews,numOfTutions,averageRating,...rest} = profile 
    setEditDetails({...rest})
    setSelectedImage(permImage)
    setIsEditing(!isEditing);
  }
  
  const ValidateUser = ()=>{

    if(!editDetails.name.trim() || !editDetails.mobileno.trim() || !editDetails.state.trim() || !editDetails.district.trim() || !editDetails.qualification.trim() || editDetails.subject.length === 0){
       setErrorText("Enter all details")
       return false
    }

    if(editDetails.name.length < 5){
      setErrorText("Name should be atleast 5 characters")
      return false
    }

    if(editDetails.name.length > 20){
      setErrorText("Name cannot be greater than 20 characters")
      return false
    }

    if(editDetails.mobileno.length !== 10){
      setErrorText("Mobile number must be of length 10")
    }

    const mbnoRegex = /^[0-9]{10}$/;
    if (!mbnoRegex.test(editDetails.mobileno)) {
      setErrorText("Enter a valid 10-digit Mobile Number");
      return false;
    }

    if(editDetails.subject.length === 0){
      setErrorText("Choose atleast one subject that you could teach")
      return false
    }
    return true;
      
  }

  const handleSaveClick = async (e) => {
    e.preventDefault()
    console.log("Came in");


    const userValidated = ValidateUser()

    console.log("Validated Status = ", userValidated);

    if(userValidated){
      setSaveBtn(true)
      let updatedProfilePic = profile.profilepic;
  
      if (selectedImage.file && selectedImage.file!==permImage.file) {
        const formData = new FormData();
        formData.append('image', selectedImage.file);
        try {
          const response = await axios.post('/api/v1/student/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          updatedProfilePic = response.data.image;
        } catch (error) {
          console.log(error.message);
        }
      }
  
  
      try {
        const response = await axios.patch(`/api/v1/teacher/`, { 
          ...editDetails,
          ...(updatedProfilePic !== profile.profilepic && { profilepic: updatedProfilePic })
        }
        );
        if(response.status === 200){
          const updatedProfile = response.data.teacher;
          setProfile(prevProfile => ({ ...prevProfile, ...updatedProfile }));
          setPermImage(selectedImage)
          dispatch({ type: "SET_TEACHER", payload: updatedProfile });
          setSaveBtn(false)
          toast.success('Profile saved successfully!!')
        }
      } catch (error) {
        toast.error("Couldn't save profile. Try again later")
        console.log(error.message);
      }
      finally{
        setSaveBtn(false)
        setIsEditing(false);
      }

    }
  };

  const handleCancelClick = () =>{
    setIsEditing(false);
  }

  const handleIconClick = () => fileInputRef.current.click();

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
        <div className="teacher-profile-picture">
          <img src={isEditing? selectedImage.url:permImage.url} alt={`${profile.name}'s profile`}/>
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
          <h1>{profile.name}</h1>
        </div>
        <form onSubmit={handleSaveClick}>

        <div className="profile-details">

             <div className="label">Name:</div>
             {
              isEditing ?
              <input
                  type='text'
                   className="value"
                   name="name"
                   value={editDetails.name}
                   onChange={handleChange}
                   minLength={5}
                   maxLength={20}
                   required
               />
               :
               <div className="value">{profile.name}</div>
             }

             <div className="label">Mobile Number:</div>
             {
              isEditing ?
              <input
                   type='tel'
                   className="value"
                   name="mobileno"
                   value={editDetails.mobileno}
                   onChange={handleChange}
                   pattern='^[0-9]{10}$'
                   minLength={10}
                   maxLength={10}
                   required
               />
               :
               <div className="value">{profile.mobileno}</div>
             }

             <div className="label">Years of Experience:</div>
             {
              isEditing?
              <input
                   type='number'
                   className="value"
                   name="year_of_exp"
                   value={editDetails.year_of_exp}
                   onChange={handleChange}
                   required
               />
               :
               <div className="value">{profile.year_of_exp}</div>
             }
          <div className='label'>State</div>
          {
            isEditing?
            <div>
                <select className='profile-select'  name='state' value={editDetails.state} onChange={handleStateChange} required>
                {Object.keys(stateDistricts).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
                </select>
            </div>
            :
            <div className='value'>{profile.state}</div>
          }
          <div className='label'>District</div>
          {
            isEditing?
            <div>
                <select className='profile-select' name='district' value={editDetails.district} onChange={handleChange} required>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                 ))}
                </select>
            </div>
            :
            <div className='value'>{profile.district}</div>
          }
          <div className='label'>Qualification</div>
          {
            isEditing ?
            <div>
              <select className='profile-select' name='qualification' value={editDetails.qualification} onChange={handleChange} required>
                {
                  qualifications.map((qualification)=>(
                    <option value={qualification.value}>{qualification.value}</option>
                  ))
                }
              </select>
            </div>
            :
            <div className='value'>{profile.qualification}</div>
          }


          <div className='subj-label'>My Subjects</div>
          {
            isEditing?
            <div className='subjects-list'>
                <select className='profile-select add-subj' onChange={HandleSubjectSelect}>
                    <option value="">Add Subjects</option>
                    {subjects.map((subject)=>(
                      <option value={subject.value}>{subject.label}</option>
                    ))}
                 </select>
                  <div className="selected-items">
                    {editDetails.subjects.map((subject) => (
                      <SelectedSubject key={subject} Subject={subject} delFunction={HandleSubjectRemove} />
                    ))}
                  </div>
              </div>
            :
            <div className='value'>
                 {profile.subjects.join(', ')}
              </div>
          }
          {Object.entries({
            'Number of Tutions': 'numOfTutions',
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
              value={editDetails.about}
              onChange={handleChange}
              required
              />
            ) : (
            <p className="about-content-p">{profile.about}</p>
          )}
        </div>
      <div className='edit-btns-pfp-pg'>
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
        <div className='my-prof-isedit-btns-div'>
          <button className="edit-prof-btn" type='submit' disabled={saveBtnLoading}>
            <div className={`itms-cntr style-links-updated edit-styl ${saveBtnLoading ? `save-load-btn-style`:``}`}>
              <SaveIcon /> 
              <p>Save Profile</p>
            </div>
          </button>
          <button className="edit-prof-btn" onClick={handleCancelClick}>
            <div className='itms-cntr style-links-updated cncl-bck'>
              <CloseIcon /> 
              <p>Cancel</p>
            </div>
          </button>
        </div>
        </>
          :
          <button className="edit-prof-btn">
            <div className='itms-cntr style-links-updated norm-style' onClick={handleEditClick}>
              <EditIcon />
              <p>Edit Profile</p>
            </div>
          </button>
        }
        </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
