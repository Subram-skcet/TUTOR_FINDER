import React from 'react'
import SidebarItem from './Sidebar-items/SidebarItem'
import { IoMdContact } from "react-icons/io";
import { IoIosSchool } from "react-icons/io"
import { MdRateReview } from "react-icons/md";
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { IoClose } from "react-icons/io5";

const Sidebar = ({closesidebar}) => {
  const navigate = useNavigate();
  return (
    <div className='sidebar-tot-wrap lato-regular'>
        <div className='sidebar-content-wrap'>
        <div className='sidebar-img-div sbar-lrg'>
            <img src={logo} className='sidebar-img'></img>
        </div>

        <div className='small-sidebar'>
            <div className='sidebar-img-div'>
                <img src={logo} className='sidebar-img'></img>
            </div>
            <div className='sbar-close-icon' onClick={()=>closesidebar(false)}>
              <IoClose size="2em"/>
            </div>
        </div>

        <div className='sidebar-items'>
               <div onClick={()=>navigate('/myaccount/teacherprofile/myprofile')}>
                <SidebarItem field='Profile' Icon={IoMdContact}/>
               </div>
               <div onClick={()=>navigate('/myaccount/teacherprofile/mytutions')}>
                <SidebarItem field='My Tuitions' Icon={IoIosSchool}/>
               </div>
               <div onClick={()=>navigate('/myaccount/teacherprofile/myreviews')}>
                <SidebarItem field='Reviews' Icon={MdRateReview}/>
               </div>
        </div>
        </div>
    </div>
  )
}

export default Sidebar