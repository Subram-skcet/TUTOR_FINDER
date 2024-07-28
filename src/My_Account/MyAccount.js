import React from 'react'
import './MyAccount.css'
import { useNavigate } from 'react-router-dom'
const MyAccount = () => {
  const navigate = useNavigate();
  return (
    <div className='acc-wrap' onClick={()=>navigate("/myaccount")}>
        <div>
            <img src='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' className='acc-img'/>
            <div>
                <p className='acc-p'><strong>My Account</strong></p>
            </div>
        </div>
    </div>
  )
}

export default MyAccount
