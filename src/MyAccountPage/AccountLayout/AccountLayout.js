import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import './AccountLayout.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDataLayerValue } from '../../StateProviders/StateProvider';


const AccountLayout = () => {
  const navigate = useNavigate()
  const [{logged},dispatch] = useDataLayerValue();

  const handleLogout = async(req,res) =>{
    try {
      const response = await axios.post('/api/v1/auth/logout')
      console.log(response);
      if(response.data.message === 'User logged out successfully'){
         dispatch({
          type:'LOG_OUT'
         })
         navigate('/')
      }
    } catch (error) {
       console.log(error.message);
    }
  }

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
                      <p className='stg-options' onClick={()=>handleLogout()}>Log out</p>
                      <p className='stg-options'>Change Password</p>
                      <p className='stg-options'>Delete Account</p>
                  </div>
            </div>
        </div>
    </div>
  )
}

export default AccountLayout