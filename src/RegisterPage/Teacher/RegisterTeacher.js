import React, { useState } from 'react';
import './RegisterTeacher.css';
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import { useNavigate } from 'react-router-dom';
import SelectedSubject from '../../MyAccountPage/AddTution/Subjects';
import axios from 'axios';
import { stateDistricts,subjects,qualifications } from '../../components/stateExporter'
import loadgif from '../../assets/89.gif'
import { toast } from 'react-toastify';
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { MdWarningAmber } from "react-icons/md";


const RegisterTeacher = ({openLogin}) => {
  const [{logged}, dispatch] = useDataLayerValue();
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
  const [verifyLinkMail,setVerifyLinkMail] = useState(null)
  const [verifiedEmail,setVerifiedEmail] = useState(null)
  
  const [ isVerifyClickable, setVerifyClickable ] =useState(true)
  const [errorText,setErrorText] = useState('')
  const [isPasswordVisible,setPasswordVisible] = useState(false)
  const [isRegisterLoad,setRegisterLoad] = useState(false)
  
  const navigate = useNavigate();
  
  const regbtnstyle = {
    width: 'max-content',
    display: 'block',
    marginInline: 'auto'
  };
  
  const handleOtpSend = async()=>{
    if(!teacherDetails.email.trim()){
      setErrorText("Enter an email address to verify.")
      return
    }
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!emailRegex.test(teacherDetails.email)){
      setErrorText("Enter a valid email address to verify.")
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
        setVerifyLinkMail(teacherDetails.email)
        toast.info("OTP has sent to your mail. Enter it below. Valid for only 15 minutes.");
        setOtpDetails((prevDetails)=>({
          ...prevDetails,
          isVisible:true,
          otp:new Array(6).fill("")
        }))
      }

    } catch (error) {
      if(error.response && error.response.data.msg){
        toast.error(error.response.data.msg)
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
    setErrorText("Please enter an email address first.")
    return;
  }
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(!emailRegex.test(teacherDetails.email)){
    setErrorText("Enter a valid email address to verify.")
    return
  }
  if(otpDetails.otp.join('').length !== 6){
    setErrorText("Enter all digits to verify the OTP.")
    return;
  }
  if(!(teacherDetails.email === verifyLinkMail)){
     setErrorText("Enter the email address for which the verification link was sent, or verify this new email.")
     return
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
        isVisible:false,
      }
    ))
    setVerifiedEmail(teacherDetails.email)
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
    setErrorText("Please fill in all the fields.")
           return false
       }

       if(teacherDetails.name.trim().length < 3 || teacherDetails.name.trim().length > 20){
        setErrorText("Name should be between 3 and 20 characters long.")
        return false;
       }

       const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
       if(!emailRegex.test(teacherDetails.email)){
         setErrorText("Enter a valid email address to verify.")
         return false
       }

       if(!teacherDetails.password.length > 5){
        setErrorText("Password must be at least 5 characters long.")
         return false;
       }

       const mbnoRegex = /^[0-9]{10}$/;
      if (!mbnoRegex.test(teacherDetails.mobileno)) {
        setErrorText("Enter a valid 10-digit Mobile Number");
        return false;
      }

       if(teacherDetails.mobileno.length !== 10){
          setErrorText("Mobile number should have 10 digits")
          return false;
       }
       
       if(teacherDetails.year_of_exp<0 || teacherDetails.year_of_exp>100){
         setErrorText("Please enter valid Years of Experience")
         return false
       }

       if(!otpDetails.isVerified){
        setErrorText("Verify your email address to register.")
        return false;
       }
       
       return true;
      }
      
      const handleSubmit = async (e) => {
        e.preventDefault()
        if(logged){
         toast.info("Sign out of the currently logged-in account and try again.")
         return
        }
    const userValidated = validateUser()

    if(userValidated){
      setRegisterLoad(true)
        let setTeacher;
        try {
        const response = await axios.post('/api/v1/auth/registerteacher',teacherDetails );
        
        if(response.status === 201){
          toast.success('User registered succcessfully')
          setTeacher = response.data.teacherData
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
      finally{
        setRegisterLoad(false)
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
    if (selectedSubject.length > 0 && !teacherDetails.subjects.includes(selectedSubject)) {
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
    <div className='teacher-signup-wrap lato-regular'>
      <div>
        <h2 className='lato-bold'>Create your Teacher account in FMT</h2>
      </div>

    <div className='teacher-reg-wrap'>
      <form className='teacher-reg-form' onSubmit={handleSubmit}>
       <div className='teacher-det-wrap'>

        <div className='space-div'>
          <label htmlFor='name'  className='register-label'>
            <strong>Name:</strong>
            </label>
          <input
            type='text'
            name='name'
            id='name'
            className='reg-tchr-pg-input lato-regular'
            value={teacherDetails.name}
            onChange={handleChange}
            minLength={3}
            maxLength={20}
            required
            />
        </div>

        <div className='space-div'>
          <div className='email-label-flex'>
          <label htmlFor='email' className='register-label'>
           <strong> Email:
            </strong></label>
            {otpDetails.isVerified ?
            <div className='verified-div'>
              <MdOutlineTaskAlt size="1.1em"/>
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
            className='reg-tchr-pg-input lato-regular'
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
            <label><strong> Enter otp: </strong></label>
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
                className='reg-tchr-pg-input lato-regular'
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
          <label htmlFor='password'  className='register-label'><strong>Password:</strong></label>
          <div className='tchr-reg-password-container'>
          <input
            type={`${isPasswordVisible? 'text' : 'password'}`}
            name='password'
            id='password'
            className='reg-tchr-pg-input reg-tch-pwd-input lato-regular'
            value={teacherDetails.password}
            onChange={handleChange}
            minLength={5}
            required
            />
              { teacherDetails.password.length > 0 &&
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
        <div className='space-div'>
          <label htmlFor='mobileno'  className='register-label'>
            <strong>Mobile No:</strong></label>
          <input
            type='tel'
            name='mobileno'
            id='mobileno'
            className='reg-tchr-pg-input lato-regular'
            value={teacherDetails.mobileno}
            pattern='^[0-9]{10}$'
            onChange={handleChange}
            minLength={10}
            maxLength={10}
            required
            />
        </div>

        <div className='space-div'>
          <label htmlFor='qualification'  className='register-label'>
            <strong>Highest Qualification:</strong></label>
          <div className='select-container req-bx-slct-cntr'>

          <select
            name='qualification'
            id='qualification'
            value={teacherDetails.qualification}
            onChange={handleChange}
            className='select-box lato-regular'
            required
            >
            <option value=''>Select</option>
            {
              qualifications.map((qual)=>(
                <option value={qual} key={qual}>{qual}</option>
              ))
            }
          </select>
          <div className='drp-icon'>
              <IoMdArrowDropdown size="1.6em"/>
            </div>
            </div>
        </div>


        <div className='space-div'>
          <label htmlFor='yoexp'   className='register-label'><strong>Year Of Experience:</strong></label>
          <input
            type='number'
            name='year_of_exp'
            id='year_of_exp'
            className='reg-tchr-pg-input lato-regular'
            value={teacherDetails.year_of_exp}
            onChange={handleChange}
            required
          />
        </div>
        <div className='space-div'>
          <label htmlFor='inputState'  className='register-label'>
            <strong>Select State:</strong></label>
          <div className='select-container req-bx-slct-cntr'>

          <select
            name='state'
            id='inputState'
            className='select-box lato-regular'
            value={teacherDetails.state}
            onChange={handleStateChange}
            required
            >
            <option value=''>Select</option>
            {Object.keys(stateDistricts).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <div className='drp-icon'>
              <IoMdArrowDropdown size="1.6em"/>
            </div>
            </div>
        </div>
        <div className='space-div'>
          <label htmlFor='inputDistrict'  className='register-label'>
            <strong>Select District:</strong></label>
          <div className='select-container req-bx-slct-cntr'>
          <select
            name='district'
            id='inputDistrict'
            className='select-box lato-regular'
            value={teacherDetails.district}
            onChange={handleChange}
            disabled={!teacherDetails.state}
            required
            >
            <option value=''>Select</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          <div className='drp-icon'>
              <IoMdArrowDropdown size="1.6em"/>
            </div>
          </div>
        </div>
        <div className="space-div">
          <label  className='register-label'>
            <strong>Select Subjects you teach:</strong></label>
          <div className='select-container req-bx-slct-cntr'>

          <select onChange={HandleSubjectSelect} className='select-box lato-regular' required>
            <option value="">Select</option>
            {subjects.map(subject => (
               <option key={subject} value={subject}>{subject}</option>
             ))}
          </select>
          <div className='drp-icon'>
              <IoMdArrowDropdown size="1.6em"/>
            </div>
          </div>
        </div >
        {
          teacherDetails.subjects.length > 0 &&
          <div className="selected-items">
            {teacherDetails.subjects.map((subject) => (
              <SelectedSubject key={subject} Subject={subject} delFunction={HandleSubjectRemove} />
            ))}
          </div>
        }
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
          <button
            type='submit'
           className='lato-bold reg-btn'
           style={regbtnstyle}
            >
             {
                  isRegisterLoad ?
                  <div className="lds-ring" style={{width:'60px'}}><div></div><div></div><div></div><div></div></div>
                      :
                    <>Register</>
                  }
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
