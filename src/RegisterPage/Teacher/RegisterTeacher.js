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
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { IoMdArrowDropdown } from "react-icons/io";


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
  const [verifyLinkMail,setVerifyLinkMail] = useState(null)
  const [verifiedEmail,setVerifiedEmail] = useState(null)
  
  const [ isVerifyClickable, setVerifyClickable ] =useState(true)
  const [errorText,setErrorText] = useState('')
  
  const navigate = useNavigate();
  
  const regbtnstyle = {
    width: 'max-content',
    display: 'block',
    marginInline: 'auto'
  };
  
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
        setVerifyLinkMail(teacherDetails.email)
        toast.info("OTP has sent to your mail. Enter it below. Valid for only 15 minutes.");
        setOtpDetails((prevDetails)=>({
          ...prevDetails,
          isVisible:true,
          otp:new Array(6).fill("")
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
  if(!(teacherDetails.email === verifyLinkMail)){
     setErrorText("Enter email for which the verify link sent or verify this new email")
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
        <h2 className='lato-bold'>Create your Teacher account in EduQuest</h2>
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
            className='reg-tchr-pg-input'
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
              <div className='verified-icon'>
               <TaskAltIcon fontSize='small'/>
              </div>
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
            className='reg-tchr-pg-input'
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
                className='reg-tchr-pg-input'
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
          <input
            type='password'
            name='password'
            id='password'
            className='reg-tchr-pg-input'
            value={teacherDetails.password}
            onChange={handleChange}
            minLength={5}
            required
          />
        </div>
        <div className='space-div'>
          <label htmlFor='mobileno'  className='register-label'>
            <strong>Mobile No:</strong></label>
          <input
            type='tel'
            name='mobileno'
            id='mobileno'
            className='reg-tchr-pg-input'
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
            className='select-box'
            required
            >
            <option value=''>Select</option>
            <option value='B.E'>B.E</option>
            <option value='M.E'>M.E</option>
            <option value='B.Sc'>B.Sc</option>
            <option value='M.Sc'>M.Sc</option>
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
            className='reg-tchr-pg-input'
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
            className='select-box'
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
            className='select-box'
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

          <select onChange={HandleSubjectSelect} className='select-box' required>
            <option value="">Select</option>
            {subjects.map((subject)=>
            <option value={subject}>{subject}</option>
          )}
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
                          <WarningAmberIcon/>
                        </div>
                        <p className='errorText'>{errorText}</p>
          </div>
        }
        <div>
          <button
            type='submit'
           className='poppins-font reg-btn'
           style={regbtnstyle}
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
