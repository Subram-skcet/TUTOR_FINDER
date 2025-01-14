import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import './StudentRegister.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loadgif from '../../assets/89.gif'
import { MdOutlineTaskAlt } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { MdWarningAmber } from "react-icons/md";


const RegisterStudent = () => {
  const [{ logged_as,logged }, dispatch] = useDataLayerValue();
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
  const [isPasswordVisible,setPasswordVisible] = useState(false)
  const [verifyLinkMail,setVerifyLinkMail] = useState(null)
  const [verifiedEmail,setVerifiedEmail] = useState(null)
  const [isRegisterLoad,setRegisterLoad] = useState(false)


  
  const regbtnstyle = {
    width: 'max-content',
    display: 'block',
    marginInline: 'auto'
  };

  const handleOtpSend = async()=>{
    if(!userDetails.email.trim()){
      setErrorText("Enter an email address to verify.")
      return
    }
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!emailRegex.test(userDetails.email)){
      setErrorText("Enter a valid email address to verify.")
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
        setVerifyLinkMail(userDetails.email)
          toast.info("OTP has sent to your mail. Enter it below. Valid for only 15 minutes.");
          setOtpDetails((prevDetails)=>({
            ...prevDetails,
            isVisible:true
          }))
        }

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
      setErrorText("Please enter an email address first.")
      return;
    }
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!emailRegex.test(userDetails.email)){
      setErrorText("Enter a valid email address to verify.")
      return
    }
    if(otpDetails.otp.join('').length !== 6){
      setErrorText("Enter all digits to verify the OTP")
      return;
    }

    if(!(userDetails.email === verifyLinkMail)){
      setErrorText("Enter the email address for which the verification link was sent, or verify this new email.")
      return
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
        setVerifiedEmail(userDetails.email)
      }
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

    if (name === 'email') {
      if (value !== verifiedEmail) { 
        setOtpDetails((prevDetails) => ({
          ...prevDetails,
          isVerified: false,
        }));
      } else {
        setOtpDetails((prevDetails) => ({
          ...prevDetails,
          isVerified: true,
        }));
      }
    }
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
          setErrorText("Please fill in all the fields.")
          return false;
       }
       if(userDetails.name.trim().length < 3 || userDetails.name.trim(  ).length >20){
        setErrorText("Name should be between 3 and 20 characters long.")
        return false;
       }
       if(userDetails.password.length < 5){
         setErrorText("Password must be atleast 5 characters")
         return false;
       }
       if(!otpDetails.isVerified){
        setErrorText("Verify your email address to register.")
        return false;
       }

       return true
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
     if(logged){
          toast.info("Sign out of the currently logged-in account and try again.")
          return
      }
    const userValidated = ValidateUser()
    if(userValidated){
      setRegisterLoad(true)
      try {
        const response = await axios.post('/api/v1/auth/registerstudent', userDetails);
        if(response.status === 201){
          toast.success('User Registered successfully')
      
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
      finally{
        setRegisterLoad(false)
      }
    }
  };

  return (
    <div className='student-signp-wrap lato-regular'>
    <div className='student-register-h1'>
        <h1 className='lato-bold'>Sign up to your EduQuest account</h1>
    </div>
    <div className='student-signup-form '>
      <form onSubmit={handleSubmit} className='reg-std-form'>
        <div className='form-group'>
          <label className='lato-bold'>Name:</label>
          <input className=' std-reg-inp lato-regular' type='text' name='name' id='name' value={userDetails.name}  minLength={3}
            maxLength={20} onChange={handleChange} required />
        </div>
        <div className='form-group'>
          <div className='email-label-flex'>
            <label className='lato-bold'>Email:</label>
            {otpDetails.isVerified ?
            <div className='verified-div'>
               <MdOutlineTaskAlt size="1.2em"/>
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
             className=' std-reg-inp lato-regular' 
             value={userDetails.email} 
             onChange={handleChange} 
             pattern='[^@\s]+@[^@\s]+\.[^@\s]+'
             required />
        </div>
        {
          otpDetails.isVisible ?
        <div className="otp-input form-group">
          <div className='email-label-flex'>
             <label className='lato-bold'>Enter otp:</label>
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
                className='std-reg-inp lato-regular'
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
          <label className='lato-bold'>Password:</label>
          <div className='password-container'>
            <input className='std-reg-inp lato-regular' type={`${isPasswordVisible? 'text' : 'password'}`} name='password' id='password' value={userDetails.password} onChange={handleChange} required minLength={5}/>
            { userDetails.password.length > 0 &&
              <span className='visibility-icon'>
                          {
                              isPasswordVisible ? 
                              <div onClick={()=>setPasswordVisible(false)} className='eye-icon'>
                                <MdVisibility size="1.3em"/>
                              </div>
                              :
                              <div onClick={()=>setPasswordVisible(true)} className='eye-icon'>
                              <MdVisibilityOff size="1.3em"/>
                              </div>
                          }
              </span>
            }
          </div>
        </div>
        {errorText && 
          <div className='error-para-div er-streg'>
                        <div className='amber-icon'>
                           <MdWarningAmber size="1.3em"/>
                        </div>
                        <p className='errorText'>{errorText}</p>
          </div>
        }
        <div>
          <button type='submit' className='reg-btn lato-bold' style={regbtnstyle}>
          {
                            isRegisterLoad ?
                            <div class="lds-ring" style={{width:'60px'}}><div></div><div></div><div></div><div></div></div>
                            :
                            <>Register</>
                        }
          </button>
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
