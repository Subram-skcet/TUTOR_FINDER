import React,{useState} from 'react'
import Sidebar from './Sidebar/Sidebar'
// import './App.css'
import AccountLayout from '../MyAccountPage/AccountLayout/AccountLayout'
import MenuIcon from '@mui/icons-material/Menu';

const App = (props) => {
  const [isSidebarOpen,setSidebarOpen]=useState(true)

  return (
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
  )
}

export default App