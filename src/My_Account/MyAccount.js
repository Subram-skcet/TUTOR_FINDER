import React from 'react'
import './MyAccount.css'
import { useNavigate } from 'react-router-dom'
const MyAccount = () => {
  const navigate = useNavigate();
  return (
    <div className='acc-wrap' onClick={()=>navigate("/myaccount/myprofile")}>
        <div>
            <img src='https://www.shutterstock.com/image-photo/young-asian-teacher-man-teaching-260nw-1928551622.jpg' className='acc-img'/>
            <div>
                <p className='acc-p'><strong>My Account</strong></p>
            </div>
        </div>
    </div>
  )
}

export default MyAccount
