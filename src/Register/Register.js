import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import RegisterTeacher from '../RegisterPage/Teacher/RegisterTeacher'
import './Register.css'
import RegisterStudent from '../RegisterPage/Student/RegisterStudent';
const Register = () => {
   const location = useLocation();
  const { state } = location;
    useEffect(()=>{
      console.log('Here is props');
      console.log(state);
    })
  return (
    <>
    <div className='top-wst'></div>
    <div className='register-out-wrap'>
       <div className='register-content'>
          <h1>Register as {state.name}</h1>
          <h4>Aldready have an account? <a href='/login'>Log in</a></h4>
       </div>
       <div className='register-comp'>
         {state?.name==='Teacher'? <RegisterTeacher/>:<RegisterStudent/>}
          
       </div>
    </div>
    </>
  )
}

export default Register
