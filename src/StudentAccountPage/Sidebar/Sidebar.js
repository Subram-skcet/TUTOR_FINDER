import React from 'react'
import SidebarItem from '../../MyAccountPage/Sidebar/Sidebar-items/SidebarItem'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ReviewsIcon from '@mui/icons-material/Reviews';
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
               <div onClick={()=>navigate('/myaccount/studentprofile/myprofile')}>
                <SidebarItem field='Profile' Icon={AccountCircleIcon}/>
               </div>
               <div onClick={()=>navigate('/myaccount/studentprofile/mybookmarks')}>
                <SidebarItem field='My Favourite Tutions' Icon={BookmarksIcon}/>
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