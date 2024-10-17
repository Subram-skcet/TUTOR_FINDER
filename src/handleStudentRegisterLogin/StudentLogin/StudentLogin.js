import React, { useState } from 'react';
import './StudentLogin.css'; // Assuming you save the CSS file as Login.css
import { useNavigate } from 'react-router-dom';
import { useDataLayerValue } from '../../StateProviders/StateProvider'
import axios from 'axios'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { toast } from 'react-toastify';
import loadgif from '../../assets/89.gif'

const Login = () => {
    const [{logged,logged_as,asTeacher,asStudent},dispatch] = useDataLayerValue()
    const navigate = useNavigate()
    const [userDetails, setDetails] = useState({
        email: '',
        password: '',
    });
    const [errorText,setErrorText] = useState('')
    const [isForgetClickable,setForgetClickable] = useState(true)

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

    const handleForgetPassword = async(req,res) =>{
        if(!userDetails.email.trim()){
            setErrorText("Enter email to send password Reset mail")
            return;
        }

        const body = { email:userDetails.email, role:'student'}
        try {
            setForgetClickable(false)
          const response = await axios.post('/api/v1/auth/changepassword',body)
          if(response.status === 200){
              toast.info('Check your mail for password changing link note that link is valid for only 10 minutes')
          }
        } catch (error) {
            if(error.response && error.response.data.message){
                toast.error(error.response.data.message)
            }
            else{
                toast.error("Something went wrong. Plesae try again later")
            }
        }
        finally{
            setForgetClickable(true)
        }
      }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!userDetails.email.trim() || !userDetails.password.trim()){
            setErrorText('Please enter all the fields')
            return;
        }

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(!emailRegex.test(userDetails.email)){
                setErrorText("Enter valid email")
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
                    toast.success("Logged In Successfully!!")
                    dispatch({
                        type: "LOG_USER",
                        payload: true
                      });
                    let loggedUserDetails
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
        <div className="student-login-container">
            <div className='student-login-header'>
                <h1>Log in to your EduQuest account</h1>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={userDetails.email} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={userDetails.password} onChange={handleChange} required/>
                </div>
                {errorText && 
                    <div className='error-para-div er-streg'>
                         <div className='amber-icon'>
                             <WarningAmberIcon/>
                         </div>
                        <p className='errorText'>{errorText}</p>
                    </div>
                 }
                <div className="form-group">
                    <button type="submit">Log In</button>
                </div>
            </form>
            <div className='log-in-content-div'>
            <div>
            {
                isForgetClickable?
                <span className='anchor-link' onClick={()=>handleForgetPassword()}>Forgot Password?</span>
                :
                <img src={loadgif} className='verify-load-gif' alt='Load'/>
            }
            </div>
            <div>
               <p>Don't have an account? <span className='anchor-link' onClick={()=>navigate('/register')}>Sign up</span></p>
            </div>
           </div>
        </div>
    );
};

export default Login;
