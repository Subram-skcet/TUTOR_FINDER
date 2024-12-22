import React, { useState } from 'react';
import './LoginModal.css'; // Assuming you save the CSS file as Login.css
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import axios from 'axios'
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";

const LoginModal = () => {
    const [{logged},dispatch] = useDataLayerValue()
    const [userDetails, setDetails] = useState({
        email: '',
        password: '',
    });
    const [isPasswordVisible,setPasswordVisible] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(userDetails);
        try {
            const response = await axios.post('/api/v1/auth/loginstudent',
                {
                        email:userDetails.email,
                        password:userDetails.password
                }
            )
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
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="login-container modal-login">
            <h2 className='lato-bold'>You need to login to do this action</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className='pt-serif-regular'>Email:</label>
                    <input type="email" id="email" name="email" className='lg-mdl-inp' value={userDetails.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className='pt-serif-regular'>Password:</label>
                    <div className='password-container'>
                    
                        <input type={`${isPasswordVisible? 'text' : 'password'}`} id="password" name="password" className='lg-mdl-inp' value={userDetails.password} onChange={handleChange} />
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
                <div>
                    <button type="submit" className='lg-btn poppins-font btn-cntr'>Log In</button>
                </div>
            </form>
        </div>
    );
};

export default LoginModal;
