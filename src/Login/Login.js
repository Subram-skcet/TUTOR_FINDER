import React, { useState } from 'react';
import './Login.css'; // Assuming you save the CSS file as Login.css
import { useNavigate } from 'react-router-dom';
const Login = () => {
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

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            asteacher: name === 'asteacher' ? checked : !checked,
            asstud: name === 'asstud' ? checked : !checked,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userDetails);
    };

    return (
        <div className="login-container">
            <div className="checkbox-container">
                <div>
                <input
                    type="checkbox"
                    id="asteacher"
                    name="asteacher"
                    checked={userDetails.asteacher}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="asteacher">LogIn as Teacher</label>
                </div>
                <div>

                <input
                    type="checkbox"
                    id="asstud"
                    name="asstud"
                    checked={userDetails.asstud}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="asstud">LogIn as Student</label>
                 </div>
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
                    <button type="submit" onClick={()=>navigate("/myaccount/myprofile")}>Log In</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
