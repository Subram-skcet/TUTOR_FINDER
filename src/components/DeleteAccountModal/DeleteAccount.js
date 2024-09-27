import React from 'react'
import './DeleteAccount.css'
import { useDataLayerValue } from '../../StateProviders/StateProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const DeleteAccount = ({onClose}) => {
    const [{logged,logged_as},dispatch] = useDataLayerValue()
    const navigate = useNavigate()

    const handleDeleteAccount = async() =>{
        try {
          const response = await axios.delete(`/api/v1/${logged_as}/`)
          console.log(response);
          if(response.status === 200){
           dispatch({
            type:'LOG_OUT'
           })
            toast.success('User deleted successfully!!!')
            navigate('/')
          }
        } catch (error) {
          toast.error('Something went wrong try again later')
        }
    }

  return (
    <>
    <div className='delete-modal-container'>
      <h2>You can't recover your account at later point of time once you deleted</h2>
      <div className='delete-modal-buttons'>
        <button onClick={onClose}>Cancel</button>
        <button onClick={()=>handleDeleteAccount()}>Delete</button>
      </div>
    </div>
    </>
  )
}

export default DeleteAccount
