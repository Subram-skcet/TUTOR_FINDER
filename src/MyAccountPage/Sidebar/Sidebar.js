import React from 'react'
import SidebarItem from './Sidebar-items/SidebarItem'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import ReviewsIcon from '@mui/icons-material/Reviews';
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/edu_quest_final.png'


const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className='sidebar-tot-wrap'>
        <div className='sidebar-content-wrap'>
        <div className='sidebar-img-div'>
            <img src={logo} className='sidebar-img'></img>
        </div>
        <div className='sidebar-items'>
               <div onClick={()=>navigate('/myaccount/teacherprofile/myprofile')}>
                <SidebarItem field='Profile' Icon={AccountCircleIcon}/>
               </div>
               <div onClick={()=>navigate('/myaccount/teacherprofile/mytutions')}>
                <SidebarItem field='My Tutions' Icon={SchoolIcon}/>
               </div>
               <div onClick={()=>navigate('/myaccount/teacherprofile/myreviews')}>
                <SidebarItem field='Reviews' Icon={ReviewsIcon}/>
               </div>
        </div>
        </div>

    </div>
  )
}

export default Sidebar