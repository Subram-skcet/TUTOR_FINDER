import React from 'react'
import Sidebar from './Sidebar/Sidebar'
// import './App.css'
import AccountLayout from '../MyAccountPage/AccountLayout/AccountLayout'
const App = (props) => {
  return (
    <div className='app-wrap'>
      <div className='acc-layout'>
          <AccountLayout/>
      </div>
        <div className='sidebar'>
          <Sidebar/>
        </div>
      <div className='app-pg-wrap'>
        <div className='other-pgs'>
          <div className='wst'></div>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default App