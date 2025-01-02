import React,{ useState } from 'react'
import './TeacherLogin.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDataLayerValue } from '../StateProviders/StateProvider'
import { useNavigate } from 'react-router-dom'
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { MdWarningAmber } from "react-icons/md";

import loadgif from '../assets/89.gif'


const TeacherLogin = ({openLogin,onClose}) => {
    const [loginDetails,setDetails] = useState({
        email:'',
        password:''
    })
    const [errorText,setErrorText] = useState('')
    const [{logged},dispatch] = useDataLayerValue()
    const [isPasswordVisible,setPasswordVisible] = useState(false)
    const [isForgetClickable,setForgetClickable] = useState(true)
    const navigate = useNavigate()

    const handleChange = (e) =>{
        if(errorText)
             setErrorText('')
        const { name,value } = e.target
        setDetails((prevDetails)=>({
            ...prevDetails,
            [name]:value
        }))
    }

    const handleForgetPassword = async(req,res) =>{
        if(!loginDetails.email.trim()){
            setErrorText("Please enter your email to receive the password reset link.")
            return;
        }

        const body = { email:loginDetails.email, role:'teacher'}
        try {
            setForgetClickable(false)
          const response = await axios.post('/api/v1/auth/changepassword',body)
          if(response.status === 200){
              toast.info('Check your email for the password reset link. Note that the link is valid for only 10 minutes.')
          }
        } catch (error) {
            if(error.response && error.response.data.message){
                toast.error(error.response.data.message)
            }
            else{
                toast.error("An error occurred. Please try again later.")
            }
        }
        finally{
            setForgetClickable(true)
        }
      }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!loginDetails.email.trim() || !loginDetails.password.trim()){
            setErrorText('Please fill in all the fields.')
            return;
        }

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!emailRegex.test(loginDetails.email)){
            setErrorText("Enter a valid email address")
            return
        }

        console.log(loginDetails);
        try {
            const response = await axios.post('/api/v1/auth/loginteacher',loginDetails)
            console.log(response);
            
            if(response.status === 200){
                dispatch({
                    type: "LOG_USER",
                    payload: true
                });

            let loggedUserDetails =response.data.teacher
                  dispatch({
                    type: "SET_TEACHER",
                    payload: loggedUserDetails
                  });
                  dispatch(
                    {
                      type:"LOGGED_USER",
                      payload:'teacher'
                    }
                  )
                toast.success('Logged in successfully')
                navigate('/myaccount/teacherprofile/myprofile')
            }
        } catch (error) {
                        if(error.response && error.response.data.message){
                            toast.error(error.response.data.message)
                        }
                        else{
                            toast.error("Something went wrong. Please try again later")
                        }
                    }
    }

  return (
    <>

        <div className="login-container modal-login lato-regular">
            <h2 className='lato-bold'>Login to your EduQuest Teacher account</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className='lato-bold'>Email:</label>
                    <input type="email" id="email" name="email" className='lg-mdl-inp lato-regular' value={loginDetails.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className='lato-bold'>Password:</label>
                    <div className='password-container'>

                    <input type={`${isPasswordVisible? 'text' : 'password'}`} id="password" name="password" className='lg-mdl-inp lato-regular' value={loginDetails.password} onChange={handleChange} />
                     { loginDetails.password.length > 0 &&
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
                    <button type="submit" className='lg-btn lato-bold btn-cntr'>Log In</button>
                </div>
                <div className='log-in-content-div'>
                <div>
                    {
                        isForgetClickable?
                        <span className='anchor-link' onClick={()=>handleForgetPassword()}>Forgot Password?</span>
                        :
                        <img src={loadgif} className='verify-load-gif' alt='Load'/>
                    }
               </div>
                    <div>
                    <p>Don't have an account? <span className='anchor-link' onClick={()=>openLogin(false)}>Register</span></p>
                    </div>
               </div>
            </form>
        </div>
    </>
  )
}

export default TeacherLogin
