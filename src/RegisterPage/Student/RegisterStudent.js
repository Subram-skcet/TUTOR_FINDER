import React, { useState } from 'react'
const RegisterStudent = () => {
    const regbtnstyle ={
        width:'max-content',
        display:'block',
        marginInline:'auto'
    }
    const [userDetails,setDetails]=useState(
        {
            name:'',
            email:'',
            password:''
        }
    )
    const handleChange=(e)=>{
        const {name,value} = e.target
        setDetails((prevDetails)=>({
            ...prevDetails,
            [name]:value,
        }))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(userDetails);
    }
  return (
    <div className='teacher-reg-wrap'>
        <form>
            <div className='space-div'>
                <label>Name:</label>
                <input type='text' name='name' id='name'  value={userDetails.name} onChange={handleChange}/>
            </div>
            <div className='space-div'>
                <label>Email:</label>
                <input type='email' name='email' id='email' value={userDetails.email} onChange={handleChange}/>
            </div>
            <div className='space-div'>
                <label>Password:</label>
                <input type='password' name='password' id='password' value={userDetails.password} onChange={handleChange}/>
            </div>
            <div className='submit-btn-div'></div>
            <button onClick={handleSubmit} className='submit-btn' style={regbtnstyle}>Register</button>
        </form>
    </div>
  )
}

export default RegisterStudent