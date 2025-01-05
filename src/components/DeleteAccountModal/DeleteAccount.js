import React from 'react'
import './DeleteAccount.css'
import { useDataLayerValue } from '../../StateProviders/StateProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { MdCancel } from "react-icons/md";
import { MdDelete } from "react-icons/md";



const DeleteAccount = ({onClose}) => {
    const [{logged_as},dispatch] = useDataLayerValue()
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
    <div className='delete-modal-container lato-regular'>
      <h2>You won't be able to recover your account later once it has been deleted.</h2>
      <div className='delete-modal-buttons'>
        <button className="edit-prof-btn" onClick={onClose}>
         <div className='itms-cntr style-links-updated cncl-bck lato-regular'>
              <MdCancel  size="1.45em"/> 
              <p>Cancel</p>
          </div>
        </button>
        <button onClick={()=>handleDeleteAccount()} className='edit-prof-btn spz'>
          <div className='itms-cntr style-links-updated del-bck lato-regular'>
                                <MdDelete size="1.45em"/>
                                  <p>Delete</p>
          </div>
        </button>
      </div>
    </div>
    </>
  )
}

export default DeleteAccount
