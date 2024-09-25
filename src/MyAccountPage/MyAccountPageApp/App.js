import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './App.css'
import AccountLayout from '../AccountLayout/AccountLayout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = (props) => {
  return (
    <>
    <div className='app-wrap'>
      <div className='acc-layout'>
          <AccountLayout/>
      </div>
      <div className='wst'></div>
      <div className='app-pg-wrap'>
        <div className='sidebar'>
          <Sidebar/>
        </div>
        <div className='other-pgs'>
          {props.children}
        </div>
      </div>
    </div>
    <ToastContainer
        position="top-center"
    />
    </>
  )
}

export default App