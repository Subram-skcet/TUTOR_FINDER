import React,{ useState } from 'react'
import './TeacherLogin.css'

const TeacherLogin = ({openLogin}) => {
    const [loginDetails,setDetails] = useState({
        email:'',
        password:''
    })

    const handleChange = (e) =>{
        const { name,value } = e.target
        setDetails((prevDetails)=>({
            ...prevDetails,
            [name]:value
        }))
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(loginDetails);
    }

  return (
    <div className='teacher-login-wrap'>
        <div>
            <h3>Login to your EduQuest Teacher account</h3>
        </div>
      <form className='teacher-login-form'>
         <div>
            <label className='login-teacher-label'>Email:</label>
            <input type='text' name='email' value={loginDetails.name} onChange={handleChange}/>
         </div>
         <div>
            <label className='login-teacher-label'>Password:</label>
            <input type='password' name='password' value={loginDetails.password} onChange={handleChange}/>
         </div>
         <div className='submit-btn-div'>
             <button
                type='submit'
                className='submit-btn'
                onClick={handleSubmit}
                >
                Log in
            </button>
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
  )
}

export default TeacherLogin
