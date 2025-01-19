import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify'
import './ChangePassword.css'
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { MdWarningAmber } from "react-icons/md";


const ChangePassword = () => {
    const [Details, setDetails] = useState({
        pwd: '',
        cnfrm_pwd: ''
    });
    const [errorText,setErrorText] = useState('')
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token')
    const role = queryParams.get('role')
    const email = queryParams.get('email')
    const [isPasswordVisible,setPasswordVisible] = useState(false)
    const [isConfirmPasswordVisible,setConfirmPasswordVisible] = useState(false)

    const navigate = useNavigate();

    const handleChange = (e) => {
        if(errorText){
            setErrorText('')
        }
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if(!Details.pwd.trim() || !Details.cnfrm_pwd.trim()){
            setErrorText("Enter all the fields")
            return;
        }
        if (Details.pwd !== Details.cnfrm_pwd) {
            setErrorText("Passwords doesn't match")
            return;
        }
        try {
            const response = await axios.post('https://find-my-tuition.onrender.com/api/v1/auth/reset-password', {
                email,
                token,
                role,
                password: Details.pwd,
            });
            if(response.status === 201){
                toast.success('Password changed successfully!')
                navigate('/');
            }
        } catch (error) {
            if(error.response && error.response.data.msg){
                if(error.response.data.message.includes('expired')){
                    toast.info("10 minute time limit for password reset is elapsed try to resend the password reset mail")
                    navigate('/')
                }
                else{
                    toast.error(error.response.data.message)
                }
            }
            else{
                toast.error("Something went wrong please try again later")
            }
        }
    };

    return (
        <>
            <div className="top-wst"></div>
        <div className="pwd-wrapper lato-regular">
            <form onSubmit={handleSubmit} className='password-reset-div'>
               <div className='form-group pwd-div'>  
                    <label className='pwd-label lato-bold'>New Password:</label>
                    <div className='password-container'>

                    <input
                        type={`${isPasswordVisible? 'text' : 'password'}`}
                        name="pwd"
                        value={Details.pwd}
                        className='lato-regular'
                        onChange={handleChange}
                        minLength={5}
                        required
                        />
                    {
                        Details.pwd.length > 0 && 
                    
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

                <div className='form-group pwd-div'>
                    <label className='pwd-label lato-bold'>Confirm Password:</label>

                    <div className='password-container'>

                    <input
                        type={`${isConfirmPasswordVisible? 'text' : 'password'}`}
                        name="cnfrm_pwd"
                        value={Details.cnfrm_pwd}
                        className='lato-regular'
                        onChange={handleChange}
                        minLength={5}
                        required
                        />
                        {
                        Details.cnfrm_pwd.length > 0 && 
                    
                        <span className='visibility-icon'>
                                {
                                isConfirmPasswordVisible ? 
                                    <div onClick={()=>setConfirmPasswordVisible(false)} className='eye-icon'>
                                        <MdVisibility size="1.3em"/>
                                    </div>
                                    :
                                    <div onClick={()=>setConfirmPasswordVisible(true)} className='eye-icon'>
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
                <button type="submit" className='pwd-submit-btn style-links-updated lato-regular'>Change</button>
            </form>
        </div>
        </>
    );
};

export default ChangePassword;
