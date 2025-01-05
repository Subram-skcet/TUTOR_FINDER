import React, { useState } from 'react';
import './LoginModal.css'; 
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { MdWarningAmber } from "react-icons/md";
import { toast } from 'react-toastify';


const LoginModal = () => {
    const [,dispatch] = useDataLayerValue()
    const [userDetails, setDetails] = useState({
        email: '',
        password: '',
    });
    const [isPasswordVisible,setPasswordVisible] = useState(false)
    const [errorText,setErrorText] = useState('')
     const navigate = useNavigate()


    const handleChange = (e) => {
        if(errorText){
            setErrorText('');
        }
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!userDetails.email.trim() || !userDetails.password.trim()){
            setErrorText('Please fill in all the fields.')
            return;
        }

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(!emailRegex.test(userDetails.email)){
                setErrorText("Enter a valid email address")
                return
        }
        console.log(userDetails);
        try {
            const response = await axios.post('/api/v1/auth/loginstudent',
                {
                        email:userDetails.email,
                        password:userDetails.password
                }
            )
            if(response.status === 200){
                dispatch({
                    type: "LOG_USER",
                    payload: true
                  });
                
                  let loggedUserDetails =response.data.student
                      dispatch({
                        type: "SET_STUDENT",
                        payload: loggedUserDetails
                      });
                      dispatch(
                        {
                          type:"LOGGED_USER",
                          payload:'student'
                        }
                      )
                console.log(loggedUserDetails);
                navigate('/myaccount/studentprofile/myprofile')
            }
        } catch (error) {
            if(error.response && error.response.data.message){
                                toast.error(error.response.data.message)
                            }
                            else{
                                toast.error("Something went wrong. Please try again later")
             }
        }
    };

    return (
        <div className="login-container modal-login lato-regular">
            <h2 className='lato-bold'>You need to login to do this action</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className=''>Email:</label>
                    <input type="email" id="email" name="email" className='lg-mdl-inp lato-regular' value={userDetails.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className=''>Password:</label>
                    <div className='password-container'>
                    
                        <input type={`${isPasswordVisible? 'text' : 'password'}`} id="password" name="password" className='lg-mdl-inp lato-regular' value={userDetails.password} onChange={handleChange} />
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
                    <button type="submit" className='lg-btn poppins-font btn-cntr'>Log In</button>
                </div>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <p>Don't have an account? <span className='anchor-link' onClick={()=>navigate('/register')}>Sign up</span></p>
                </div>
            </form>
        </div>
    );
};

export default LoginModal;
