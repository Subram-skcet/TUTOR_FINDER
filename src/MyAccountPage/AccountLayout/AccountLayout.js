import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import './AccountLayout.css'
import { useNavigate } from 'react-router-dom';
const AccountLayout = () => {
  const navigate = useNavigate()
  return (
    <div>
        <div className='account-layout'>
            <div className='layout-icons' onClick={()=>navigate('/')}>
                <HomeIcon fontSize='medium'/>
                <p className='icon-para'>Home</p>
            </div>
            <div className='layout-icons'>
                <SettingsIcon/>
                <p className='icon-para'>Settings</p>
            </div>
        </div>
    </div>
  )
}

export default AccountLayout