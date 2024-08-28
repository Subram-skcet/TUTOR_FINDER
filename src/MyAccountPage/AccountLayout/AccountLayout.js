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

            <div className='itms-cntr style-links' onClick={()=>navigate('/')}>
                    <HomeIcon/>
                    <p>Home</p>
              </div>
            <div className='setting-div'>
             <div className='itms-cntr style-links'>
                    <SettingsIcon/>
                        <p>Settings</p>
            </div>
                  <div className='settings-options'>
                      <p className='stg-options'>Log out</p>
                      <p className='stg-options'>Change Password</p>
                      <p className='stg-options'>Delete Account</p>
                  </div>
            </div>
        </div>
    </div>
  )
}

export default AccountLayout