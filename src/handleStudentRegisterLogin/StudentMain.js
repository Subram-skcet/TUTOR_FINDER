import React from 'react'
import { useLocation } from 'react-router-dom'
import StudentLogin from './StudentLogin/StudentLogin'
import StudentRegister from './StudentRegister/StudentRegister'
import coverimg from '../assets/school-students.jpg'
import './main.css'
import loginimg from '../assets/login.jpeg'

const StudentMain = () => {
  const location = useLocation()


  return (
    <>
    <div className='top-wst'></div>
    <div className='student-parent-wrap'>
      <div className='cover-img'>
        <img src={coverimg} alt='School Students'/>
      </div>
      <div className='mobile-img'>
        <img src={loginimg} alt='Find tutor'/>
      </div>
      <div className='component-wrapper'>
        {
          location.pathname === '/register'?
          <StudentRegister/>
          :
          <StudentLogin/>
        }
      </div>
    </div>
    </>
  )
}

export default StudentMain
