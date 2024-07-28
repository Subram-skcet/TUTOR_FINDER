import React from 'react'
import { useNavigate } from 'react-router-dom'
import Login from './Login';
import './LoginPage.css'
const LoginPage = () => {

  const navigate = useNavigate();

  const RegisterNavigateTeacher = () => {
    navigate('/register', { state: { name: 'Teacher' } });
  };

  const RegisterNavigateStudent = () => {
    navigate('/register', { state: { name: 'Student' } });
  };

  return (
    <div className='login-pg-wrap'>
        <div className='login-content-wrap'>
           <h2>Don't have an account?</h2>
           <a onClick={RegisterNavigateTeacher}>Regsiter as Teacher</a>
           <a onClick={RegisterNavigateStudent}>Regsiter as Student</a>
        </div>
        <div className='login-div'>
          <Login/>
        </div>
    </div>
  )
}

export default LoginPage
