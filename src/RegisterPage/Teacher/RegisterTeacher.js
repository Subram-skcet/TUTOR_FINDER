import React, { useState, useEffect } from 'react';
import './RegisterTeacher.css';
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import { useNavigate } from 'react-router-dom';
import SelectedSubject from '../../MyAccountPage/AddTution/Subjects';
import axios from 'axios';
import { stateDistricts,subjects } from '../../components/stateExporter'
import doneimg from '../../assets/done.png'
import loadgif from '../../assets/89.gif'
import { toast } from 'react-toastify';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const RegisterTeacher = ({openLogin}) => {
  const [{ logged }, dispatch] = useDataLayerValue();
  const [teacherDetails, setDetails] = useState({
    name: '',
    email: '',
    password: '',
    mobileno: '',
    qualification: '',
    subjects:[],
    state: '',
    district: '',
    year_of_exp: 0,
  });
  const [otpDetails,setOtpDetails] = useState(
    {
      otp:new Array(6).fill(""),
      isVisible:false,
      isVerified:false,
    }
  )
  const [ isVerifyClickable, setVerifyClickable ] =useState(true)
  const [errorText,setErrorText] = useState('')

  const navigate = useNavigate();

  const handleOtpSend = async()=>{
    if(!teacherDetails.email.trim()){
      setErrorText("Enter email to verify it")
      return
    }
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!emailRegex.test(teacherDetails.email)){
      setErrorText("Enter valid email to verify it")
      return
    }
    setVerifyClickable(false)
    try {
      const response = await axios.post('/api/v1/auth/generateotp',
        {
          email:teacherDetails.email,
          role:'teacher'
        }
      )
      if(response.status === 201){
        toast.info("OTP has sent to your mail. Enter it below. Valid for only 15 minutes.");
        setOtpDetails((prevDetails)=>({
          ...prevDetails,
          isVisible:true
        }))
      }

      console.log(response);
    } catch (error) {
      if(error.response && error.response.data){
        toast.error(error.response.data.message)
      }
      else{
          toast.error("Something went wrong please try again later")
      }
  }
    finally{
      setVerifyClickable(true)
    }
}

const handleOtpSubmit = async() => {
  if(!teacherDetails.email.trim()){
    setErrorText("Enter email first")
    return;
  }
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(!emailRegex.test(teacherDetails.email)){
    setErrorText("Enter valid email to verify it")
    return
  }
  if(otpDetails.otp.join('').length !== 6){
    setErrorText("Enter all digits to verify the otp")
    return;
  }

  try {
   const response = await axios.post('/api/v1/auth/verifyemail',{
     email:teacherDetails.email,
     otp:otpDetails.otp.join('')
   })
   if(response.status === 200){
    toast.success(response.data.message)
    setOtpDetails((prevDetails)=>(
      {
        ...prevDetails,
        isVerified:true,
        isVisible:false
      }
    ))
  }
   console.log(response);
  } catch (error) {
    if(error.response && error.response.data){
      if(error.response.data.message.includes("expired")){
        toast.warn(error.response.data.message)
        setOtpDetails({
          otp:new Array(6).fill(""),
          isVisible:false,
          isVerified:false,
        })
      }
      else
        toast.error(error.response.data.message)
    }
    else{
        toast.error("Something went wrong please try again later")
    }
   }
}

const handleOtpChange = (element, index) => {
  if(errorText){
    setErrorText('')
  }
  const value = element.value;
  if (/^[0-9]$/.test(value) || value === "") {
    const newOtp = [...otpDetails.otp];
    newOtp[index] = value;

    setOtpDetails({
      ...otpDetails,
      otp: newOtp, // Update only otp key inside otpDetails
    });

    // Move to the next input field
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  }
};

const handleBackspace = (e, index) => {
  if(errorText){
    setErrorText('')
  }
  if (e.key === "Backspace" && otpDetails.otp[index] === "") {
    if (index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  }
};
   
const validateUser = () =>{
       if(!teacherDetails.name.trim() || !teacherDetails.email.trim() || !teacherDetails.password.trim() || !teacherDetails.mobileno.trim() || !teacherDetails.qualification.trim() || !teacherDetails.state.trim() || teacherDetails.subjects.length === 0){
           setErrorText("Enter all details")
           return false
       }

       if(!teacherDetails.name.length > 20){
        setErrorText("Name should be less than 20 characters")
         return false;
       }

       const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
       if(!emailRegex.test(teacherDetails.email)){
         setErrorText("Enter valid email to verify it")
         return false
       }

       if(!teacherDetails.password.length > 5){
        setErrorText("Password should be atleast 5 characters")
         return false;
       }

       if(teacherDetails.mobileno.length !== 10){
          setErrorText("Mobile number should have 10 digits")
          return false;
       }

       if(!otpDetails.isVerified){
        setErrorText("Verify email to register")
        return false;
       }

       return true;
   }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Teacher Details = ", teacherDetails);
    const userValidated = validateUser()

    if(userValidated){
        let setTeacher;
        try {
        const response = await axios.post('/api/v1/auth/registerteacher',teacherDetails );
        
        console.log(response);
        if(response.status === 201){
          toast.success('User registered succcessfully')
          setTeacher = response.data.teacherData
        console.log("Here the response = " , setTeacher);
        dispatch({ type: 'LOG_USER', payload: true });
        dispatch(
          {
            type:"SET_TEACHER",
            payload:setTeacher
          }
        )
        dispatch(
          {
            type:"LOGGED_USER",
            payload:'teacher'
          }
        )
        navigate('/myaccount/teacherprofile/myprofile')
        }
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
  };

  const handleChange = (e) => {
    if(errorText){
      setErrorText('')
    }
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleStateChange = (e) => {
    if(errorText){
      setErrorText('')
    }
    const selectedState = e.target.value;
    setDetails((prevDetails) => ({
      ...prevDetails,
      state: selectedState,
      district: '',
    }));
  };

  const HandleSubjectSelect = (e) => {
    if(errorText){
      setErrorText('')
    }
    const selectedSubject = e.target.value;
    if (!teacherDetails.subjects.includes(selectedSubject)) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        subjects: [...prevDetails.subjects, selectedSubject],
      }));
    }
  };

  const HandleSubjectRemove = (subjectToRemove) => {
    if(errorText){
      setErrorText('')
    }
    setDetails((prevDetails) => ({
      ...prevDetails,
      subjects: prevDetails.subjects.filter((subject) => subject !== subjectToRemove),
    }));
  };

  const districts = stateDistricts[teacherDetails.state] || [];

  return (
    <div className='teacher-signup-wrap'>
      <div>
        <h4>Create your Teacher account in EduQuest</h4>
      </div>

    <div className='teacher-reg-wrap'>
      <form className='teacher-reg-form' onSubmit={handleSubmit}>
       <div className='teacher-det-wrap'>

        <div className='space-div'>
          <label htmlFor='name'  className='register-label'>Name:</label>
          <input
            type='text'
            name='name'
            id='name'
            value={teacherDetails.name}
            onChange={handleChange}
            maxLength={20}
            required
            />
        </div>

        <div className='space-div'>
          <div className='email-label-flex'>
          <label htmlFor='email' className='register-label'>Email:</label>
            {otpDetails.isVerified ?
            <div className='verified-div'>
              <img src={doneimg} className='done-img'/>
              <p className='verified-div-para'>Verified</p>
            </div>
            :
            isVerifyClickable?
            <p className='link-colour' onClick={()=>handleOtpSend()}>
             Verify
            </p>
           :
           <img src={loadgif} className='verify-load-gif' alt='Load'/>
            }
          </div>
          <input
            type='email'
            name='email'
            id='email'
            value={teacherDetails.email}
            onChange={handleChange}
            pattern='[^@\s]+@[^@\s]+\.[^@\s]+'
            required
          />
        </div>
        {
          otpDetails.isVisible ?
        <div className="form-group">
          <div className='email-label-flex'>
            <label>Enter otp:</label>
            <p className='link-colour'  onClick={()=>handleOtpSubmit()}>Submit</p>
          </div>
          <div>
            <div>
            {otpDetails.otp.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                name="otp"
                maxLength="1"
                value={otpDetails.otp[index]}
                onChange={(e) => handleOtpChange(e.target, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                style={{
                  width: "32px",
                  padding: "10px",
                  margin: "5px",
                  textAlign: "center",
                  fontSize: "15px",
                  border: "2px solid #ccc",
                  borderRadius: "4px",
                }}
                />
              ))}
            </div>
          </div>
       </div>
          :
          <div className='hide'></div>
        }
        <div className='space-div'>
          <label htmlFor='password'  className='register-label'>Password:</label>
          <input
            type='password'
            name='password'
            id='password'
            value={teacherDetails.password}
            onChange={handleChange}
            minLength={5}
            required
          />
        </div>
        <div className='space-div'>
          <label htmlFor='mobileno'  className='register-label'>Mobile No:</label>
          <input
            type='tel'
            name='mobileno'
            id='mobileno'
            value={teacherDetails.mobileno}
            pattern='[0-9]{10}'
            onChange={handleChange}
            minLength={10}
            maxLength={10}
            required
            />
        </div>
        <div className='space-div'>
          <label htmlFor='qualification'  className='register-label'>Highest Qualification:</label>
          <select
            name='qualification'
            id='qualification'
            value={teacherDetails.qualification}
            onChange={handleChange}
            required
          >
            <option value=''>Select</option>
            <option value='B.E'>B.E</option>
            <option value='M.E'>M.E</option>
            <option value='B.Sc'>B.Sc</option>
            <option value='M.Sc'>M.Sc</option>
          </select>
        </div>
        <div className='space-div'>
          <label htmlFor='yoexp'   className='register-label'>Year Of Experience:</label>
          <input
            type='number'
            name='year_of_exp'
            id='year_of_exp'
            value={teacherDetails.year_of_exp}
            onChange={handleChange}
            required
          />
        </div>
        <div className='space-div'>
          <label htmlFor='inputState'  className='register-label'>Select State:</label>
          <select
            name='state'
            id='inputState'
            value={teacherDetails.state}
            onChange={handleStateChange}
            required
          >
            <option value=''>Select State</option>
            {Object.keys(stateDistricts).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className='space-div'>
          <label htmlFor='inputDistrict'  className='register-label'>Select District:</label>
          <select
            name='district'
            id='inputDistrict'
            value={teacherDetails.district}
            onChange={handleChange}
            disabled={!teacherDetails.state}
            required
            >
            <option value=''>-- select one --</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <div className="space-div">
          <label  className='register-label'>Select Subjects you teach</label>
          <select onChange={HandleSubjectSelect} required>
            <option value="">Select a subject</option>
            {subjects.map((subject)=>
            <option value={subject.value}>{subject.label}</option>
            )}
          </select>
        </div>
          <div className="selected-items">
            {teacherDetails.subjects.map((subject) => (
              <SelectedSubject key={subject} Subject={subject} delFunction={HandleSubjectRemove} />
            ))}
          </div>
      </div>
       {errorText && 
          <div className='error-para-div er-streg'>
                        <div className='amber-icon'>
                          <WarningAmberIcon/>
                        </div>
                        <p className='errorText'>{errorText}</p>
          </div>
        }
        <div className='submit-btn-div'>
          <button
            type='submit'
            className='submit-btn'
            >
            Register
          </button>
        </div>
        <div className='log-in-div'>
          <p>Already have an account? <span className='anchor-link' onClick={()=>openLogin(true)}>Log in</span></p>
        </div>
      </form>
    </div>
  </div>
  );
};

export default RegisterTeacher;
