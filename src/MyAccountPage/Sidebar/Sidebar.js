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
            <img src='https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg' className='sidebar-img'></img>
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