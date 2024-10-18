import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to install axios using npm or yarn
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import './StudentRegister.css'
import { useNavigate } from 'react-router-dom';
import doneimg from '../../assets/done.png'
import { toast } from 'react-toastify';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import loadgif from '../../assets/89.gif'

const RegisterStudent = () => {
  const [{ logged,asStudent,logged_as }, dispatch] = useDataLayerValue();
  const navigate = useNavigate()
  const [ isVerifyClickable, setVerifyClickable ] =useState(true)
  const [otpDetails,setOtpDetails] = useState(
    {
      otp:new Array(6).fill(""),
      isVisible:false,
      isVerified:false,
    }
  )

  const [userDetails, setDetails] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorText,setErrorText] = useState('')
  
  useEffect(()=>{
      console.log("State updated successfully", logged_as);
  },[logged_as])
  
  const regbtnstyle = {
    width: 'max-content',
    display: 'block',
    marginInline: 'auto'
  };

  const handleOtpSend = async()=>{
    if(!userDetails.email.trim()){
      setErrorText("Enter email to verify it")
      return
    }
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!emailRegex.test(userDetails.email)){
      setErrorText("Enter valid email to verify it")
      return
    }
    setVerifyClickable(false)
    try {
        const response = await axios.post('/api/v1/auth/generateotp',
          {
            email:userDetails.email,
            role:'student'
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
    if(!userDetails.email.trim()){
      setErrorText("Enter email first")
      return;
    }
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!emailRegex.test(userDetails.email)){
      setErrorText("Enter valid email to verify it")
      return
    }
    if(otpDetails.otp.join('').length !== 6){
      setErrorText("Enter all digits to verify the otp")
      return;
    }
    
     try {
      const response = await axios.post('/api/v1/auth/verifyemail',{
        email:userDetails.email,
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

  const handleChange = (e) => {
    if(errorText)
        setErrorText('')
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleOtpChange = (element, index) => {
    if(errorText)
      setErrorText('')
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
    if (e.key === "Backspace" && otpDetails.otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const ValidateUser = () =>{
       if(!userDetails.name.trim() || !userDetails.email.trim() || !userDetails.password.trim()){
          setErrorText("Please enter all the fields")
          return false;
       }
       if(userDetails.password.length < 5){
         setErrorText("Password should be atleast 5 characters")
         return false;
       }
       if(!otpDetails.isVerified){
        setErrorText("Verify email to register")
        return false;
       }

       return true
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userValidated = ValidateUser()
    if(userValidated){
      try {
        const response = await axios.post('/api/v1/auth/registerstudent', userDetails);
        if(response.status === 201){
          toast.success('User Registered successfully')
            console.log('User registered successfully:', response.data);
      
            const studentDetails = response.data.student;
            // Optionally, clear form or redirect after successful registration
            dispatch({
              type: "LOG_USER",
              payload: true
            });
      
            dispatch({
              type: "SET_STUDENT",
              payload: studentDetails
            });
      
            dispatch(
              {
                type:"LOGGED_USER",
                payload:'student'
              }
            )
            navigate('/myaccount/studentprofile/myprofile')
        }
        
      } catch (error) {
        toast.error("Error creating user, Try again later")
      }
    }
  };

  return (
    <div className='student-signp-wrap'>
    <div className='student-register-h1'>
        <h1>Sign up to your EduQuest account</h1>
    </div>
    <div className='student-signup-form'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Name:</label>
          <input type='text' name='name' id='name' value={userDetails.name} onChange={handleChange} required />
        </div>
        <div className='form-group'>
          <div className='email-label-flex'>
            <label>Email:</label>
            {otpDetails.isVerified ?
            <div className='verified-div'>
              <img src={doneimg} className='done-img' alt='Verified'/>
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
             value={userDetails.email} 
             onChange={handleChange} 
             pattern='[^@\s]+@[^@\s]+\.[^@\s]+'
             required />
        </div>
        {
          otpDetails.isVisible ?
        <div className="otp-input form-group">
          <div className='email-label-flex'>
             <label>Enter otp:</label>
             <div><p className='link-colour submit-mob'  onClick={()=>handleOtpSubmit()}>Submit</p></div>
          </div>
          <div className='otp-verify-flex'>
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
                  width: "40px",
                  padding: "10px",
                  margin: "5px",
                  textAlign: "center",
                  fontSize: "18px",
                  border: "2px solid #ccc",
                  borderRadius: "4px",
                }}
                />
              ))}
            </div>
            <div><p className='link-colour submit-lg'  onClick={()=>handleOtpSubmit()}>Submit</p></div>
          </div>
       </div>
          :
          <></>
        }
        <div className='form-group'>
          <label>Password:</label>
          <input type='password' name='password' id='password' value={userDetails.password} onChange={handleChange} required minLength={5}/>
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
          <button type='submit' className='submit-btn' style={regbtnstyle}>Register</button>
        </div>
      </form>
      <div className='log-in-div'>
          <p>Already have an account? <span className='anchor-link' onClick={()=>navigate('/login')}>Log in</span></p>
      </div>
    </div>
    </div>
  );
};

export default RegisterStudent;
