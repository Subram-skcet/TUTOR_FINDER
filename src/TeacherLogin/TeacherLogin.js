import React,{ useState } from 'react'
import './TeacherLogin.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDataLayerValue } from '../StateProviders/StateProvider'
import { useNavigate } from 'react-router-dom'
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";

const TeacherLogin = ({openLogin,onClose}) => {
    const [loginDetails,setDetails] = useState({
        email:'',
        password:''
    })
    const [{logged},dispatch] = useDataLayerValue()
    const [isPasswordVisible,setPasswordVisible] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) =>{
        const { name,value } = e.target
        setDetails((prevDetails)=>({
            ...prevDetails,
            [name]:value
        }))
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(loginDetails);
        try {
            const response = await axios.post('/api/v1/auth/loginteacher',loginDetails)
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
            toast.error('Something went wrong, Try agin later')
        }
    }

  return (
    <>

        <div className="login-container modal-login">
            <h2 className='lato-bold'>Login to your EduQuest Teacher account</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className='pt-serif-regular'>Email:</label>
                    <input type="email" id="email" name="email" className='lg-mdl-inp' value={loginDetails.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className='pt-serif-regular'>Password:</label>
                    <div className='password-container'>

                    <input type={`${isPasswordVisible? 'text' : 'password'}`} id="password" name="password" className='lg-mdl-inp' value={loginDetails.password} onChange={handleChange} />
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
                <div>
                    <button type="submit" className='lg-btn poppins-font btn-cntr'>Log In</button>
                </div>
                <div className='log-in-content-div'>
                    <div>
                        <span className='anchor-link'>Forgot Password?</span>
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
