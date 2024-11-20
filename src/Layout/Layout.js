import './Layout.css'
import { useNavigate } from 'react-router-dom'
import { useDataLayerValue } from '../StateProviders/StateProvider';
import MyAccount from '../My_Account/MyAccount'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import logo from '../assets/edu_quest_final.png'
import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { RiLoginCircleLine } from "react-icons/ri"
import { FaSearch } from "react-icons/fa";
import { MdHome } from "react-icons/md";

const Layout = (props) => {
  const [{logged,logged_as},dispatch] = useDataLayerValue();
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  const [isHamburgerOpen,setHamburgerOpen] = useState(false)


  const RegisterNavigateTeacher = () => {
    navigate('/welcometeacher')
    // navigate('/register', { state: { name: 'Teacher' } });
  };

  const RegisterNavigateStudent = () => {
    navigate('/register');
  };

  const LoginNavigate = () => {
    console.log("Here you go ",logged);
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
      <div className="out-wrap">
        <div className='logo-img'>
          <img src={logo} alt="Logo" className='layout-img'/>
        </div>
                  <div className="nav-links ">
                    <div className={`itms-cntr style-links ${pathname === '/' ? 'invis':''}`} onClick={()=>navigate('/')}>
                          <MdHome size="1.3em"/>
                          <p>Home</p>
                    </div>
                    <div className='itms-cntr style-links' onClick={()=>navigate('/searchtutor')}>
                          <FaSearch size="1em"/>
                          <p>Search</p>
                    </div>
                    <div className='itms-cntr style-links'>
                    <FaChalkboardTeacher size="1.3em"/>
                      <span onClick={RegisterNavigateTeacher}>Teach with EduQuest</span>
                    </div>
                    <div className={`itms-cntr style-links ${logged? 'invis' : ''}`}>
                    <PiStudent size="1.3em"/>
                      <span onClick={RegisterNavigateStudent}>Register</span>
                    </div>
                    <div className={`itms-cntr style-links ${logged? 'invis' : ''}`}>
                      <RiLoginCircleLine size="1.3em"/>
                      <span onClick={LoginNavigate}>Login</span>
                    </div>
                    <div className={`${!logged?'invis':''}`}>
                      <MyAccount/>
                    </div>
                </div>
            <div className='hamburger-div' onClick={()=>setHamburgerOpen(true)}>
              <div className='menu-open'>
                <MenuIcon fontSize='large'/>
              </div>
            </div>
            <div className={`${isHamburgerOpen ? 'open-close':''} hamburger-menu`}>
                    <div className='menu-close' onClick={()=>setHamburgerOpen(false)}>
                      <CloseIcon fontSize='large'/>
                    </div>
                    <div className={`${!logged?'invis':''} menu-my-profile`} onClick={handleProfileNavigate}>
                      <MyAccount/>
                      <p className='my-profile-para'>My Profile</p>
                    </div>
                    <div className={`menu-icon ${pathname === '/' ? 'invis':''}`} onClick={()=>navigate('/')}>
                          <HomeIcon/>
                          <p>Home</p>
                    </div>
                    <div className='menu-icon' onClick={()=>navigate('/searchtutor')}>
                    <FaSearch size="1.1em"/>
                          <p>Search</p>
                    </div>
                    <div className='menu-icon'>
                      <FaChalkboardTeacher size="1.1em"/>
                      <span onClick={RegisterNavigateTeacher}>Teach on EduQuest</span>
                    </div>
                    <div className={`menu-icon ${logged? 'invis' : ''}`}>
                    <PiStudent size="1.1em"/>
                      <span onClick={RegisterNavigateStudent}>Register</span>
                    </div>
                    <div className={`menu-icon ${logged? 'invis' : ''}`}>
                    <RiLoginCircleLine size="1.1em"/>
                      <span onClick={LoginNavigate}>Login</span>
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
