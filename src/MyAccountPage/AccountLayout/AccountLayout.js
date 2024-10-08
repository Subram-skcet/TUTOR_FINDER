import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import './AccountLayout.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDataLayerValue } from '../../StateProviders/StateProvider';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal/Modal';
import DeleteAccount from '../../components/DeleteAccountModal/DeleteAccount';

const AccountLayout = () => {
  const navigate = useNavigate()
  const [{asStudent,asTeacher,logged,logged_as},dispatch] = useDataLayerValue();
  const [isDeleteModalOpen,setDeleteModalOpen] = useState(false)

  const handleLogout = async() =>{
    try {
      const response = await axios.post('/api/v1/auth/logout')
      console.log(response);
      if(response.data.message === 'User logged out successfully'){
        toast.success('Logged out successfully')
         dispatch({
          type:'LOG_OUT'
         })
         navigate('/')
      }
    } catch (error) {
      toast.error('Error logging out user')
       console.log(error.message);
    }
  }

  const handleChangePassword = async(req,res) =>{
    const body = { email:'', role:''}
    if(logged){
      if(logged_as === 'student'){
        body.email = asStudent.email
        body.role = 'student'
      }
      else if(logged_as === 'teacher'){
         body.email = asTeacher.email
         body.role = 'teacher'
      }
    }
    try {
      const response = await axios.post('/api/v1/auth/changepassword',body)
      if(response.data.msg === 'Mail generated successfully'){
          toast.info('Check your mail for password changing link note that link valid for only 10 minutes')
      }
    } catch (error) {
      console.log(error.message);
      toast.error('Error generating password reset mail try again later')
    }
  }


  return (
    <>
    <Modal isopen={isDeleteModalOpen} onClose={()=>setDeleteModalOpen(false)}>
      <DeleteAccount/>
    </Modal>
    <div>
        <div className='account-layout'>

            <div className='itms-cntr style-links home-icon-div' onClick={()=>navigate('/')}>
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
                      <p className='stg-options' onClick={()=>handleChangePassword()}>Change Password</p>
                      <p className='stg-options delete' onClick={()=>setDeleteModalOpen(true)}>Delete Account</p>
                  </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default AccountLayout