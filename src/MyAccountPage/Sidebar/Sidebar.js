import React from 'react'
import SidebarItem from './Sidebar-items/SidebarItem'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import ReviewsIcon from '@mui/icons-material/Reviews';
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className='sidebar-tot-wrap'>
        <div className='sidebar-content-wrap'>
        <div className='sidebar-img-div'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8o-yBumI9pzBAgBD4G6Wnvi5rP2F9AtZUg&s" className='sidebar-img'></img>
        </div>
        <div className='sidebar-items'>
               <div onClick={()=>navigate('/myaccount/myprofile')}>
                <SidebarItem field='Profile' Icon={AccountCircleIcon}/>
               </div>
               <div onClick={()=>navigate('/myaccount/mytutions')}>
                <SidebarItem field='My Tutions' Icon={SchoolIcon}/>
               </div>
               <div onClick={()=>navigate('/myaccount/myreview')}>
                <SidebarItem field='Reviews' Icon={ReviewsIcon}/>
               </div>
        </div>
        </div>

    </div>
  )
}

export default Sidebar