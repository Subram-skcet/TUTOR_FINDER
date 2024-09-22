import React, { useState } from 'react';
import './LoginModal.css'; // Assuming you save the CSS file as Login.css
// import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import axios from 'axios'

const LoginModal = () => {
    const [{logged},dispatch] = useDataLayerValue()
    // const navigate = useNavigate()
    const [userDetails, setDetails] = useState({
        email: '',
        password: '',
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
            <h2>You need to login to post a review</h2>
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
        </div>
    );
};

export default LoginModal;
