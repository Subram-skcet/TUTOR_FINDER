import React, { useState,useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './App.css'
import AccountLayout from '../AccountLayout/AccountLayout'
import MenuIcon from '@mui/icons-material/Menu';

const App = (props) => {
  const [isSidebarOpen,setSidebarOpen]=useState(window.innerWidth > 1000)

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 1000);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <div className='app-wrap'>
      <div className='acc-layout'>
          <div className='sidebar-menu' onClick={()=>setSidebarOpen(true)}>
               <MenuIcon fontSize='large'/>
          </div>
          <AccountLayout/>
      </div>
        <div className={`sidebar ${isSidebarOpen ? '':'close-sidebar'}`}>
          <Sidebar closesidebar = {setSidebarOpen}/>
        </div>
      <div className='app-pg-wrap'>
        <div className='other-pgs'>
        <div className='wst'></div>
          {props.children}
        </div>
      </div>
    </div>
    </>
  )
}

export default App