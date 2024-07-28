import React from 'react'
import './MyAccount.css'
import { useNavigate } from 'react-router-dom'
const MyAccount = () => {
  const navigate = useNavigate();
  return (
    <div className='acc-wrap' onClick={()=>navigate("/myaccount")}>
        <div>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzCW8ayM9K_iNzX81NSjgpGcl30jDvsTSiIg&s' className='acc-img'/>
            <div>
                <p className='acc-p'><strong>My Account</strong></p>
            </div>
        </div>
    </div>
  )
}

export default MyAccount
