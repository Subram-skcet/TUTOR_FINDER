import React from 'react'
import SidebarItem from '../../MyAccountPage/Sidebar/Sidebar-items/SidebarItem'
import { useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import { IoMdBookmarks } from "react-icons/io";
import { MdRateReview } from "react-icons/md";
import logo from "../../assets/logo.png"
import { useMediaQuery } from 'react-responsive'; 


const Sidebar = ({closesidebar}) => {
  const navigate = useNavigate();
  const isBelow1000px = useMediaQuery({ query: '(max-width: 1000px)' })
  
  return (
    <div className='sidebar-tot-wrap lato-regular'>
        <div className='sidebar-content-wrap'>
        <div className='sidebar-img-div sbar-lrg'>
            <img src={logo} alt='logo' className='sidebar-img'></img>
        </div>

        <div className='small-sidebar'>
            <div className='sidebar-img-div'>
                <img src={logo} alt='mob-logo' className='sidebar-img'></img>
            </div>
            <div className='sbar-close-icon' onClick={()=>closesidebar(false)}>
               <IoClose size="2em"/>
            </div>
        </div>

        <div className='sidebar-items'>
               <div onClick={()=>{navigate('/myaccount/studentprofile/myprofile'); if(isBelow1000px) closesidebar(false)}}>
                <SidebarItem field='Profile' Icon={IoMdContact}/>
               </div>
               <div onClick={()=>{navigate('/myaccount/studentprofile/mybookmarks'); if(isBelow1000px) closesidebar(false)}}>
                <SidebarItem field='My Favourite Tuitions' Icon={IoMdBookmarks}/>
               </div>
               <div onClick={()=>{navigate('/myaccount/studentprofile/myreviews'); if(isBelow1000px) closesidebar(false)}}>
                <SidebarItem field='Reviews' Icon={MdRateReview}/>
               </div>
        </div>
        </div>

    </div>
  )
}

export default Sidebar