import './Layout.css'
import { useNavigate } from 'react-router-dom'
import { useDataLayerValue } from '../StateProviders/StateProvider';
import MyAccount from '../My_Account/MyAccount'
import { MdHome } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { useState,useEffect } from 'react';
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { RiLoginCircleLine } from "react-icons/ri"
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import logo from '../assets/logo.png'


const Layout = (props) => {
  const [{logged,logged_as},] = useDataLayerValue();
  const navigate = useNavigate()
  const location = useLocation()
  const [isHamburgerOpen,setHamburgerOpen] = useState(false)

  useEffect(()=>{

    const handleResize = () => {
     if(window.innerWidth > 820)
         setHamburgerOpen(false)
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  },[])


  const RegisterNavigateTeacher = () => {
    navigate('/welcometeacher')
  };

  const RegisterNavigateStudent = () => {
    navigate('/register');
  };

  const LoginNavigate = () => {
    navigate('/login');
  };

  const handleProfileNavigate = () =>{
    if(logged_as === 'teacher')
        navigate('/myaccount/teacherprofile/myprofile')
    else if(logged_as === 'student')
        navigate('/myaccount/studentprofile/myprofile')
}
  return (
    <>
      <div className="out-wrap lato-regular">
        <div className='logo-img'>
          <img src={logo} alt="Logo" className='layout-img'/>
        </div>
                  <div className="nav-links">
                    <div className={`itms-cntr style-links ${location.pathname !== '/' ? 'dim-clr':''}`} onClick={()=>navigate('/')}>
                          <MdHome size="1.3em"/>
                          <p>Home</p>
                    </div>
                    <div className={`itms-cntr style-links ${location.pathname !== '/searchtutor' ? 'dim-clr':''}`} onClick={()=>navigate('/searchtutor')}>
                          <FaSearch size="1em"/>
                          <p>Search</p>
                    </div>
                    <div className={`itms-cntr style-links ${location.pathname !== '/welcometeacher' ? 'dim-clr':''}`}>
                    <FaChalkboardTeacher size="1.3em"/>
                      <span onClick={RegisterNavigateTeacher}>Teach with FMT</span>
                    </div>
                    <div className={`itms-cntr style-links ${location.pathname !== '/register' ? 'dim-clr':''} ${logged? 'invis' : ''}`}>
                    <PiStudentBold size="1.3em"/>
                      <span onClick={RegisterNavigateStudent}>Register</span>
                    </div>
                    <div className={`itms-cntr style-links ${location.pathname !== '/login' ? 'dim-clr':''} ${logged? 'invis' : ''}`}>
                      <RiLoginCircleLine size="1.3em"/>
                      <span onClick={LoginNavigate}>Login</span>
                    </div>
                    <div className={`${!logged?'invis':''}`}>
                      <MyAccount/>
                    </div>
                </div>
            <div className='hamburger-div' onClick={()=>setHamburgerOpen(true)}>
              <div className='menu-open'>
                 <IoMenu size="2em"/>
              </div>
            </div>
            <div className={`${isHamburgerOpen ? 'open-close':''} hamburger-menu`}>
                    <div className='menu-close' onClick={()=>setHamburgerOpen(false)}>
                      <IoClose size="2em"/>
                    </div>
                    <div className={`${!logged?'invis':''} menu-my-profile`} onClick={handleProfileNavigate}>
                      <MyAccount/>
                      <p className='my-profile-para'>Profile</p>
                    </div>
                    <div className='menu-icon' onClick={()=>{navigate('/');setHamburgerOpen(false)}}>
                         <MdHome size="1.1em"/>
                          <p>Home</p>
                    </div>
                    <div className='menu-icon' onClick={()=>{navigate('/searchtutor');setHamburgerOpen(false)}}>
                    <FaSearch size="1.1em"/>
                          <p>Search</p>
                    </div>
                    <div className='menu-icon'>
                      <FaChalkboardTeacher size="1.1em"/>
                      <span onClick={()=>{navigate('/welcometeacher');setHamburgerOpen(false)}}>Teach with FMT</span>
                    </div>
                    <div className={`menu-icon ${logged? 'invis' : ''}`}>
                    <PiStudentBold size="1.1em"/>
                      <span onClick={()=>{navigate('/register');setHamburgerOpen(false)}}>Register</span>
                    </div>
                    <div className={`menu-icon ${logged? 'invis' : ''}`}>
                    <RiLoginCircleLine size="1.1em"/>
                      <span onClick={()=>{navigate('/login');setHamburgerOpen(false)}}>Login</span>
                    </div>
                </div>
      </div>
      <div className="content">
        {props.children}
      </div>
    </>
  );
};

export default Layout;
