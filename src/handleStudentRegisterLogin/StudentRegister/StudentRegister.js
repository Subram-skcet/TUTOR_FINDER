import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to install axios using npm or yarn
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import './StudentRegister.css'
import { useNavigate } from 'react-router-dom';
import doneimg from '../../assets/done.png'

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
  
  useEffect(()=>{
      console.log("State updated successfully", logged_as);
  },[logged_as])
  
  const regbtnstyle = {
    width: 'max-content',
    display: 'block',
    marginInline: 'auto'
  };

  const handleOtpSend = async()=>{
      try {
        const response = await axios.post('http://localhost:3001/api/v1/auth/generateotp',
          {
            email:userDetails.email,
            role:'student'
          }
        )
        if(response.data.message === 'Verification email generated'){
          setOtpDetails((prevDetails)=>({
            ...prevDetails,
            isVisible:true
          }))
        }

        console.log(response);
      } catch (error) {
        console.log(error.message);
      }
  }

  const handleOtpSubmit = async() => {
     try {
      const response = await axios.post('http://localhost:3001/api/v1/auth/verifyemail',{
        email:userDetails.email,
        otp:otpDetails.otp.join('')
      })
      if(response.data.message === "Verified successfully"){
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
       console.log(error.message);
     }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleOtpChange = (element, index) => {
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/auth/registerstudent', userDetails);
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
      
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className='student-signp-wrap'>
    <div>
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
              <img src={doneimg} className='done-img'/>
              <p className='verified-div-para'>Verified</p>
            </div>
            :
             <p className='link-colour' onClick={()=>handleOtpSend()}>Verify</p>
            }
          </div>
          <input type='email' name='email' id='email' value={userDetails.email} onChange={handleChange} required />
        </div>
        {
          otpDetails.isVisible ?
        <div className="otp-input form-group">
          <label>Enter otp:</label>
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
            <div><p className='link-colour'  onClick={()=>handleOtpSubmit()}>Submit</p></div>
          </div>
       </div>
          :
          <></>
        }
        <div className='form-group'>
          <label>Password:</label>
          <input type='password' name='password' id='password' value={userDetails.password} onChange={handleChange} required />
        </div>
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
