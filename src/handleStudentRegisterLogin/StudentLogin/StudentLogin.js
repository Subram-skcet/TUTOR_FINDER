import React, { useState } from 'react';
import './StudentLogin.css'; // Assuming you save the CSS file as Login.css
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../../StateProviders/StateProvider'
import axios from 'axios'

const Login = () => {
    const [{logged,logged_as,asTeacher,asStudent},dispatch] = useDataLayerValue()
    const navigate = useNavigate()
    const [userDetails, setDetails] = useState({
        email: '',
        password: '',
        asteacher: true,
        asstud: false
    });

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
            const response = await axios.get(`http://localhost:3001/api/v1/auth/login${userDetails.asteacher?'teacher':'student'}`,
                {
                    params:{
                        email:userDetails.email,
                        password:userDetails.password
                    }
                }
            )
            dispatch({
                type: "LOG_USER",
                payload: true
              });
            let loggedUserDetails
            if(!userDetails.asteacher){
                 loggedUserDetails =response.data.student
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
            }
            else{
                loggedUserDetails =response.data.teacher
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
            }
            console.log(loggedUserDetails);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="student-login-container">
            <div className='student-login-header'>
                <h1>Log in to your EduQuest account</h1>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={userDetails.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={userDetails.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <button type="submit">Log In</button>
                </div>
            </form>
            <div className='log-in-content-div'>
            <div>
                <span className='anchor-link'>Forgot Password?</span>
            </div>
            <div>
               <p>Don't have an account? <span className='anchor-link' onClick={()=>navigate('/register')}>Sign up</span></p>
            </div>
           </div>
        </div>
    );
};

export default Login;
