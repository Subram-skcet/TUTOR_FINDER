import React,{ useState } from 'react'
import './TeacherLogin.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDataLayerValue } from '../StateProviders/StateProvider'

const TeacherLogin = ({openLogin}) => {
    const [loginDetails,setDetails] = useState({
        email:'',
        password:''
    })
    const [{logged},dispatch] = useDataLayerValue()

    const handleChange = (e) =>{
        const { name,value } = e.target
        setDetails((prevDetails)=>({
            ...prevDetails,
            [name]:value
        }))
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(loginDetails);
        try {
            const response = await axios.post('/api/v1/auth/loginteacher',loginDetails)
            if(response.status === 200){
                dispatch({
                    type: "LOG_USER",
                    payload: true
                });

            let loggedUserDetails =response.data.teacher
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
                toast.success('Logged in successfully')
            }
        } catch (error) {
            toast.error('Something went wrong, Try agin later')
        }
    }

  return (
    <div className='teacher-login-wrap'>
        <div>
            <h2>Login to your EduQuest Teacher account</h2>
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
