import React from 'react'
import SidebarItem from '../../MyAccountPage/Sidebar/Sidebar-items/SidebarItem'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/edu_quest_final.png'
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = ({closesidebar}) => {
  const navigate = useNavigate();
  return (
    <div className='sidebar-tot-wrap'>
        <div className='sidebar-content-wrap'>
        <div className='sidebar-img-div sbar-lrg'>
            <img src={logo} className='sidebar-img'></img>
        </div>

        <div className='small-sidebar'>
            <div className='sidebar-img-div'>
                <img src={logo} className='sidebar-img'></img>
            </div>
            <div className='sbar-close-icon' onClick={()=>closesidebar(false)}>
              <CloseIcon fontSize='large'/>
            </div>
        </div>

        <div className='sidebar-items'>
               <div onClick={()=>navigate('/myaccount/studentprofile/myprofile')}>
                <SidebarItem field='Profile' Icon={AccountCircleIcon}/>
               </div>
               <div onClick={()=>navigate('/myaccount/studentprofile/mybookmarks')}>
                <SidebarItem field='My Favourite Tuitions' Icon={BookmarksIcon}/>
               </div>
               <div onClick={()=>navigate('/myaccount/studentprofile/myreviews')}>
                <SidebarItem field='Reviews' Icon={ReviewsIcon}/>
               </div>
        </div>
        </div>

    </div>
  )
}

export default Sidebar