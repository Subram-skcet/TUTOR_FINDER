import './Layout.css'
import { useNavigate } from 'react-router-dom'
import { useDataLayerValue } from '../StateProviders/StateProvider';
import MyAccount from '../My_Account/MyAccount'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import logo from '../assets/edu_quest_final.png'
import { useLocation } from 'react-router-dom';


const Layout = (props) => {
  const [{logged},dispatch] = useDataLayerValue();
  const navigate = useNavigate()
const location = useLocation()
const pathname = location.pathname


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
  return (
    <>
      <div className="out-wrap">
        <div>
          <img src={logo} alt="Logo" className='layout-img'/>
        </div>
           <div className='links-wrapper'>
                  <div className="nav-links ">
                    <div className={`itms-cntr style-links ${pathname === '/' ? 'invis':''}`} onClick={()=>navigate('/')}>
                          <HomeIcon/>
                          <p>Home</p>
                    </div>
                    <div className='itms-cntr style-links' onClick={()=>navigate('/searchtutor')}>
                          <SearchIcon/>
                          <p>Search</p>
                    </div>
                    <div className='itms-cntr style-links'>
                      <img
                        src="https://img.icons8.com/?size=50&id=38HJBFwphJ3I&format=png"
                        className="img-sz"
                        alt="Teacher Icon"
                      />
                      <span onClick={RegisterNavigateTeacher}>Teach on EduQuest</span>
                    </div>
                    <div className={`itms-cntr style-links ${logged? 'invis' : ''}`}>
                      <img
                        src="https://img.icons8.com/?size=64&id=48800&format=png"
                        className="img-sz"
                        alt="Student Icon"
                      />
                      <span onClick={RegisterNavigateStudent}>Register as Student</span>
                    </div>
                    <div className={`itms-cntr style-links ${logged? 'invis' : ''}`}>
                      <img
                        src="https://img.icons8.com/?size=50&id=26211&format=png"
                        className="img-sz"
                        alt="Login Icon"
                      />
                      <span onClick={LoginNavigate}>Login</span>
                    </div>
                    <div className={`${!logged?'invis':''}`}>
                      <MyAccount/>
                    </div>
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
