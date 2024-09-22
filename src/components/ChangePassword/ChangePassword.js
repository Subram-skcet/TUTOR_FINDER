import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify'

const ChangePassword = () => {
    const [Details, setDetails] = useState({
        pwd: '',
        cnfrm_pwd: ''
    });
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token')
    const role = queryParams.get('role')
    const email = queryParams.get('email')

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (Details.pwd !== Details.cnfrm_pwd) {
            console.log("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post('/api/v1/auth/reset-password', {
                email,
                token,
                role,
                password: Details.pwd,
            });
            console.log(response);
            if (response.data.message === 'Password resetted successfully') {
                toast.success('Password changed successfully!')
                navigate('/');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <div className="top-wst"></div>
            <form onSubmit={handleSubmit}>
                <label>New Password:</label>
                <input
                    type="password"
                    name="pwd"
                    value={Details.pwd}
                    onChange={handleChange}
                    required
                />
                <label>Confirm Password:</label>
                <input
                    type="password"
                    name="cnfrm_pwd"
                    value={Details.cnfrm_pwd}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ChangePassword;
