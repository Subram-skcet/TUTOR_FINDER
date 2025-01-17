import React from 'react'
import SidebarItem from './Sidebar-items/SidebarItem'
import { IoMdContact } from "react-icons/io";
import { IoIosSchool } from "react-icons/io"
import { MdRateReview } from "react-icons/md";
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { IoClose } from "react-icons/io5";
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
               <div onClick={()=>{navigate('/myaccount/teacherprofile/myprofile'); if(isBelow1000px) closesidebar(false)}}>
                <SidebarItem field='Profile' Icon={IoMdContact}/>
               </div>
               <div onClick={()=>{navigate('/myaccount/teacherprofile/mytutions');if(isBelow1000px) closesidebar(false) }}>
                <SidebarItem field='My Tuitions' Icon={IoIosSchool}/>
               </div>
               <div onClick={()=>{navigate('/myaccount/teacherprofile/myreviews');if(isBelow1000px) closesidebar(false) }}>
                <SidebarItem field='Reviews' Icon={MdRateReview}/>
               </div>
        </div>
        </div>
    </div>
  )
}

export default Sidebar